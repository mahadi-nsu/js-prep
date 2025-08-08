// ╔══════════════════════════════════════╗
// ║ 📦  BASIC EXAMPLES          ║
// ╚══════════════════════════════════════╝

// 1.
console.log(a); //undefined , Because var a is hoisted, but its value assignment is not.
var a = 5;

// 2.
console.log(b); // ReferenceError: Cannot access 'b' before initialization , Because let is hoisted with a temporal dead zone (TDZ).
let b = 10;

// 3.
var x = 1;
if (true) {
  var x = 2;
  console.log(x); // 2 //Because var is function-scoped — the second declaration overwrites the first.
}
console.log(x); // 2 // Because var is function-scoped — the second declaration overwrites the first.

// 4.
let y = 1;
if (true) {
  let y = 2;
  console.log(y); // 2 Because let is block-scoped — both ys are separate.
}
console.log(y); // 1 Because let is block-scoped — both ys are separate.

// ╔══════════════════════════════════════╗
// ║ 📦  Mid to advanced EXAMPLES          ║
// ╚══════════════════════════════════════╝

// 5.
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

//   Ans : Because var is function-scoped — only one i, which becomes 3 when the loop ends.
//   3
//   3
//   3

// 6.
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
//   Ans : Because let is block-scoped — each iteration has its own i.
// 0
// 1
// 2

// 7.
const obj_1 = { a: 1 };
obj_1 = { a: 2 };

// Answer:
// TypeError: Assignment to constant variable.
// Because const prevents reassignment, though the object itself can be mutated.

// 8.
const obj = { a: 1 };
obj.a = 100;
console.log(obj.a);

// Answer:
// No error. It prints 100.
// const means the binding is constant, not the content of the object.

// 9.
let a = 10;
let a = 20;
// Answer:
// ❌ SyntaxError: Identifier 'a' has already been declared
// You can't redeclare a let or const in the same scope.

var b = 10;
var b = 20;
console.log(b); // ✅ 20

// 10.
(function () {
  console.log(typeof a);
  var a = 10;
})();

//   Answer:
// undefined
// Because var a is hoisted, but value is not assigned at the time of typeof.
