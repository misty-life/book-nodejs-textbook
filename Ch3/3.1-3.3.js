// REPL (Read, Eval, Print, Loop)
// terminal에서 node 명령어 입력

// CommonJS 모듈
const { odd, even } = require("./3.common");

// Node에서 this는 최상위 스코프인 경우 module.exports를 가리키고, 함수 내부의 this는 global 객체를 가리킴

// ECMAScript 모듈
import { odd2, even2 } from "./3.ECMAScript.mjs";


