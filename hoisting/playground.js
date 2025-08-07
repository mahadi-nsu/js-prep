// ╔══════════════════════════════════════╗
// ║ 📦  BASIC HOISTING EXAMPLES          ║
// ╚══════════════════════════════════════╝

// 1. Function Declaration (Fully Hoisted)
hoistedFunc(); // ✅ Works!
function hoistedFunc() {
  console.log("I'm fully hoisted!");
}

// 2. var Variable (Partially Hoisted)
console.log(varVar); // undefined (hoisted but not initialized)
var varVar = "I'm a var variable";

// 3. let/const Variables (TDZ)
// console.log(letVar); // ❌ ReferenceError: Cannot access 'letVar' before initialization
let letVar = "I'm a let variable";
const constVar = "I'm a const variable";

// ╔══════════════════════════════════════════════════╗
// ║ ⏳ TEMPORAL DEAD ZONE (TDZ) DEMONSTRATION         ║
// ╚══════════════════════════════════════════════════╝

// TDZ Example
console.log("Entering scope...");

// This would cause ReferenceError
// console.log(tdzVar);

let tdzVar = "I'm in TDZ";
console.log("After declaration:", tdzVar); // ✅ Works

// ╔══════════════════════════════════════╗
// ║ 📦  FUNCTION VS VARIABLE HOISTING     ║
// ╚══════════════════════════════════════╝

// Function declaration takes precedence over variable declaration
myFunc(); // ✅ Calls the function, not undefined

var myFunc = "I'm a variable";

function myFunc() {
  console.log("I'm a function!");
}

console.log("After declarations, myFunc is:", myFunc); // Now it's the variable

// ╔══════════════════════════════════════╗
// ║ 📦  BLOCK SCOPE HOISTING              ║
// ╚══════════════════════════════════════╝

// var leaks to function scope
function example() {
  if (true) {
    var leakedVar = "I'm leaked to function scope";
  }
  console.log("leakedVar accessible:", leakedVar); // ✅ Works
}

// let stays in block scope
function example2() {
  if (true) {
    let blockVar = "I'm contained in block";
    console.log("blockVar inside block:", blockVar); // ✅ Works
  }
  // console.log("blockVar outside block:", blockVar); // ❌ ReferenceError
}

// ╔══════════════════════════════════════╗
// ║ ⚠️  COMMON PITFALLS                  ║
// ╚══════════════════════════════════════╝

// pitfalls#1
var shadowVar = "global";
function shadowExample() {
  console.log("Before declaration:", shadowVar); // undefined (local is hoisted)
  var shadowVar = "local";
  console.log("After declaration:", shadowVar); // "local"
}

shadowExample();

// pitfalls#2
function duplicate() {
  return "First declaration";
}
function duplicate() {
  return "Second declaration wins!"; // This overwrites the first
}

console.log(duplicate());
