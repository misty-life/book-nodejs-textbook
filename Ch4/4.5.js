// Cluster

const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
    console.log(`Mater process ID : ${process.pid}`);

    for (let i = 0; i < numCPUs; ++i) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`${worker.process.pid} EXIT`);
        console.log("code", code, "signal", signal);
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end();
    })
    .listen(8080, () => {
        console.log("START SERVER");
    });

    console.log(`${process.pid} worker play`);
}