// fs
// const fs = require("fs").promises;

// fs.readFile("./test.txt")
//     .then((data) => {
//         console.log(data.toString());
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// fs.writeFile("./write.txt", "I'm writing a text file.")
//     .then(() => {
//         console.log("Completed to write a file.");
//         fs.readFile("./write.txt")
//             .then((data) => {
//                 console.log(data.toString());
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     })
//     .catch((err) => {
//         console.error(err);
//     });

    
// Buffer
const buffer = Buffer.from("Hello Buffer");
console.log("from() : ", buffer);
console.log("length : ", buffer.length);
console.log("toString(): ", buffer.toString());

const array = [Buffer.from("123"), Buffer.from(" 456"), Buffer.from(" 789")];
const buffer2 = Buffer.concat(array);
console.log("buffer2 : ", buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log("buffer3 : ", buffer3);


// Stream
const fs = require("fs");
const readStream = fs.createReadStream("test.txt", { highWaterMark: 8 });
const data = [];

readStream.on("data", (chunk) => {
    data.push(chunk);
    console.log("data : ", chunk, chunk.length, chunk.toString());
});

readStream.on("end", () => {
    console.log("end : ", Buffer.concat(data).toString());
});

readStream.on("error", (err) => {
    console.error(err);
});

const writeStream = fs.createWriteStream("write.txt");
writeStream.on("finish", () => {
    console.log("Finish writing file");
});

writeStream.write("Hello\n");
writeStream.write("Stream");
writeStream.end();


// Thread Pool
const crypto = require("crypto");

const pass = "pass";
const salt = "salt";
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
    console.log("1: ", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
    console.log("2: ", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
    console.log("3: ", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
    console.log("4: ", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
    console.log("5: ", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
    console.log("6: ", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
    console.log("7: ", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
    console.log("8: ", Date.now() - start);
});