// var는 함수 스코프, const와 let은 블록 스코프
if (true) {
    var x = 3;
}

console.log(x); // 3

if (true) {
    const y = 3;
}
// console.log(y); // Reference Error


// template string
const num1 = 1;
const num2 = 2;
const result = num1 + num2;
console.log(`${num1} + ${num2} = ${result}`);


// 객체 리터럴
const es = "ES";
var sayNode = function() {
    console.log("Node");
};

const newObject = {
    sayJS() {
        console.log("JS")
    },
    sayNode, // 속성과 변수명이 동일한 경우 생략 가능
    [es + 6]: 'Fantastic',
};


// 화살표 함수
function add(x, y) {
    return x + y;
}

const add2 = (x, y) => {
    return x + y;
};

const add3 = (x, y) => x + y;

const add4 = (x, y) => (x + y);

function not(x) {
    return !x;
}

const not2 = (x) => !x;

// this 바인딩, 화살표 함수는 바깥 스코프의 this를 그대로 물려 받음
var relationship1 = {
    name: "shin",
    friends: ["A", "B", "C"],
    logFriends: function() {
        var that = this;
        this.friends.forEach(function (friend) {
            // 여기서 this는 함수 스코프 내부이고, name이라는 변수가 존재하지 않음
            console.log(that.name, friend);
        });
    },
};
relationship1.logFriends();

const relationship2 = {
    name: "shin",
    friends: ["A", "B", "C"],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        });
    },
};
relationship2.logFriends();


// 구조 분해 할당
var candyMachine = {
    status: {
        name: "node",
        count: 5,
    },
    getCandy: function() {
        this.status.count--;
        return this.status.count;
    },
};
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;

console.log(getCandy, count); // [Function: getCandy] 5

const candyMachine2 = {
    status: {
        name: "node",
        count2: 5,
    },
    getCandy2() {
        this.status.count2--;
        return this.status.count2;
    },
};
const { getCandy2, status: { count2 } } = candyMachine;

var array = ["nodejs", {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[3];

const array2 = ["nodejs", {}, 10, true];
const [nod2, obj2, , bool2] = array2;


// 프로토타입 상속 문법
var Human = function(type) {
    this.type = type || "human";
};

Human.isHuman = function(human) {
    return human instanceof Human;
};

Human.prototype.breathe = function() {
    console.log("h-a-a-a-m");
};

var Shin = function(type, firstName, lastName) {
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
};

Shin.prototype = Object.create(Human.prototype);

Shin.prototype.constructor = Shin;
Shin.prototype.sayName = function() {
    console.log(this.firstName, this.lastName);
};
var oldShin = new Shin("human", "Minho", "Shin");
console.log(Human.isHuman(oldShin));


// 클래스 상속 문법 (프로토타입 기반으로 동작하는 것은 동일)
class Human2 {
    constructor(type = "human") {
        this.type = type;
    }

    static isHuman(human) {
        return human instanceof Human2;
    }

    breathe() {
        console.log("h-a-a-a-m");
    }
}

class Shin2 extends Human2 {
    constructor(type, firstName, lastName) {
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayName() {
        super.breathe();
        console.log(this.firstName, this.lastName);
    }
}

const newShin = new Shin2("human", "ninho", "shin");
console.log(Human2.isHuman(newShin));


// 프로미스
const condition = true;
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve("성공");
    } else {
        reject("실패");
    }
});

promise.then((message) => {
    console.log(message);
}).catch((error) => {
    console.error(error);
}).finally(() => {
    console.log("Always");
});

// 콜백 지옥, findOne과 save함수가 내부적으로 프로미스 객체를 가지고 있다고 가정
function findAndSaveUser(Users) {
    Users.findOne({}, (err, user) => {
        if (err) {
            return console.err(err);
        }

        user.name = "shin";
        user.save((err) => {
            if (err) {
                return console.err(err);
            }

            Users.findOne({ gender: "m" }, (err, user) => {
                // ...
            });
        });
    });
}

// 프로미스를 통한 해결
function findAndSaveUser2(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = "shin";
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: "m "});
        })
        .then((user) => {
            // ...
        })
        .catch((err) => {
            console.error(err);
        });
}


// 프로미스 동시 실행
const promise1 = Promise.resolve("성공1");
const promise2 = Promise.resolve("성공2");

Promise.all([promise1, promise2]) // 모든 프로미스 resolve될 때 -> then, 하나라도 reject -> catch
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.err(err);
    });

// 어느 프로미스에서 에러가 발생하는지 파악하려면 Promise.allSettled
const promise3 = Promise.resolve("성공3");
const promise4 = Promise.reject("실패");
const promise5 = Promise.resolve("성공5");

Promise.allSettled([promise3, promise4, promise5])
    .then((result) => {
        console.log(result);
        /*
        [
            { status: 'fulfilled', value: '성공3' },
            { status: 'rejected', reason: '실패' },
            { status: 'fulfilled', value: '성공5' }
        ]
        */
    })
    .catch((err) => {
        console.err(err);
    });


// async & await
async function findAndSaveUser3(Users) {
    try {
        let user = await Users.findOne({});
        user.name = "shin";
        user = await user.save();
        user = await Users.findOne({ gender: "m" });
        // ...
    } catch (error) {
        console.error(error);
    }
}

const findAndSaveUser4 = async (Users) => {
    try {
        let user = await Users.findOne({});
        user.name = "shin";
        user = await user.save();
        user = await Users.findOne({ gender: "m" });
        // ...
    } catch (error) {
        console.error(error);
    }
};

// for 문과 promise
const promise6 = Promise.resolve("성공6");
const promise7 = Promise.resolve("성공7");
(async () => {
    for await (p of [promise6, promise7]) {
        console.log([promise]);
    }
})();


// Map & Set
// Map 속성간 순서 보장, key가 문자열이 필수가 아님 size로 key의 개수도 쉽게 확인
// Set 배열 중복 제거시에도 종종 사용
const m = new Map();
m.set("name", "shin");
m.set("height", 180);
m.set(10, "100");
const d = {};
m.set(d, "Obj");

console.log(m.get(d)); // "Obj"
m.size; // 4
for (const [k, v] of m) {
    console.log(k, v);
}

m.forEach((v, k) => {
    console.log(k, v);
})

m.has(d); // true
m.delete(d);
m.clear();


const s = new Set();
s.add(false);
s.add(1);
s.add("1");
s.add(1); // 중복으로 인한 무시
s.add(2);

console.log(s.size); // 4
s.has(1); // true

for (const a of s) {
    console.log(a);
}

s.forEach((a) => {
    console.log(a);
})

s.delete(2);
s.clear();


// 널 병합 & 옵셔널 체이닝
// || 는 falsy 값, 널 병합 연산자 ??는 null, undefined만 구분
const a = 0;
const b = a || 3;
console.log(b) // 3;

const c = 0;
const e = c ?? 3;
console.log(e) // 0;