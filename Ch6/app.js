const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

try {
    fs.readdirSync("uploads");
} catch (err) {
    fs.mkdirSync("uploads");
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads/");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);

// Set middle wares
app.use((req, res, next) => { // for logging
    if (process.env.NODE_ENV === "production") {
        morgan("combined")(req, res, next);
    } else {
        morgan("dev")(req, res, next);
    }
});
app.use('/', express.static(path.join(__dirname, "public"))); // for static files
app.use(express.json()); // for body parser about json
app.use(express.urlencoded({ extended: false })); // for body parser about url encoding
app.use(cookieParser(process.env.COOKIE_SECRET)); // for cookies
app.use(session({ // for session
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: "session-cookie",
}));
app.use((req, res, next) => {
    res.locals.data = "DATA";
    next();
}, (req, res, next) => {
    console.log(res.locals.data);
    next();
});

app.use((req, res, next) => {
    console.log("This is called by every request");
    next();
});

app.get("/upload", (req, res) => {
    res.sendFile(path.join(__dirname, "multipart.html"));
});

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file, req.body);
    res.send("ok");
});

app.get('/', (req, res, next) => {
    console.log("This is called by only '/' request");
    next();
    // res.send("Hello, Express!");
    // res.sendFile(path.join(__dirname, "/index.html"));
}, (req, res) => {
    throw new Error("This error will be delivered to Middle ware");
});

app.use((err, req, res, next) => {
    console.error(err);
    // res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
    console.log("START SERVER ON", app.get("port"));
});