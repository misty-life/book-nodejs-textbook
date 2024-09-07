// crypto

// hash
const crypto = require("crypto");

console.log("base64", crypto.createHash("sha512").update("비밀번호").digest("base64"));
console.log("hex", crypto.createHash("sha512").update("비밀번호").digest("hex"));
console.log("base64", crypto.createHash("sha512").update("다른 비밀번호").digest("base64"));

crypto.randomBytes(64, (err, buffer) => {
    const salt = buffer.toString("base64");
    console.log("salt: ", salt);
    crypto.pbkdf2("비밀번호", salt, 100000, 64, "sha512", (err, key) => {
        console.log("password: ", key.toString("base64"));
    });
});


// 양방향 암호화
const algorithm = "aes-256-cbc";
const key = "abcdefghijklmnopqrstuvwxyz123456";
const iv = "1234567890123456";

const cipher = crypto.createCipheriv(algorithm, key, iv);
let result = cipher.update("암호화할 문장", "utf8", "base64");
result += cipher.final("base64");
console.log("암호화: ", result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, "base64", "utf8");
result2 += decipher.final("utf8");
console.log("복호화: ", result2);


// util
const util = require("util");

const dontUseMe = util.deprecate((x, y) => {
    console.log(x + y);
}, "deprecated !");

dontUseMe(1, 3);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
    .then((buf) => {
        console.log(buf.toString("base64"));
    })
    .catch((error) => {
        console.error(error);
    });


// worker threads
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

// if (isMainThread) {
//     const worker = new Worker(__filename);
//     worker.on("message", message => console.log("from worker", message));
//     worker.on("exit", message => console.log("worker exit"));
//     worker.postMessage("ping");
// } else {
//     parentPort.on("message", (value) => {
//         console.log("from parent", value);
//         parentPort.postMessage("pong");
//         parentPort.close();
//     })
// }

// if (isMainThread) {
//     const threads = new Set();
//     threads.add(new Worker(__filename, {
//         workerData: { start: 1 },
//     }));
//     threads.add(new Worker(__filename, {
//         workerData: { start: 2 },
//     }));
//     for (let worker of threads) {
//         worker.on("message", message => console.log("from worker", message));
//         worker.on("exit", () => {
//             threads.delete(worker);
//             if (threads.size === 0) {
//                 console.log("job done");
//             }
//         });
//     }
// } else {
//     const data = workerData;
//     parentPort.postMessage(data.start + 100);
// }

const min = 2;
const max = 10000000;
let primes = [];

function findPrimes(start, range) {
    let isPrime = true;
    const end = start + range;
    for (let i = start; i < end; i++) {
        for (let j = min; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

// console.time("prime");
// findPrimes(min, max);
// console.timeEnd("prime");
// console.log(primes.length);

primes = [];
if (isMainThread) {
    const threadCount = 8;
    const threads = new Set();
    const range = Math.floor((max - min) / threadCount);
    let start = min;
    console.time("prime2");
    for (let i = 0; i < threadCount; i++) {
        const wStart = start;
        threads.add(new Worker(__filename, { workerData: { start: wStart, range } }));
        start += range;
    }
    threads.add(new Worker(__filename, { workerData: { start, range: max - start } }));
    for (let worker of threads) {
        worker.on("exit", () => {
            threads.delete(worker);
            if (threads.size === 0) {
                console.timeEnd("prime2");
                console.log(primes.length);
            }
        });
        worker.on("message", (msg) => {
            primes = primes.concat(msg);
        });
    }
} else {
    findPrimes(workerData.start, workerData.range);
    parentPort.postMessage(primes);
}


// child process
const exec = require("child_process").exec;
let process = exec("ls");

process.stdout.on("data", function(data) {
    console.log(data.toString());
});

const spawn = require("child_process").spawn;
process = spawn("python3", ["test.py"]);

process.stdout.on("data", (data) => {
    console.log(data.toString());
});