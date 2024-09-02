// 노드 내장 모듈

// os
const os = require("os");

console.log(os.arch);
console.log(os.platform());
console.log(os.type());
console.log(os.uptime());
console.log(os.hostname());
console.log(os.release());

console.log(os.homedir());
console.log(os.tmpdir());

console.log(os.cpus());
console.log(os.cpus().length);

console.log(os.freemem());
console.log(os.totalmem());


// path
// 운영체제별로 다른 경로 구분자를 제네릭하게..
const path = require("path");

const string = __filename;
console.log(string);

console.log(path.sep);
console.log(path.delimiter);
console.log(path.dirname(string));
console.log(path.basename(string));
console.log(path.basename(string, path.extname(string)));

console.log(path.parse(string));
console.log(path.format({
    dir: "/Users",
    name: "3.5",
    ext: ".js",
}));
console.log(path.isAbsolute("../Users"));
console.log(path.isAbsolute("/Users"));
console.log(path.relative("/Users/misylife/study/nodejs-textbook/3.5.js", "/Users"));
console.log(path.join(__dirname, "..", "..", "/users", ".", "/shin"));
console.log(path.resolve(__dirname, "..", "users", ".", "/shin"));


// url
const url = require("url");

const { URL } = url;
const myURL = new URL("https://www.google.com")
console.log(myURL);
console.log(url.format(myURL));

const query = new URL("http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript");
console.log(query.searchParams);
console.log(query.searchParams.getAll("category"));
console.log(query.searchParams.get("limit"));
console.log(query.searchParams.has("page"));

console.log(query.searchParams.keys());
console.log(query.searchParams.values());

query.searchParams.append("filter", "es3");
query.searchParams.append("filter", "es5");
console.log(query.searchParams.getAll("filter"));

query.searchParams.set("filter", "es6");
console.log(query.searchParams.getAll("filter"));

query.searchParams.delete("filter");
console.log(query.searchParams.getAll("filter"));

console.log(query.searchParams.toString());
query.search = query.searchParams.toString();