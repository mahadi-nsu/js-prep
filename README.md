# JavaScript Preparation Guide

A comprehensive collection of JavaScript concepts, cheatsheets, and code snippets for JS preparation.

## Table of Contents

1. [Hoisting](#hoisting)
2. [Variables](#variables)

---

## 1. Hoisting

<details>
<summary><strong>📚 Concept Overview</strong></summary>

Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their scope during compilation, before the code actually runs.

</details>

<details>
<summary><strong>🎯 Key Points</strong></summary>

- **Function declarations**: Fully hoisted (both declaration and definition)
- **var variables**: Hoisted but initialized to `undefined`
- **let/const variables**: Hoisted but in Temporal Dead Zone (TDZ)
- **Function expressions**: Not hoisted
- **Arrow functions**: Not hoisted

</details>

<details>
<summary><strong>📋 Cheatsheet</strong></summary>

| Declaration Type     | Hoisted?     | Initial Value | Accessible Before Declaration? |
| -------------------- | ------------ | ------------- | ------------------------------ |
| Function Declaration | ✅ Yes       | Function      | ✅ Yes                         |
| var                  | ⚠️ Partially | undefined     | ✅ Yes (but undefined)         |
| let                  | ❌ TDZ       | -             | ❌ No (ReferenceError)         |
| const                | ❌ TDZ       | -             | ❌ No (ReferenceError)         |
| Function Expression  | ❌ No        | -             | ❌ No                          |
| Arrow Function       | ❌ No        | -             | ❌ No                          |

</details>

<details>
<summary><strong>💡 Code Snippets</strong></summary>

#### Basic Hoisting Examples

```javascript
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
```

#### Temporal Dead Zone (TDZ) Demonstration

```javascript
// TDZ Example
console.log("Entering scope...");

// This would cause ReferenceError
// console.log(tdzVar);

let tdzVar = "I'm in TDZ";
console.log("After declaration:", tdzVar); // ✅ Works
```

#### Function vs Variable Hoisting Precedence

```javascript
// Function declaration takes precedence over variable declaration
myFunc(); // ✅ Calls the function, not undefined

var myFunc = "I'm a variable";

function myFunc() {
  console.log("I'm a function!");
}

console.log("After declarations, myFunc is:", myFunc); // Now it's the variable
```

#### Block Scope Hoisting

```javascript
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
```

#### Common Pitfalls

```javascript
// Pitfall 1: Variable Shadowing
var shadowVar = "global";
function shadowExample() {
  console.log("Before declaration:", shadowVar); // undefined (local is hoisted)
  var shadowVar = "local";
  console.log("After declaration:", shadowVar); // "local"
}

// Pitfall 2: Function Redeclaration
function duplicate() {
  return "First declaration";
}
function duplicate() {
  return "Second declaration wins!"; // This overwrites the first
}
```

</details>

<details>
<summary><strong>🚀 Best Practices</strong></summary>

✅ **Do's:**

- Use `let` and `const` instead of `var`
- Declare variables at the top of their scope
- Use function declarations for hoisting benefits
- Be aware of TDZ with `let`/`const`
- Use block scope to prevent variable leakage

❌ **Don'ts:**

- Don't use `var` (use `let`/`const` instead)
- Don't access variables before declaration
- Don't rely on hoisting for readability
- Don't create variable shadowing issues

</details>

<details>
<summary><strong>🎯 Tricky Questions & Answers</strong></summary>

#### Basic Hoisting Questions

**Q: What will this output?**

```javascript
console.log(x);
var x = 5;
```

**A:** `undefined` (var is hoisted but not initialized)

**Q: What will this output?**

```javascript
console.log(y);
let y = 5;
```

**A:** `ReferenceError: Cannot access 'y' before initialization` (TDZ)

**Q: What will this output?**

```javascript
myFunc();
function myFunc() {
  console.log("Hello");
}
```

**A:** `'Hello'` (function declarations are fully hoisted)

#### Function vs Variable Hoisting

**Q: What will this output?**

```javascript
console.log(typeof myFunc);
var myFunc = "I'm a variable";
function myFunc() {
  return "I'm a function";
}
console.log(typeof myFunc);
```

**A:**

- First: `'function'` (function declaration takes precedence)
- Second: `'string'` (variable assignment overwrites function)

**Q: What will this output?**

```javascript
funcExpr(); // This will cause an error
var funcExpr = function () {
  console.log("Function expression");
};
```

**A:** `TypeError: funcExpr is not a function` (function expressions are not hoisted)

#### Temporal Dead Zone (TDZ) Questions

**Q: What will this output?**

```javascript
console.log(tdzVar);
let tdzVar = "I'm in TDZ";
```

**A:** `ReferenceError: Cannot access 'tdzVar' before initialization`

**Q: What will this output?**

```javascript
{
  console.log(blockVar);
  let blockVar = "block scoped";
}
```

**A:** `ReferenceError: Cannot access 'blockVar' before initialization` (TDZ applies in block scope too)

**Q: What will this output?**

```javascript
console.log(typeof undeclaredVar);
console.log(typeof declaredVar);
let declaredVar = "I exist";
```

**A:**

- First: `'undefined'` (undeclared variable)
- Second: `ReferenceError` (TDZ for declared variable)

#### Block Scope vs Function Scope

**Q: What will this output?**

```javascript
function scopeTest() {
  if (true) {
    var functionScoped = "I'm function scoped";
    let blockScoped = "I'm block scoped";
  }
  console.log(functionScoped); // This works
  console.log(blockScoped); // This will error
}
scopeTest();
```

**A:**

- First: `"I'm function scoped"` (var leaks to function scope)
- Second: `ReferenceError: blockScoped is not defined` (let stays in block)

**Q: What will this output?**

```javascript
var globalVar = "global";
function shadowTest() {
  console.log(globalVar);
  var globalVar = "local";
  console.log(globalVar);
}
shadowTest();
```

**A:**

- First: `undefined` (local var is hoisted, shadowing global)
- Second: `"local"` (after assignment)

#### Advanced Hoisting Scenarios

**Q: What will this output?**

```javascript
console.log(a, b, c);
var a = 1;
let b = 2;
const c = 3;
```

**A:** `undefined ReferenceError ReferenceError` (var hoisted, let/const in TDZ)

**Q: What will this output?**

```javascript
function test() {
  console.log(hoistedFunc());
  function hoistedFunc() {
    return "I'm hoisted!";
  }
}
test();
```

**A:** `"I'm hoisted!"` (function declarations are fully hoisted)

**Q: What will this output?**

```javascript
console.log(arrowFunc());
let arrowFunc = () => "I'm an arrow function";
```

**A:** `ReferenceError: Cannot access 'arrowFunc' before initialization` (arrow functions are not hoisted)

#### Tricky Tricky Questions

**Q: What will this output?**

```javascript
var x = 1;
if (true) {
  var x = 2;
  console.log(x);
}
console.log(x);
```

**A:**

- First: `2` (same variable, reassigned)
- Second: `2` (var is function-scoped, not block-scoped)

**Q: What will this output?**

```javascript
let x = 1;
if (true) {
  let x = 2;
  console.log(x);
}
console.log(x);
```

**A:**

- First: `2` (block-scoped variable)
- Second: `1` (different variable, outer scope unchanged)

**Q: What will this output?**

```javascript
function duplicate() {
  return "First";
}
function duplicate() {
  return "Second";
}
console.log(duplicate());
```

**A:** `"Second"` (second function declaration overwrites the first)

**Q: What’s wrong here?**

```javascript
const obj = { a: 1 };
obj = { a: 2 };
```

**A:** `TypeError: Assignment to constant variable.` (const prevents rebinding; object can still mutate)

**Q: Does this throw an error?**

```javascript
const obj = { a: 1 };
obj.a = 100;
console.log(obj.a);
```

**A:** `100` (const protects the binding, not the object's contents)

**Q: Can you redeclare a variable?**

```javascript
let a = 10;
let a = 20;
```

**A:** `SyntaxError: Identifier 'a' has already been declared` (cannot redeclare let/const in the same scope)

```javascript
var b = 10;
var b = 20;
console.log(b);
```

**A:** `20` (var allows redeclaration in the same scope)

**Q: Guess the output?**

```javascript
(function () {
  console.log(typeof a);
  var a = 10;
})();
```

**A:** `'undefined'` (`var a` is hoisted, but value assignment isn't; typeof sees undefined)

#### Code Execution Order Questions

**Q: What will this output?**

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
```

**A:** `1, 3, 2` (hoisting doesn't affect async execution)

**Q: What will this output?**

```javascript
var i;
for (i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

**A:** `3, 3, 3` (var is function-scoped, all closures reference same variable)

**Q: What will this output?**

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

**A:** `0, 1, 2` (let is block-scoped, each iteration creates new variable)

#### Deep Understanding Questions

**Q: Explain the difference between hoisting and scope**
**A:** Hoisting moves declarations to the top of their scope during compilation, while scope determines where variables are accessible. Hoisting doesn't change scope - it just moves declarations.

**Q: Why does TDZ exist for let/const but not var?**
**A:** TDZ prevents accessing variables before declaration, making code more predictable and catching errors early. var was designed to be more forgiving but this led to confusing behavior.

**Q: How does hoisting work with function expressions vs declarations?**
**A:** Function declarations are fully hoisted (both declaration and definition), while function expressions are treated like variables - only the declaration is hoisted, not the assignment.

**Q: What's the hoisting precedence order?**
**A:** 1) Function declarations (highest), 2) Variable declarations (var, let, const), 3) Function expressions and assignments (lowest).

**Q: Explain variable shadowing in the context of hoisting**
**A:** When a local variable has the same name as a global variable, the local declaration is hoisted, creating a "shadow" that prevents access to the global variable within that scope.

</details>

<details>
<summary><strong>🔍 Complete Hoisting Flow</strong></summary>

1. JavaScript engine scans the code
2. Hoists function declarations to top
3. Hoists variable declarations to top
4. Initializes `var` to `undefined`
5. Leaves `let`/`const` in TDZ
6. Executes code line by line

</details>

---

## 2. Variables

<details>
<summary><strong>📚 Concept Overview</strong></summary>

JavaScript variables are bindings to values. The three declaration forms are `var`, `let`, and `const`, each with different scoping and hoisting behaviors. Prefer `const` by default, use `let` for reassignments, and avoid `var` in modern code.

</details>

<details>
<summary><strong>🎯 Key Points</strong></summary>

- **var**: Function-scoped, hoisted with `undefined`, re-declarable, re-assignable, can attach to `globalThis` in scripts
- **let**: Block-scoped, hoisted but in TDZ, not re-declarable in same scope, re-assignable
- **const**: Block-scoped, hoisted but in TDZ, not re-declarable, not re-assignable (binding is constant)
- **Shadowing**: Inner binding with same name hides outer binding
- **Modules vs scripts**: Top-level `var` attaches to global only in scripts, not ES modules; top-level `this` differs

</details>

<details>
<summary><strong>📋 Cheatsheet</strong></summary>

| Feature                     | var                     | let       | const             |
| --------------------------- | ----------------------- | --------- | ----------------- |
| Scope                       | Function                | Block     | Block             |
| Hoisted?                    | Yes (init to undefined) | Yes (TDZ) | Yes (TDZ)         |
| Re-declare same scope       | Yes                     | No        | No                |
| Re-assign                   | Yes                     | Yes       | No (binding only) |
| Attaches to global (script) | Yes                     | No        | No                |

</details>

<details>
<summary><strong>💡 Code Snippets</strong></summary>

#### Declarations and Reassignment

```javascript
var a = 1;
a = 2;
var a = 3; // OK (but avoid)
let b = 1;
b = 2; // OK
// let b = 3;                  // ❌ SyntaxError (same scope)
const c = 1; // c = 2;         // ❌ TypeError (rebinding)
```

#### const with Objects/Arrays

```javascript
const user = { name: "A" };
user.name = "B"; // ✅ allowed (mutating object)
// user = {};      // ❌ TypeError (rebinding)
```

#### Shadowing

```javascript
let x = "outer";
{
  let x = "inner";
  console.log(x); // 'inner'
}
console.log(x); // 'outer'
```

</details>

<details>
<summary><strong>🚀 Best Practices</strong></summary>

- Prefer `const`; use `let` when reassignment is required
- Avoid `var` in modern code
- Declare variables in the narrowest scope close to first use
- Initialize on declaration to avoid TDZ surprises
- Avoid accidental globals; use modules or `'use strict'`

</details>

<details>
<summary><strong>🎯 Tricky Questions & Answers</strong></summary>

#### Hoisting and TDZ in Variables

```javascript
console.log(a); // undefined (var hoisted)
var a = 1;

// console.log(b); // ❌ ReferenceError (TDZ)
let b = 2;

// console.log(c); // ❌ ReferenceError (TDZ)
const c = 3;
```

#### Scope and Shadowing

```javascript
var g = "global";
function demo() {
  console.log(g); // undefined (local var g is hoisted and shadows global)
  var g = "local";
  console.log(g); // 'local'
}
demo();
```

#### Loops, Closures, Scope, and Hoisting

```javascript
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 3, 3, 3
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j)); // 0, 1, 2
```

- Explanation:
  - With `var`, there is a single function-scoped binding `i`. All scheduled callbacks run after the loop ends, reading the same final value (3).
  - With `let`, each iteration creates a new block-scoped binding `j`. Each callback closes over its own `j` value (0, 1, 2).
  - Hoisting: `var i` is hoisted to the function scope and initialized to `undefined` once; `let j` is hoisted per-iteration but remains in the TDZ until the iteration body begins.

</details>

<details>
<summary><strong>🔍 Deep Dive</strong></summary>

- In scripts, `var name = ...` creates `globalThis.name`; `let/const` do not
- In ES modules, top-level bindings do not attach to `globalThis`, and top-level `this` is `undefined`
- Loop `let` semantics create a fresh environment record per iteration
- Variables remain alive as long as referenced (e.g., by closures)

</details>
