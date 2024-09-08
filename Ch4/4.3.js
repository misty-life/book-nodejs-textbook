// Cookie

const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {};

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith("/login")) {
        console.log(req.url);
        const url = new URL(req.url, "http://localhost:8080");
        const name = url.searchParams.get("name");
        const expires = new Date();
        const uniqueInt = Date.now();
        session[uniqueInt] = {
            name,
            expires,
        };

        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: '/',
            "Set-Cookie": `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();

    } else if (cookies.session && session[cookies.session].expires > new Date()) {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(`Hello ${session[cookies.session].name}`);

    } else {
        try {
            const data = await fs.readFile(path.join(__dirname, "./cookie.html"));
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(data);

        } catch (err) {
            res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            res.end(err.message);
        }
    }

})
.listen(8080, () => console.log("SERVER START"));