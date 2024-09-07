// 내장 객체

// Node에서는 DOM, BOM이 없기 때문에 window나 document객체 접근 불가능. globalThis를 이용하자.
console.log(globalThis == global); // true 브라우저에서 globalThis는 window객체를 가리킨다.


// console
const string = "abc";
const number = 1;
const boolean = true;
const obj = {
    outside: {
        inside: {
            key: "value",
        },
    },
};
console.time("전체 시간");

console.log(string, number, boolean);
console.error("ERROR");
console.table([{ name: "minho", height: 181 }, {name: "shin", height: 222 }]);
console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

function b() {
    console.trace("에러 위치 추적");
}

function a() {
    b();
}

a();

console.timeEnd("전체 시간");


// 타이머
const timeout = setTimeout(() => {
    console.log("1.5초후 실행");
}, 1500);

const interval = setInterval(() => {
    console.log("1초마다 실행");
}, 1000);

const timeout2 = setTimeout(() => {
    console.log("실행되지 않습니다");
}, 3000);

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
    console.log("즉시 실행");
});

const immediate2 = setImmediate(() => {
    console.log("실행되지 않습니다");
});

clearImmediate(immediate2);

/*
즉시 실행
1초마다 실행
1.5초후 실행
1초마다 실행
*/


// process, 현재 실행 중인 node 프로세스의 정보
console.log(process.version);
console.log(process.arch);
console.log(process.platform);
console.log(process.pid);
console.log(process.uptime());
console.log(process.execPath);
console.log(process.cwd());
console.log(process.cpuUsage());

console.log(process.env); // key값을 저장하는 등 임의의 환경 변수를 저장하는 데에도 사용된다.

setImmediate(() => {
    console.log("immediate");
});

process.nextTick(() => { // 이벤트 루프의 콜백함수 처리의 우선 순위를 높여주다.
    console.log("nextTick");
});

setTimeout(() => {
    console.log("timeout");
}, 0);

Promise.resolve().then(() => console.log("promise")); // resolve된 Promise도 다른 콜백보다 우선 처리된다.

// process.nextTick과 Promise를 마이크로태스크라고 따로 구분해서 부름.
// 콜 스택이 비어있는 경우 이벤트 루프가 마이크로태스크 큐에서 함수를 가져오고, 마이크로태스크 큐가 비어 있으면 태스크 큐의 함수를 실행