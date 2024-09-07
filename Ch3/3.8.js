// Error Handling

// setInterval(() => {
//     console.log("Start");
//     try {
//         throw new Error("I WILL KILL SERVER!");
//     } catch (err) {
//         console.error(err);
//     }
// }, 1000);

// const fs = require("fs");

// 내장 모듈에서는 에러가 발생해도 프로세스를 멈추지 않음
// setInterval(() => {
//     fs.unlink("./abc.js", (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// }, 1000);

const fs = require("fs").promises;

setInterval(() => {
    fs.unlink("./abc.js").catch(console.error);
}, 1000);