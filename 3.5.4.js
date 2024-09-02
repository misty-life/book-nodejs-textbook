// DNS
import dns from "dns/promises";

const ip = await dns.lookup("google.com");
console.log("IP", ip);

// dns.resolve(도메인, 레코드네임)을 통해 여러 정보 조회 가능
const a = await dns.resolve("google.com");
console.log("A", a);

const mx = await dns.resolve("google.com", "MX");
console.log("MX", mx);

const cname = await dns.resolve("www.naver.com", "CNAME");
console.log("CNAME", cname);

const any = await dns.resolve("google.com", "ANY");
console.log("ANY", any);