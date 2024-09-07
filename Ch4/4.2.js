const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const users = {};

// 내부적으로 req, res는 stream으로 되어있기 때문에 on("data") 이벤트를 통해 데이터를 읽을 수 있음
http.createServer(async (req, res) => {
    console.log(req.method, req.url);

    try {
        if (req.method === "GET") {
            if (req.url === "/") {
                const data = await fs.readFile(path.join(__dirname, "index.html"));
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                return res.end(data);
            } else if (req.url === "/about") {
                const data = await fs.readFile(path.join(__dirname, "about.html"));
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                return res.end(data);
            } else if (req.url === "/users") {
                res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
                return res.end(JSON.stringify(users));
            }

            try {
                const data = await fs.readFile(path.join(__dirname, req.url));
                return res.end(data);
            } catch (err) {

            }
        } else if (req.method === "POST") {
            if (req.url === "/user") {
                let body = "";
                req.on("data", data => body += data);

                return req.on("end", () => {
                    console.log("POST BODY : ", body);
                    // body로 전달받은 데이터는 String이므로 JSON으로 파싱
                    const { name } = JSON.parse(body);
                    const id = Date.now();
                    users[id] = name;
                    res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8 "});
                    res.end("SUCCESS SIGN UP");
                });
            }
        } else if (req.method === "PUT") {
            if (req.url.startsWith("/user/")) {
                const key = req.url.split('/')[2];
                let body = "";
                req.on("data", data => body += data);

                return req.on("end", () => {
                    console.log("PUT BODY : ", body);
                    users[key] = JSON.parse(body).name;
                    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
                    res.end(JSON.stringify(users));
                });
            }
        } else if (req.method === "DELETE") {
            if (req.url.startsWith("/user/")) {
                const key = req.url.split('/')[2];
                delete users[key];

                res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
                return res.end(JSON.stringify(users));
            }
        }

        res.writeHead(404);
        return res.end("NOT FOUND");

    } catch (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
    }
})
.listen(8080, () => {
    console.log("SERVER START");
});