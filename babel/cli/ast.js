import * as babylon from "babylon";

const code = `function square(n) {
  return n * n;
}`;

console.log(babylon.parse(code));
