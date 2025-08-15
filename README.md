# JavaScript Preparation Guide

A comprehensive collection of JavaScript concepts, cheatsheets, and code snippets for JS preparation.

## Table of Contents

1. [Hoisting](#hoisting)
2. [Variables](#variables)
3. [Objects](#objects)
4. [Exports & Imports](#exports-and-imports)
5. [Strict Mode](#strict-mode)
6. [Scope](#scope)
7. [Array Methods](#array-methods)

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

**Q: What's wrong here?**

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
<summary><strong>➕ More Tricky Variable Questions</strong></summary>

**Q: What's wrong here?**

```javascript
const obj = { a: 1 };
obj = { a: 2 };
```

**A:** `TypeError: Assignment to constant variable.` (const prevents rebinding; the object itself could still be mutated)

**Q: Does this throw an error?**

```javascript
const obj = { a: 1 };
obj.a = 100;
console.log(obj.a);
```

**A:** `100` (const means the binding is constant, not the contents of the object)

**Q: Can you redeclare a variable?**

```javascript
let a = 10;
let a = 20;
```

**A:** `SyntaxError: Identifier 'a' has already been declared` (cannot redeclare `let`/`const` in the same scope)

```javascript
var b = 10;
var b = 20;
console.log(b);
```

**A:** `20` (`var` allows redeclaration in the same scope)

**Q: Guess the output?**

```javascript
(function () {
  console.log(typeof a);
  var a = 10;
})();
```

**A:** `'undefined'` (`var a` is hoisted, but value assignment isn't; typeof sees undefined)

</details>

<details>
<summary><strong>🔍 Deep Dive</strong></summary>

- In scripts, `var name = ...` creates `globalThis.name`; `let/const` do not
- In ES modules, top-level bindings do not attach to `globalThis`, and top-level `this` is `undefined`
- Loop `let` semantics create a fresh environment record per iteration
- Variables remain alive as long as referenced (e.g., by closures)

</details>

---

## 3. Objects

<details>
<summary><strong>📚 Concept Overview</strong></summary>

Objects are mutable key–value collections with a prototype chain. Keys are strings or symbols. Property behavior is controlled by descriptors (writable, enumerable, configurable) and accessors (get/set). Prototypes enable inheritance and method sharing across instances.

</details>

<details>
<summary><strong>🎯 Key Points</strong></summary>

- **Creation**: literals `{}`, `Object.create(proto)`, constructors, classes (prototype sugar)
- **Keys**: strings or symbols; numeric keys are coerced to strings
- **Descriptors**: data vs accessor; `writable`, `enumerable`, `configurable`
- **Prototype**: own vs inherited; use `Object.hasOwn` for own checks
- **this**: depends on call-site; arrow functions capture lexical `this`
- **Iteration**: `Object.keys/values/entries`, `for...in` (includes inherited), `Reflect.ownKeys`
- **Copying**: shallow `{...obj}` / `Object.assign`; deep `structuredClone`
- **Immutability**: `Object.freeze`/`seal`/`preventExtensions` (all shallow)
- **Objects vs Map**: Map for non-string keys, frequent add/remove, stable iteration

</details>

<details>
<summary><strong>📋 Cheatsheet</strong></summary>

| Topic               | Recommended API                                   | Notes                                     |
| ------------------- | ------------------------------------------------- | ----------------------------------------- |
| Own property check  | `Object.hasOwn(obj, key)`                         | Prefer over `hasOwnProperty` on instances |
| Get descriptor      | `Object.getOwnPropertyDescriptor(obj, key)`       | Distinguish data vs accessor              |
| Define property     | `Object.defineProperty(obj, key, desc)`           | Control writability/enumerability         |
| Create with proto   | `Object.create(proto, descriptors?)`              | Explicit prototype                        |
| Get/Set prototype   | `Object.getPrototypeOf` / `Object.setPrototypeOf` | Avoid set in hot paths                    |
| Keys/values/entries | `Object.keys/values/entries(obj)`                 | Own, enumerable string keys               |
| All own keys        | `Reflect.ownKeys(obj)`                            | Includes symbols/non-enumerables          |
| Shallow copy        | `{ ...obj }`, `Object.assign({}, obj)`            | Own enumerable string+symbol              |
| Deep clone          | `structuredClone(obj)`                            | Preserves Dates, Maps, Sets               |
| Freeze/Seal         | `Object.freeze/Seal(obj)`                         | Shallow only                              |

</details>

<details>
<summary><strong>💡 Code Snippets</strong></summary>

#### Creating Objects

```javascript
const user = { name: "Ada", age: 36 };
const bare = Object.create(null);
const proto = {
  greet() {
    return `hi ${this.name}`;
  },
};
const child = Object.create(proto, {
  name: { value: "Lin", enumerable: true, writable: true },
});

class Person {
  constructor(name) {
    this.name = name;
  }
  say() {
    return `Hello ${this.name}`;
  }
}
```

#### Descriptors (data vs accessor)

```javascript
const book = {};
Object.defineProperty(book, "title", {
  value: "JS Deep",
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(book, "upperTitle", {
  get() {
    return this.title.toUpperCase();
  },
  enumerable: true,
});
```

#### Own vs Inherited

```javascript
const base = { a: 1 };
const obj = Object.create(base);
obj.b = 2;
Object.keys(obj); // ["b"]
"a" in obj; // true
Object.hasOwn(obj, "a"); // false
```

#### this and binding

```javascript
const counter = {
  n: 0,
  inc() {
    this.n++;
  },
};
const f = counter.inc;
// f(); // wrong: this is undefined/global
f.call(counter); // correct
const bound = counter.inc.bind(counter);
bound();
```

#### Iteration APIs

```javascript
const o = Object.create(
  { inherited: 1 },
  {
    a: { value: 1, enumerable: true },
    [Symbol("s")]: { value: 2, enumerable: true },
  }
);
Object.keys(o); // ["a"]
Object.values(o); // [1]
Object.entries(o); // [["a",1]]
Reflect.ownKeys(o); // ["a", Symbol(s)]
for (const k in o) {
  /* includes inherited enumerable keys */
}
```

#### Copying & Deep Clone

```javascript
const shallow = { ...o };
const deep = structuredClone({ d: new Date(), m: new Map([[1, "a"]]) });
```

#### Freeze vs Seal (shallow)

```javascript
const fz = Object.freeze({ a: 1, nested: { x: 1 } });
// fz.a = 2; // no-op / error in strict
fz.nested.x = 2; // allowed (freeze is shallow)
```

#### Objects vs Map

```javascript
const m = new Map();
const k = {};
m.set(k, 123);
m.get(k); // 123
```

#### To-Primitive

```javascript
const price = {
  amount: 10,
  [Symbol.toPrimitive](hint) {
    return hint === "string" ? `$${this.amount}` : this.amount;
  },
};
String(price); // "$10"
+price; // 10
```

#### Proxy + Reflect

```javascript
const target = { a: 1 };
const p = new Proxy(target, {
  get(t, k, r) {
    return Reflect.get(t, k, r);
  },
  set(t, k, v, r) {
    if (k === "a" && v < 0) return false;
    return Reflect.set(t, k, v, r);
  },
});
p.a;
p.a = -1; // fails (or throws in strict mode)
```

</details>

<details>
<summary><strong>🚀 Best Practices</strong></summary>

- Prefer literals and `Object.create` for explicit prototypes
- Use `Object.hasOwn` for own checks; avoid `hasOwnProperty` from instances
- Avoid mutating `__proto__`; do not set prototypes dynamically in hot paths
- Treat `Object.freeze`/`seal` as shallow; document immutability policy
- Prefer Map when keys aren't strings/symbols or when frequent add/remove is needed

</details>

<details>
<summary><strong>🎯 Tricky Questions & Answers</strong></summary>

#### Basic Object Questions

**Q: What will this output?**

```javascript
const obj = { a: 1 };
console.log(obj.b);
```

**A:** `undefined` (accessing non-existent property returns undefined)

**Q: What will this output?**

```javascript
const obj = { a: 1 };
console.log("a" in obj);
console.log(Object.hasOwn(obj, "a"));
```

**A:** Both `true` (property exists and is own)

#### Enumerable vs Own vs Inherited

**Q: What will this output?**

```javascript
const base = { a: 1 };
const obj = Object.create(base, { b: { value: 2, enumerable: true } });
console.log(Object.keys(obj));
console.log("a" in obj);
console.log(Object.hasOwn(obj, "a"));
```

**A:** `["b"]`, `true`, `false` (keys lists own enumerable only; `in` checks prototype chain; `hasOwn` checks only own)

**Q: What will this output?**

```javascript
const o = {};
Object.defineProperty(o, "x", { value: 1, enumerable: false });
console.log(Object.keys(o));
console.log("x" in o);
```

**A:** `[]`, `true` (non-enumerable properties are hidden from keys but still exist)

#### Getter/Setter Behavior

**Q: What will this output?**

```javascript
const src = {
  get x() {
    return Math.random();
  },
};
const a = Object.assign({}, src);
const b = { ...src };
console.log(typeof a.x);
console.log(typeof b.x);
```

**A:** Both `'number'` (getters are materialized as values during copy)

**Q: What will this output?**

```javascript
const obj = {
  get x() {
    return this._x;
  },
  set x(val) {
    this._x = val * 2;
  },
};
obj.x = 5;
console.log(obj.x);
```

**A:** `10` (setter multiplies by 2, getter returns stored value)

#### this Binding Issues

**Q: What will this output?**

```javascript
const obj = {
  n: 0,
  inc() {
    this.n++;
  },
};
const inc = obj.inc;
inc();
console.log(obj.n);
```

**A:** `0` (this becomes undefined/global, doesn't affect obj.n)

**Q: What will this output?**

```javascript
const obj = {
  n: 0,
  inc: () => {
    this.n++;
  },
};
obj.inc();
console.log(obj.n);
```

**A:** `0` (arrow function captures lexical this, not obj)

#### Symbol Keys and Enumeration

**Q: What will this output?**

```javascript
const S = Symbol("s");
const o = { [S]: 1, a: 2 };
console.log(Object.keys(o));
console.log(Reflect.ownKeys(o));
```

**A:** `["a"]`, `["a", Symbol(s)]` (keys excludes symbols, ownKeys includes them)

**Q: What will this output?**

```javascript
const sym1 = Symbol("a");
const sym2 = Symbol("a");
const obj = { [sym1]: 1, [sym2]: 2 };
console.log(obj[sym1]);
console.log(obj[sym2]);
```

**A:** `1`, `2` (symbols are unique even with same description)

#### Object vs Map Key Behavior

**Q: What will this output?**

```javascript
const obj = {};
const k1 = {};
const k2 = {};
obj[k1] = 1;
obj[k2] = 2;
console.log(obj["[object Object]"]);
```

**A:** `2` (objects are coerced to string "[object Object]", last write wins)

**Q: What will this output?**

```javascript
const map = new Map();
const k1 = {};
const k2 = {};
map.set(k1, 1);
map.set(k2, 2);
console.log(map.get(k1));
console.log(map.get(k2));
```

**A:** `1`, `2` (Map preserves object identity)

#### Freeze and Immutability

**Q: What will this output?**

```javascript
const frozen = Object.freeze({ nested: { a: 1 } });
frozen.nested.a = 2;
console.log(frozen.nested.a);
```

**A:** `2` (freeze is shallow, nested objects can still be mutated)

**Q: What will this output?**

```javascript
const sealed = Object.seal({ a: 1 });
sealed.a = 2;
sealed.b = 3;
console.log(sealed.a);
console.log(sealed.b);
```

**A:** `2`, `undefined` (seal allows modifying existing properties, not adding new ones)

#### To-Primitive Conversion

**Q: What will this output?**

```javascript
const x = {
  valueOf() {
    return 7;
  },
  toString() {
    return "obj";
  },
};
console.log(x + 1);
console.log(String(x));
```

**A:** `8`, `"obj"` (valueOf for math, toString for string context)

**Q: What will this output?**

```javascript
const obj = {
  [Symbol.toPrimitive](hint) {
    return hint === "string" ? "str" : 42;
  },
};
console.log(obj + 1);
console.log(String(obj));
```

**A:** `43`, `"str"` (Symbol.toPrimitive takes precedence over valueOf/toString)

#### DefineProperty vs Direct Assignment

**Q: What will this output?**

```javascript
const o = {};
Object.defineProperty(o, "a", { value: 1, writable: false });
o.a = 2;
console.log(o.a);
```

**A:** `1` (non-writable property cannot be changed)

**Q: What will this output?**

```javascript
const o = {};
Object.defineProperty(o, "a", { value: 1, configurable: false });
delete o.a;
console.log(o.a);
```

**A:** `1` (non-configurable property cannot be deleted)

#### **proto** and Prototype Chain

**Q: What will this output?**

```javascript
const dict = Object.create(null);
console.log(dict.hasOwnProperty);
console.log(Object.hasOwn(dict, "x"));
```

**A:** `undefined`, `false` (null prototype objects lack Object.prototype methods)

**Q: What will this output?**

```javascript
const obj = { a: 1 };
const child = Object.create(obj);
child.a = 2;
delete child.a;
console.log(child.a);
```

**A:** `1` (deleting own property reveals inherited one)

#### Property Order Rules

**Q: What will this output?**

```javascript
const o = { 2: "b", 1: "a", x: 1, y: 2 };
console.log(Object.keys(o));
```

**A:** `["1","2","x","y"]` (integer-like keys first in ascending order, then strings in insertion order)

**Q: What will this output?**

```javascript
const o = { x: 1, 1: "a", y: 2, 2: "b" };
console.log(Object.keys(o));
```

**A:** `["1","2","x","y"]` (numeric keys always come first)

#### JSON Serialization Quirks

**Q: What will this output?**

```javascript
console.log(JSON.stringify({ a: 1, b: undefined, c: Symbol() }));
```

**A:** `{"a":1}` (undefined and symbols are dropped)

**Q: What will this output?**

```javascript
console.log(JSON.stringify([undefined, null, 1]));
```

**A:** `[null,null,1]` (undefined becomes null in arrays)

**Q: What will this output?**

```javascript
const obj = {
  toJSON() {
    return { custom: true };
  },
};
console.log(JSON.stringify(obj));
```

**A:** `{"custom":true}` (toJSON method customizes serialization)

#### Spread and Object.assign Behavior

**Q: What will this output?**

```javascript
const base = {};
Object.defineProperty(base, "hidden", { value: 1, enumerable: false });
console.log({ ...base }.hidden);
```

**A:** `undefined` (spread only copies enumerable properties)

**Q: What will this output?**

```javascript
const target = { a: 1 };
const source = { a: 2, b: 3 };
Object.assign(target, source);
console.log(target);
```

**A:** `{a: 2, b: 3}` (Object.assign mutates target and returns it)

#### Proxy and Reflect

**Q: What will this output?**

```javascript
const target = { a: 1 };
const proxy = new Proxy(target, {
  get(t, k, r) {
    return Reflect.get(t, k, r) * 2;
  },
});
console.log(proxy.a);
```

**A:** `2` (proxy intercepts get and doubles the value)

**Q: What will this output?**

```javascript
const target = { a: 1 };
const proxy = new Proxy(target, {
  set(t, k, v, r) {
    if (v < 0) return false;
    return Reflect.set(t, k, v, r);
  },
});
proxy.a = -1;
console.log(proxy.a);
```

**A:** `1` (setter rejects negative values, original value unchanged)

#### Deep Clone vs Shallow Copy

**Q: What will this output?**

```javascript
const original = { a: 1, nested: { b: 2 } };
const shallow = { ...original };
const deep = structuredClone(original);
original.nested.b = 3;
console.log(shallow.nested.b);
console.log(deep.nested.b);
```

**A:** `3`, `2` (shallow copy shares nested objects, deep clone doesn't)

**Q: What will this output?**

```javascript
const obj = { func: () => console.log("hi") };
const cloned = structuredClone(obj);
console.log(typeof cloned.func);
```

**A:** `'undefined'` (structuredClone cannot clone functions)

#### Optional Chaining and Nullish Coalescing

**Q: What will this output?**

```javascript
const obj = { a: { b: { c: 1 } } };
console.log(obj?.a?.b?.c);
console.log(obj?.x?.y);
```

**A:** `1`, `undefined` (optional chaining safely accesses nested properties)

**Q: What will this output?**

```javascript
const obj = { a: 0, b: null, c: undefined };
console.log(obj.a ?? "default");
console.log(obj.b ?? "default");
console.log(obj.c ?? "default");
```

**A:** `0`, `"default"`, `"default"` (nullish coalescing only uses default for null/undefined)

#### Object Equality and References

**Q: What will this output?**

```javascript
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2);
console.log(JSON.stringify(obj1) === JSON.stringify(obj2));
```

**A:** `false`, `true` (objects compared by reference, not value)

**Q: What will this output?**

```javascript
const obj = { a: 1 };
const copy = obj;
copy.a = 2;
console.log(obj.a);
```

**A:** `2` (copy and obj reference the same object)

#### Class Fields and Methods

**Q: What will this output?**

```javascript
class Example {
  field = 1;
  constructor() {
    this.field = 2;
  }
}
const e = new Example();
console.log(e.field);
```

**A:** `2` (constructor assignment overwrites field initialization)

**Q: What will this output?**

```javascript
class Example {
  #private = 1;
  getPrivate() {
    return this.#private;
  }
}
const e = new Example();
console.log(e.getPrivate());
console.log(e.#private);
```

**A:** `1`, `SyntaxError` (private fields are accessible within class, not outside)

#### Advanced Prototype Chain

**Q: What will this output?**

```javascript
const proto = { a: 1 };
const obj = Object.create(proto);
proto.a = 2;
console.log(obj.a);
```

**A:** `2` (prototype changes affect all objects inheriting from it)

**Q: What will this output?**

```javascript
const obj = {};
Object.setPrototypeOf(obj, { a: 1 });
console.log(obj.a);
```

**A:** `1` (setPrototypeOf changes the prototype chain)

</details>

<details>
<summary><strong>🔍 Deep Dive</strong></summary>

- **Property order**: Integer-like keys (ascending) → string keys (insertion order) → symbols
- **Performance**: Prefer `Object.create` with desired prototype over `Object.setPrototypeOf` in hot paths
- **Proxy invariants**: Must respect object invariants; use `Reflect` to preserve default semantics
- **structuredClone limitations**: Cannot clone functions, DOM nodes, or objects with circular references
- **JSON.stringify behavior**: Drops functions, symbols, undefined; converts undefined to null in arrays
- **Object equality**: Use `Object.is` for special cases (NaN, ±0); `===` for reference equality
- **Private fields**: Truly private, not accessible via bracket notation or reflection
- **Class fields**: Initialize before constructor runs; can be overridden in constructor

</details>

---

## 4. Exports & Imports

<details>
<summary><strong>📚 Concept Overview</strong></summary>

JavaScript modules provide a way to organize and share code between files. ES Modules (ESM) use `import`/`export` statements, while CommonJS uses `require()`/`module.exports`. Named exports allow multiple exports per module, while default exports provide a single primary export. Understanding the differences and best practices is crucial for modern JavaScript development.

</details>

<details>
<summary><strong>🎯 Key Points</strong></summary>

- **Named Exports**: Multiple exports per module, must be imported with exact names or aliased
- **Default Exports**: Single primary export per module, can be imported with any name
- **Mixed Exports**: Combine both named and default exports in one module
- **ES Modules vs CommonJS**: ESM is static, CommonJS is dynamic; ESM supports top-level await
- **Import Types**: Named, default, namespace, and dynamic imports
- **Re-exports**: Forward exports from other modules without importing them locally
- **Module Resolution**: Node.js resolves paths based on file extensions and package.json

</details>

<details>
<summary><strong>📋 Cheatsheet</strong></summary>

| Export Type      | Syntax                                    | Import Syntax                              | Notes                                 |
| ---------------- | ----------------------------------------- | ------------------------------------------ | ------------------------------------- |
| Named Export     | `export const x = 1;`                     | `import { x } from './module';`            | Multiple per module, exact name match |
| Default Export   | `export default class X {}`               | `import X from './module';`                | One per module, any import name       |
| Mixed Export     | `export const x = 1; export default y;`   | `import y, { x } from './module';`         | Default first, then named in braces   |
| Re-export        | `export { x } from './module';`           | `import { x } from './current';`           | Forward without local import          |
| Namespace Import | `export const x = 1; export const y = 2;` | `import * as ns from './module';`          | Access as `ns.x`, `ns.y`              |
| Dynamic Import   | N/A                                       | `const module = await import('./module');` | Runtime loading, returns promise      |
| CommonJS Export  | `module.exports = x;`                     | `const x = require('./module');`           | Node.js legacy, dynamic               |
| CommonJS Named   | `exports.x = 1;`                          | `const { x } = require('./module');`       | Destructuring from module.exports     |

</details>

<details>
<summary><strong>💡 Code Snippets</strong></summary>

#### Named Exports

```javascript
// math.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export class Calculator {
  constructor() {
    this.result = 0;
  }
  add(x) {
    this.result += x;
    return this;
  }
}

// main.js
import { PI, add, Calculator } from "./math.js";
console.log(PI); // 3.14159
console.log(add(2, 3)); // 5
const calc = new Calculator();
```

#### Default Exports

```javascript
// app.js
export default class App {
  constructor(name) {
    this.name = name;
  }
  start() {
    console.log(`${this.name} started!`);
  }
}

// main.js
import MyApp from "./app.js"; // Can use any name
import App from "./app.js"; // Or the original name
const app = new MyApp("MyApp");
app.start(); // "MyApp started!"
```

#### Mixed Exports

```javascript
// utils.js
export const VERSION = "1.0.0";
export const DEBUG = true;

export default function main() {
  console.log("Main function");
}

// main.js
import main, { VERSION, DEBUG } from "./utils.js";
// Default import first, then named imports in braces
```

#### Re-exports

```javascript
// lib/index.js
export { add, subtract } from "./math.js";
export { default as Calculator } from "./calculator.js";
export * from "./utils.js"; // Re-export all named exports

// main.js
import { add, subtract, Calculator } from "./lib/index.js";
// No need to know the internal file structure
```

#### Dynamic Imports

```javascript
// Dynamic loading based on condition
async function loadModule(moduleName) {
  try {
    const module = await import(`./modules/${moduleName}.js`);
    return module.default || module;
  } catch (error) {
    console.error("Failed to load module:", error);
    return null;
  }
}

// Usage
const mathModule = await loadModule("math");
```

#### CommonJS vs ES Modules

```javascript
// CommonJS (Node.js)
// math.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

// main.js
const math = require("./math.js");
console.log(math.add(2, 3)); // 5

// ES Modules (Modern)
// math.js
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}

// main.js
import { add, subtract } from "./math.js";
console.log(add(2, 3)); // 5
```

#### Namespace Imports

```javascript
// utils.js
export const formatDate = (date) => date.toISOString();
export const formatCurrency = (amount) => `$${amount}`;
export const validateEmail = (email) => email.includes("@");

// main.js
import * as Utils from "./utils.js";
console.log(Utils.formatDate(new Date()));
console.log(Utils.formatCurrency(100));
console.log(Utils.validateEmail("test@example.com"));
```

#### Import Aliasing

```javascript
// math.js
export function add(a, b) {
  return a + b;
}
export function multiply(a, b) {
  return a * b;
}

// main.js
import { add as sum, multiply as product } from "./math.js";
console.log(sum(2, 3)); // 5
console.log(product(2, 3)); // 6
```

#### Top-level Await (ES Modules)

```javascript
// config.js
export const config = await fetch("/api/config").then((r) => r.json());

// main.js
import { config } from "./config.js";
console.log("Config loaded:", config);
// Only works in ES modules, not CommonJS
```

</details>

<details>
<summary><strong>🚀 Best Practices</strong></summary>

- **Use named exports** for utility functions and constants; use default exports for main classes/components
- **Prefer ES Modules** over CommonJS for new code; they're the standard and support top-level await
- **Use re-exports** to create clean public APIs and hide internal module structure
- **Avoid circular dependencies**; they can cause issues with both ESM and CommonJS
- **Use dynamic imports** for code splitting and lazy loading to improve performance
- **Be consistent** with import/export patterns across your codebase
- **Use TypeScript** for better module resolution and type safety

</details>

<details>
<summary><strong>🎯 Tricky Questions & Answers</strong></summary>

#### Basic Export/Import Behavior

**Q: What will this output?**

```javascript
// math.js
export const x = 1;
export const y = 2;

// main.js
import { x, z } from "./math.js";
console.log(x);
console.log(z);
```

**A:** `1`, `ReferenceError: z is not defined` (importing non-existent named export causes error)

**Q: What will this output?**

```javascript
// app.js
export default class App {}
export const VERSION = "1.0.0";

// main.js
import App, { VERSION } from "./app.js";
console.log(typeof App);
console.log(VERSION);
```

**A:** `'function'` (class is a function), `'1.0.0'` (mixed import works correctly)

#### Default Export Behavior

**Q: What will this output?**

```javascript
// module.js
export default function () {
  return "default";
}
export const named = "named";

// main.js
import anyName, { named } from "./module.js";
console.log(anyName());
console.log(named);
```

**A:** `'default'`, `'named'` (default export can be imported with any name)

**Q: What will this output?**

```javascript
// module.js
export default { x: 1, y: 2 };

// main.js
import obj from "./module.js";
console.log(obj.x);
```

**A:** `1` (default export can be any value, including objects)

#### Import/Export Aliasing

**Q: What will this output?**

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add as sum } from "./math.js";
console.log(sum(2, 3));
console.log(add(2, 3));
```

**A:** `5`, `ReferenceError: add is not defined` (aliased import hides original name)

**Q: What will this output?**

```javascript
// utils.js
export const x = 1;
export const y = 2;

// main.js
import { x as y, y as x } from "./utils.js";
console.log(x, y);
```

**A:** `2, 1` (aliases swap the values)

#### Re-export Behavior

**Q: What will this output?**

```javascript
// inner.js
export const x = 1;
export default 'default';

// middle.js
export { x } from './inner.js';
export { default } from './inner.js';

// main.js
import defaultExport, { x } from './middle.js';
console.log(defaultExport);
console.log(x);
```

**A:** `'default'`, `1` (re-exports forward both named and default exports)

**Q: What will this output?**

```javascript
// math.js
export const add = (a, b) => a + b;

// index.js
export { add as sum } from "./math.js";

// main.js
import { sum } from "./index.js";
console.log(sum(2, 3));
```

**A:** `5` (re-export with alias works correctly)

#### CommonJS vs ES Modules

**Q: What will this output?**

```javascript
// module.js (CommonJS)
module.exports = { x: 1, y: 2 };

// main.js (ES Module)
import obj from "./module.js";
console.log(obj.x);
```

**A:** `1` (ES modules can import CommonJS modules, but not vice versa)

**Q: What will this output?**

```javascript
// module.js (CommonJS)
exports.x = 1;
exports.y = 2;

// main.js (ES Module)
import { x, y } from "./module.js";
console.log(x, y);
```

**A:** `1, 2` (named exports from CommonJS work in ES modules)

**Q: What will this output?**

```javascript
// module.js (ES Module)
export const x = 1;
export default "default";

// main.js (CommonJS)
const module = require("./module.js");
console.log(module.x);
console.log(module.default);
```

**A:** `1`, `'default'` (CommonJS gets default export as `.default` property)

#### Dynamic Imports

**Q: What will this output?**

```javascript
// math.js
export const add = (a, b) => a + b;

// main.js
async function test() {
  const math = await import("./math.js");
  console.log(math.add(2, 3));
  console.log(typeof math.default);
}
test();
```

**A:** `5`, `'undefined'` (named exports are properties, no default export)

**Q: What will this output?**

```javascript
// app.js
export default class App {}

// main.js
async function test() {
  const module = await import("./app.js");
  console.log(typeof module.default);
  console.log(typeof module.App);
}
test();
```

**A:** `'function'`, `'undefined'` (default export is in `.default` property)

#### Module Resolution

**Q: What will this output?**

```javascript
// file.js
export const x = 1;

// main.js
import { x } from "./file"; // No .js extension
console.log(x);
```

**A:** `1` (Node.js automatically resolves .js extension)

**Q: What will this output?**

```javascript
// index.js
export const x = 1;

// main.js
import { x } from "./folder"; // folder/index.js
console.log(x);
```

**A:** `1` (Node.js automatically resolves index.js in folders)

#### Circular Dependencies

**Q: What will this output?**

```javascript
// a.js
import { b } from "./b.js";
export const a = 1;
console.log("a loaded, b =", b);

// b.js
import { a } from "./a.js";
export const b = 2;
console.log("b loaded, a =", a);

// main.js
import { a } from "./a.js";
```

**A:** `'b loaded, a = undefined'`, `'a loaded, b = 2'` (circular dependency causes undefined values)

#### Top-level Await

**Q: What will this output?**

```javascript
// config.js
export const config = await Promise.resolve({ api: "https://api.example.com" });

// main.js
import { config } from "./config.js";
console.log(config.api);
```

**A:** `'https://api.example.com'` (top-level await works in ES modules)

**Q: What will this output?**

```javascript
// data.js
export const data = await fetch("/api/data").then((r) => r.json());

// main.js
import { data } from "./data.js";
console.log(data);
```

**A:** The fetched data (top-level await can be used for API calls)

#### Import/Export Hoisting

**Q: What will this output?**

```javascript
// utils.js
export function log() {
  console.log("utils loaded");
}

// main.js
log(); // Call before import
import { log } from "./utils.js";
```

**A:** `'utils loaded'` (imports are hoisted to the top)

**Q: What will this output?**

```javascript
// main.js
console.log("Before import");
import { x } from "./module.js";
console.log("After import");
```

**A:** `'Before import'`, `'After import'` (imports are hoisted but execution order is preserved)

#### Namespace Imports

**Q: What will this output?**

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import * as Math from "./math.js";
console.log(Math.add(5, 3));
console.log(Math.subtract(5, 3));
console.log(typeof Math.default);
```

**A:** `8`, `2`, `'undefined'` (namespace import includes all named exports, no default)

**Q: What will this output?**

```javascript
// module.js
export default "default";
export const x = 1;
export const y = 2;

// main.js
import * as ns from "./module.js";
console.log(ns.default);
console.log(ns.x);
console.log(ns.y);
```

**A:** `'default'`, `1`, `2` (namespace import includes both default and named exports)

#### Export Statement Behavior

**Q: What will this output?**

```javascript
// module.js
const x = 1;
const y = 2;
export { x, y as z };

// main.js
import { x, z } from "./module.js";
console.log(x, z);
```

**A:** `1, 2` (export statement can alias exports)

**Q: What will this output?**

```javascript
// module.js
export { x, y } from "./other.js";

// main.js
import { x, y } from "./module.js";
console.log(x, y);
```

**A:** Depends on `other.js` content (re-export forwards exports from another module)

#### Mixed Import/Export Scenarios

**Q: What will this output?**

```javascript
// module.js
export const x = 1;
export default function () {
  return "default";
}

// main.js
import def, { x } from "./module.js";
console.log(def());
console.log(x);
```

**A:** `'default'`, `1` (mixed import: default first, then named in braces)

**Q: What will this output?**

```javascript
// module.js
export default class App {}
export const VERSION = "1.0.0";

// main.js
import App, { VERSION } from "./module.js";
console.log(typeof App);
console.log(VERSION);
```

**A:** `'function'`, `'1.0.0'` (class is a function, mixed import works)

#### Error Handling in Dynamic Imports

**Q: What will this output?**

```javascript
// main.js
async function loadModule() {
  try {
    const module = await import("./non-existent.js");
    return module;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
}

loadModule();
```

**A:** `'Error: Cannot find module './non-existent.js''` (dynamic imports throw errors for missing modules)

#### Module Interoperability

**Q: What will this output?**

```javascript
// legacy.js (CommonJS)
module.exports = function () {
  return "legacy";
};

// modern.js (ES Module)
import legacy from "./legacy.js";
console.log(legacy());
```

**A:** `'legacy'` (ES modules can import CommonJS modules)

**Q: What will this output?**

```javascript
// modern.js (ES Module)
export default function () {
  return "modern";
}

// legacy.js (CommonJS)
const modern = require("./modern.js");
console.log(modern());
```

**A:** `TypeError: modern is not a function` (CommonJS cannot directly import ES modules)

</details>

<details>
<summary><strong>🔍 Deep Dive</strong></summary>

- **Module Resolution**: Node.js uses a specific algorithm to resolve module paths, checking file extensions and package.json
- **Hoisting**: Import statements are hoisted to the top of the module, but execution order is preserved
- **Circular Dependencies**: Can cause issues with both ESM and CommonJS; ESM handles them better with live bindings
- **Live Bindings**: ES modules use live bindings, meaning changes to exported values are reflected in importing modules
- **Tree Shaking**: ES modules enable better tree shaking (dead code elimination) than CommonJS
- **Top-level Await**: Only available in ES modules, not CommonJS; useful for initialization and configuration
- **Dynamic Imports**: Return promises and enable code splitting; useful for lazy loading and conditional imports
- **Module Federation**: Advanced technique for sharing modules between different applications at runtime

</details>

---

## 5. Strict Mode

<details>
<summary><strong>📚 Concept Overview</strong></summary>

Strict mode is a way to opt into a restricted variant of JavaScript that catches common coding mistakes and prevents certain actions. It's enabled by adding `'use strict';` at the beginning of a script or function. Strict mode helps write more secure and optimized JavaScript code.

</details>

<details>
<summary><strong>🎯 Key Points</strong></summary>

- **Enabling**: Add `'use strict';` at the top of script or function
- **Scope**: Can be global (entire script) or local (function only)
- **Variables**: Prevents accidental global variable creation
- **this**: `this` is `undefined` instead of global object in function calls
- **Parameters**: No duplicate parameter names allowed
- **Properties**: Cannot assign to read-only properties
- **Octal**: Octal literals (e.g., `010`) are not allowed
- **delete**: Cannot delete variables, functions, or function parameters

</details>

<details>
<summary><strong>📋 Cheatsheet</strong></summary>

| Feature                   | Non-Strict Mode               | Strict Mode    |
| ------------------------- | ----------------------------- | -------------- |
| Undeclared variables      | Creates global variable       | ReferenceError |
| this in function calls    | global object (window/global) | undefined      |
| Duplicate parameters      | Allowed (last wins)           | SyntaxError    |
| Octal literals            | Allowed (010 = 8)             | SyntaxError    |
| delete on variables       | Allowed (no effect)           | SyntaxError    |
| Read-only property assign | Silently fails                | TypeError      |
| eval/arguments as names   | Allowed                       | SyntaxError    |
| with statement            | Allowed                       | SyntaxError    |

</details>

<details>
<summary><strong>💡 Code Snippets</strong></summary>

#### Basic Strict Mode Examples

```javascript
// Non-strict mode
function nonStrict() {
  undeclaredVar = 5; // Creates global variable
  console.log(this); // global object (window/global)
  console.log(undeclaredVar); // 5
}

// Strict mode
function strict() {
  "use strict";
  // undeclaredVar = 5; // ReferenceError: undeclaredVar is not defined
  console.log(this); // undefined
}
```

#### Variable Declaration Differences

```javascript
// Non-strict mode
function test() {
  x = 10; // Creates global variable
  console.log(x); // 10
  console.log(window.x); // 10 (in browser)
}
test();

// Strict mode
function testStrict() {
  "use strict";
  // x = 10; // ReferenceError: x is not defined
  let x = 10; // Must declare
  console.log(x); // 10
}
testStrict();
```

#### this Binding Differences

```javascript
// Non-strict mode
function regular() {
  console.log(this);
}
regular(); // global object (window/global)

// Strict mode
function strict() {
  "use strict";
  console.log(this);
}
strict(); // undefined
```

#### Parameter and Property Restrictions

```javascript
// Non-strict mode
function duplicate(a, a) {
  // Allowed, second 'a' wins
  console.log(a);
}
duplicate(1, 2); // 2

// Strict mode
function strictDuplicate(a, a) {
  // SyntaxError: Duplicate parameter name
  "use strict";
  console.log(a);
}

// Property assignment
const obj = {};
Object.defineProperty(obj, "x", { value: 1, writable: false });
obj.x = 2;
console.log(obj.x);
```

**A:** `1` (non-strict mode silently fails, strict mode throws TypeError)

**Q: What will this output?**

```javascript
"use strict";
const obj = {};
Object.defineProperty(obj, "x", { value: 1, writable: false });
obj.x = 2;
console.log(obj.x);
```

**A:** `TypeError: Cannot assign to read only property` (strict mode throws error)

#### delete Operator Differences

```javascript
// Non-strict mode
var x = 1;
delete x; // Allowed (but has no effect)
console.log(x); // 1

// Strict mode
("use strict");
var y = 1;
// delete y; // SyntaxError: Delete of an unqualified identifier
```

#### Octal Literals

```javascript
// Non-strict mode
console.log(010); // 8 (octal)

// Strict mode
("use strict");
// console.log(010); // SyntaxError: Octal literals are not allowed
console.log(0o10); // 8 (ES6 octal with 'o' prefix)
```

</details>

<details>
<summary><strong>🚀 Best Practices</strong></summary>

- **Always use strict mode** in new projects; it prevents common mistakes
- **Enable globally** by adding `'use strict';` at the top of your main script
- **Use in functions** when you can't control the global scope
- **Test thoroughly** when migrating existing code to strict mode
- **Be aware of differences** in `this` binding and error handling
- **Use modern JavaScript features** (let, const, arrow functions) which are inherently safer

</details>

<details>
<summary><strong>🎯 Tricky Questions & Answers</strong></summary>

#### Variable Declaration Issues

**Q: What will this output?**

```javascript
function test() {
  x = 5;
  console.log(x);
}
test();
```

**A:** `5` (non-strict mode creates global variable)

**Q: What will this output?**

```javascript
function test() {
  "use strict";
  x = 5;
  console.log(x);
}
test();
```

**A:** `ReferenceError: x is not defined` (strict mode requires declaration)

#### this Binding Differences

**Q: What will this output?**

```javascript
function regular() {
  console.log(this === global);
}
regular();
```

**A:** `true` (non-strict mode, this is global object)

**Q: What will this output?**

```javascript
function strict() {
  "use strict";
  console.log(this === undefined);
}
strict();
```

**A:** `true` (strict mode, this is undefined)

#### Parameter Restrictions

**Q: What will this output?**

```javascript
function test(a, a) {
  console.log(a);
}
test(1, 2);
```

**A:** `2` (non-strict mode allows duplicate parameters, last wins)

**Q: What will this output?**

```javascript
function test(a, a) {
  "use strict";
  console.log(a);
}
test(1, 2);
```

**A:** `SyntaxError: Duplicate parameter name` (strict mode prevents duplicates)

#### Property Assignment

**Q: What will this output?**

```javascript
const obj = {
  get x() {
    return this._x;
  },
  set x(val) {
    this._x = val * 2;
  },
};
obj.x = 5;
console.log(obj.x);
```

**A:** `10` (setter multiplies by 2, getter returns stored value)

**Q: What will this output?**

```javascript
"use strict";
const obj = {
  get x() {
    return this._x;
  },
  set x(val) {
    this._x = val * 2;
  },
};
obj.x = 5;
console.log(obj.x);
```

**A:** `10` (setter multiplies by 2, getter returns stored value)

#### delete Operator

**Q: What will this output?**

```javascript
var x = 1;
delete x;
console.log(x);
```

**A:** `1` (non-strict mode allows delete but has no effect)

**Q: What will this output?**

```javascript
"use strict";
var x = 1;
delete x;
console.log(x);
```

**A:** `SyntaxError: Delete of an unqualified identifier` (strict mode prevents delete on variables)

#### Octal Literals

**Q: What will this output?**

```javascript
console.log(010);
```

**A:** `8` (non-strict mode allows octal literals)

**Q: What will this output?**

```javascript
"use strict";
console.log(010);
```

**A:** `SyntaxError: Octal literals are not allowed` (strict mode prevents octal)

#### eval and arguments Restrictions

**Q: What will this output?**

```javascript
var eval = 1;
console.log(eval);
```

**A:** `1` (non-strict mode allows eval as variable name)

**Q: What will this output?**

```javascript
"use strict";
var eval = 1;
console.log(eval);
```

**A:** `SyntaxError: Unexpected eval or arguments in strict mode` (strict mode prevents eval as identifier)

#### with Statement

**Q: What will this output?**

```javascript
const obj = { x: 1 };
with (obj) {
  console.log(x);
}
```

**A:** `1` (non-strict mode allows with statement)

**Q: What will this output?**

```javascript
"use strict";
const obj = { x: 1 };
with (obj) {
  console.log(x);
}
```

**A:** `SyntaxError: Strict mode code may not include a with statement` (strict mode prevents with)

#### Function Context

**Q: What will this output?**

```javascript
let name = "global";

const obj = {
  name: "object",
  method() {
    let name = "local";
    console.log(name);
    console.log(this.name);
  },
};

obj.method();
```

**A:** `"local"`, `"object"` (local variable shadows global, this.name refers to object property)

#### Closures and Scope

**Q: What will this output?**

```javascript
function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());
```

**A:** `1`, `2`, `3` (closure captures count from function scope)

</details>

<details>
<summary><strong>🔍 Deep Dive</strong></summary>

- **Lexical Scoping**: Scope is determined by where code is written, not where it's executed
- **Scope Chain**: JavaScript looks for variables in current scope, then outer scope, then global scope
- **Closures**: Functions can access variables from their outer scope even after the outer function has returned
- **Module Scope**: ES modules create their own scope, separate from global scope
- **Block Scope**: let/const create new scope for each block, preventing variable leakage
- **Hoisting**: var declarations are hoisted to function/global scope, let/const are hoisted but in TDZ
- **Shadowing**: Inner scope variables can hide outer scope variables, but this can make code harder to read
- **Global Pollution**: var in global scope attaches to global object, let/const don't

</details>

---

## 6. Scope

<details>
<summary><strong>📚 Concept Overview</strong></summary>

Scope determines where variables and functions are accessible in JavaScript. There are three main scope types: Global scope (accessible everywhere), Function scope (accessible within a function), and Block scope (accessible within a block like `{}`, `if`, `for`, etc.). Understanding scope is crucial for variable lifetime, shadowing, and closure behavior.

</details>

<details>
<summary><strong>🎯 Key Points</strong></summary>

- **Global Scope**: Variables declared outside any function or block; accessible everywhere
- **Function Scope**: Variables declared inside a function; accessible only within that function
- **Block Scope**: Variables declared inside a block (`{}`, `if`, `for`, etc.); accessible only within that block
- **var**: Function-scoped and global-scoped; hoisted to function/global scope
- **let/const**: Block-scoped, function-scoped, and global-scoped; hoisted but in TDZ
- **Shadowing**: Inner binding with same name hides outer binding
- **Lexical Scope**: Scope is determined by where code is written, not where it's executed

</details>

<details>
<summary><strong>📋 Cheatsheet</strong></summary>

| Declaration | Global Scope | Function Scope | Block Scope | Hoisting | Re-declaration |
| ----------- | ------------ | -------------- | ----------- | -------- | -------------- |
| var         | ✅ Yes       | ✅ Yes         | ❌ No       | ✅ Yes   | ✅ Yes         |
| let         | ✅ Yes       | ✅ Yes         | ✅ Yes      | ⚠️ TDZ   | ❌ No          |
| const       | ✅ Yes       | ✅ Yes         | ✅ Yes      | ⚠️ TDZ   | ❌ No          |

**Scope Rules:**

- **var**: Function-scoped, leaks to function scope, attaches to global object
- **let/const**: Block-scoped, contained within blocks, don't attach to global object
- **Shadowing**: Inner declarations hide outer ones
- **TDZ**: let/const are hoisted but inaccessible before declaration

</details>

<details>
<summary><strong>💡 Code Snippets</strong></summary>

#### Global Scope Examples

```javascript
// Global scope
var globalVar = "I'm global var";
let globalLet = "I'm global let";
const globalConst = "I'm global const";

function testGlobal() {
  console.log(globalVar); // "I'm global var"
  console.log(globalLet); // "I'm global let"
  console.log(globalConst); // "I'm global const"
}

// In browser: globalVar becomes window.globalVar
// In Node.js: globalVar becomes global.globalVar
// let/const do NOT attach to global object
```

#### Function Scope Examples

```javascript
function functionScope() {
  var funcVar = "I'm function var";
  let funcLet = "I'm function let";
  const funcConst = "I'm function const";

  console.log(funcVar); // "I'm function var"
  console.log(funcLet); // "I'm function let"
  console.log(funcConst); // "I'm function const"
}

functionScope();
// console.log(funcVar);   // ReferenceError: funcVar is not defined
// console.log(funcLet);   // ReferenceError: funcLet is not defined
// console.log(funcConst); // ReferenceError: funcConst is not defined
```

#### Block Scope Examples

```javascript
// Block scope with var (function-scoped)
function blockScopeVar() {
  if (true) {
    var blockVar = "I'm block var";
    console.log(blockVar); // "I'm block var"
  }
  console.log(blockVar); // "I'm block var" (var leaks to function scope)
}

// Block scope with let/const
function blockScopeLet() {
  if (true) {
    let blockLet = "I'm block let";
    const blockConst = "I'm block const";
    console.log(blockLet); // "I'm block let"
    console.log(blockConst); // "I'm block const"
  }
  // console.log(blockLet);   // ReferenceError: blockLet is not defined
  // console.log(blockConst); // ReferenceError: blockConst is not defined
}
```

#### Variable Shadowing

```javascript
let shadowVar = "outer";

function shadowing() {
  let shadowVar = "inner";
  console.log(shadowVar); // "inner" (shadows outer)

  if (true) {
    let shadowVar = "block";
    console.log(shadowVar); // "block" (shadows both outer and inner)
  }

  console.log(shadowVar); // "inner" (back to function scope)
}

shadowing();
console.log(shadowVar); // "outer" (global scope)
```

#### Loop Scope Behavior

```javascript
// var in loops (function-scoped)
function varLoop() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
  }
  console.log("After loop:", i); // 3 (var leaks to function scope)
}
varLoop(); // 3, 3, 3, "After loop: 3"

// let in loops (block-scoped)
function letLoop() {
  for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(j), 100);
  }
  // console.log("After loop:", j); // ReferenceError: j is not defined
}
letLoop(); // 0, 1, 2
```

#### Temporal Dead Zone (TDZ)

```javascript
function tdzExample() {
  console.log("Before declaration");

  // console.log(tdzVar); // ReferenceError: Cannot access 'tdzVar' before initialization

  let tdzVar = "I'm in TDZ";
  console.log("After declaration:", tdzVar);
}

// var doesn't have TDZ
function varTdz() {
  console.log(varVar); // undefined (hoisted but not initialized)
  var varVar = "I'm var";
}
```

#### Nested Scopes

```javascript
let outer = "outer";

function nested() {
  let middle = "middle";

  function inner() {
    let innerVar = "inner";
    console.log(outer); // "outer" (global scope)
    console.log(middle); // "middle" (function scope)
    console.log(innerVar); // "inner" (local scope)
  }

  inner();
  console.log(outer);
  // console.log(innerVar); // ReferenceError
}

nested();
```

#### Module Scope

```javascript
// In ES modules (files with import/export)
let moduleVar = "I'm module scoped";
// This is NOT global scope - it's module scope
// Not accessible from other modules unless exported

export { moduleVar };
```

</details>

<details>
<summary><strong>🚀 Best Practices</strong></summary>

- **Use `const` by default**; use `let` when reassignment is needed; avoid `var`
- **Declare variables** in the narrowest scope possible
- **Be aware of shadowing** and its implications for readability
- **Use block scope** to prevent variable leakage and improve encapsulation
- **Understand TDZ** to avoid reference errors with `let`/`const`
- **Prefer ES modules** over global scope for better encapsulation
- **Use meaningful variable names** to avoid accidental shadowing

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

**A:** `undefined`, `ReferenceError: Cannot access 'b' before initialization`, `ReferenceError: Cannot access 'c' before initialization`

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

**A:** `undefined`, `'local'` (var is hoisted, shadowing global)

#### Loops, Closures, Scope, and Hoisting

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

**A:** `3, 3, 3` (var is function-scoped, all closures reference the same variable)

**Q: What will this output?**

```javascript
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
```

**A:** `0, 1, 2` (let is block-scoped, each iteration creates new variable)

#### Temporal Dead Zone

**Q: What will this output?**

```javascript
console.log(x);
let x = 5;
```

**A:** `ReferenceError: Cannot access 'x' before initialization`

**Q: What will this output?**

```javascript
console.log(y);
var y = 5;
```

**A:** `undefined` (var is hoisted and initialized to undefined)

#### Scope Chain and Lexical Scoping

**Q: What will this output?**

```javascript
let outer = "outer";

function test() {
  console.log(outer);
  let outer = "inner";
  console.log(outer);
}
test();
```

**A:** `ReferenceError: Cannot access 'outer' before initialization` (TDZ prevents accessing outer from global)

**Q: What will this output?**

```javascript
let outer = "outer";

function test() {
  console.log(outer);
  var outer = "inner";
  console.log(outer);
}
test();
```

**A:** `undefined`, `"inner"` (var is hoisted, shadowing global outer)

#### Global Object Attachment

**Q: What will this output?**

```javascript
var globalVar = "var";
let globalLet = "let";
console.log(globalVar === window.globalVar);
console.log(globalLet === window.globalLet);
```

**A:** `true`, `false` (var attaches to global object, let doesn't)

#### Function Declaration vs Expression

**Q: What will this output?**

```javascript
function test() {
  console.log(typeof funcDecl);
  console.log(typeof funcExpr);

  function funcDecl() {}
  var funcExpr = function () {};
}
test();
```

**A:** `"function"`, `"undefined"` (function declarations are hoisted, expressions are not)

#### Block Scope with var

**Q: What will this output?**

```javascript
function test() {
  {
    var x = 1;
  }
  console.log(x);
}
test();
```

**A:** `1` (var ignores block scope, leaks to function scope)

#### const in Blocks

**Q: What will this output?**

```javascript
const x = 1;
{
  const x = 2;
  console.log(x);
}
console.log(x);
```

**A:** `2`, `1` (const respects block scope, shadowing works)

#### Module Scope

**Q: What will this output?**

```javascript
// module1.js
let moduleVar = "module1";
export { moduleVar };

// module2.js
import { moduleVar } from "./module1.js";
console.log(moduleVar);
```

**A:** `"module1"` (imported variables are in module scope)

#### Nested Function Scope

**Q: What will this output?**

```javascript
let global = "global";

function outer() {
  let outerVar = "outer";

  function inner() {
    let innerVar = "inner";
    console.log(global, outerVar, innerVar);
  }

  inner();
  console.log(global, outerVar);
  // console.log(innerVar); // ReferenceError
}
outer();
```

**A:** `"global outer inner"`, `"global outer"` (lexical scoping allows access to outer variables)

#### Hoisting in Different Scopes

**Q: What will this output?**

```javascript
console.log(x);
var x = 1;

console.log(y);
let y = 2;
```

**A:** `undefined`, `ReferenceError: Cannot access 'y' before initialization`

#### Re-declaration Rules

**Q: What will this output?**

```javascript
var a = 1;
var a = 2;
console.log(a);

let b = 1;
let b = 2;
console.log(b);
```

**A:** `2`, `SyntaxError: Identifier 'b' has already been declared`

#### Block Scope with if/else

**Q: What will this output?**

```javascript
if (true) {
  let x = "if";
} else {
  let x = "else";
}
console.log(x);
```

**A:** `ReferenceError: x is not defined` (let is block-scoped)

#### Function Scope with var

**Q: What will this output?**

```javascript
if (true) {
  var x = "if";
} else {
  var x = "else";
}
console.log(x);
```

**A:** `"if"` (var is function-scoped, not block-scoped)

#### Scope and this

**Q: What will this output?**

```javascript
let name = "global";

const obj = {
  name: "object",
  method() {
    let name = "local";
    console.log(name);
    console.log(this.name);
  },
};

obj.method();
```

**A:** `"local"`, `"object"` (local variable shadows global, this.name refers to object property)

#### Closures and Scope

**Q: What will this output?**

```javascript
function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());
```

**A:** `1`, `2`, `3` (closure captures count from function scope)

</details>

<details>
<summary><strong>🔍 Deep Dive</strong></summary>

- **Lexical Scoping**: Scope is determined by where code is written, not where it's executed
- **Scope Chain**: JavaScript looks for variables in current scope, then outer scope, then global scope
- **Closures**: Functions can access variables from their outer scope even after the outer function has returned
- **Module Scope**: ES modules create their own scope, separate from global scope
- **Block Scope**: let/const create new scope for each block, preventing variable leakage
- **Hoisting**: var declarations are hoisted to function/global scope, let/const are hoisted but in TDZ
- **Shadowing**: Inner scope variables can hide outer scope variables, but this can make code harder to read
- **Global Pollution**: var in global scope attaches to global object, let/const don't

</details>

---

## 7. Array Methods

<details>
<summary><strong>📚 Concept Overview</strong></summary>

JavaScript arrays provide a rich set of built-in methods for manipulation, iteration, and transformation. These methods can be categorized as mutating (change the original array), non-mutating (return new arrays/values), or iteration methods. Understanding these methods is crucial for efficient array manipulation and functional programming patterns.

</details>

<details>
<summary><strong>🎯 Key Points</strong></summary>

- **Mutating Methods**: `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `reverse()`, `sort()`, `fill()`, `copyWithin()`
- **Non-Mutating Methods**: `slice()`, `concat()`, `join()`, `indexOf()`, `includes()`, `find()`, `findIndex()`, `filter()`, `map()`, `reduce()`, `every()`, `some()`
- **Iteration Methods**: `forEach()`, `for...of`, `for...in` (not recommended for arrays)
- **Return Values**: Some methods return the modified array, others return new arrays or values
- **Callback Functions**: Many methods accept callback functions for custom logic
- **Chaining**: Non-mutating methods can be chained for complex transformations

</details>

<details>
<summary><strong>📋 Cheatsheet</strong></summary>

| Method              | Mutates? | Returns        | Description               |
| ------------------- | -------- | -------------- | ------------------------- |
| **Adding/Removing** |
| `push()`            | ✅ Yes   | new length     | Add to end                |
| `pop()`             | ✅ Yes   | removed item   | Remove from end           |
| `unshift()`         | ✅ Yes   | new length     | Add to beginning          |
| `shift()`           | ✅ Yes   | removed item   | Remove from beginning     |
| `splice()`          | ✅ Yes   | removed items  | Add/remove at index       |
| **Transformation**  |
| `slice()`           | ❌ No    | new array      | Extract portion           |
| `concat()`          | ❌ No    | new array      | Combine arrays            |
| `join()`            | ❌ No    | string         | Join to string            |
| `reverse()`         | ✅ Yes   | same array     | Reverse order             |
| `sort()`            | ✅ Yes   | same array     | Sort elements             |
| **Searching**       |
| `indexOf()`         | ❌ No    | index/-1       | Find item                 |
| `lastIndexOf()`     | ❌ No    | index/-1       | Find last occurrence      |
| `includes()`        | ❌ No    | boolean        | Check existence           |
| `find()`            | ❌ No    | item/undefined | Find with condition       |
| `findIndex()`       | ❌ No    | index/-1       | Find index with condition |
| **Iteration**       |
| `forEach()`         | ❌ No    | undefined      | Execute for each          |
| `map()`             | ❌ No    | new array      | Transform each            |
| `filter()`          | ❌ No    | new array      | Filter items              |
| `reduce()`          | ❌ No    | single value   | Accumulate values         |
| `reduceRight()`     | ❌ No    | single value   | Accumulate right-to-left  |
| **Testing**         |
| `every()`           | ❌ No    | boolean        | All pass test             |
| `some()`            | ❌ No    | boolean        | Any pass test             |
| **Utility**         |
| `fill()`            | ✅ Yes   | same array     | Fill with value           |
| `copyWithin()`      | ✅ Yes   | same array     | Copy within array         |
| `flat()`            | ❌ No    | new array      | Flatten nested            |
| `flatMap()`         | ❌ No    | new array      | Map then flatten          |

</details>

<details>
<summary><strong>💡 Code Snippets</strong></summary>

#### Adding and Removing Elements

```javascript
const arr = [1, 2, 3];

// Adding elements
arr.push(4); // [1, 2, 3, 4] - returns 4 (new length)
arr.unshift(0); // [0, 1, 2, 3, 4] - returns 5 (new length)

// Removing elements
arr.pop(); // [0, 1, 2, 3] - returns 4 (removed item)
arr.shift(); // [1, 2, 3] - returns 0 (removed item)

// splice(start, deleteCount, ...items)
arr.splice(1, 1, "a", "b"); // [1, 'a', 'b', 3] - returns [2] (removed items)
```

#### Non-Mutating Operations

```javascript
const original = [1, 2, 3, 4, 5];

// slice(start, end) - extract portion
const portion = original.slice(1, 3); // [2, 3] - original unchanged

// concat() - combine arrays
const combined = original.concat([6, 7], [8, 9]); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// join() - convert to string
const str = original.join("-"); // "1-2-3-4-5"
```

#### Searching Methods

```javascript
const arr = ["apple", "banana", "cherry", "banana"];

// indexOf() - find first occurrence
arr.indexOf("banana"); // 1
arr.indexOf("orange"); // -1 (not found)

// lastIndexOf() - find last occurrence
arr.lastIndexOf("banana"); // 3

// includes() - check existence
arr.includes("cherry"); // true
arr.includes("orange"); // false

// find() - find with condition
const found = arr.find((item) => item.length > 5); // 'banana'

// findIndex() - find index with condition
const index = arr.findIndex((item) => item.startsWith("c")); // 2
```

#### Iteration Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach() - execute for each
numbers.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});

// map() - transform each
const doubled = numbers.map((num) => num * 2); // [2, 4, 6, 8, 10]

// filter() - filter items
const evens = numbers.filter((num) => num % 2 === 0); // [2, 4]

// reduce() - accumulate values
const sum = numbers.reduce((acc, num) => acc + num, 0); // 15
const product = numbers.reduce((acc, num) => acc * num, 1); // 120
```

#### Testing Methods

```javascript
const numbers = [2, 4, 6, 8, 10];

// every() - all pass test
const allEven = numbers.every((num) => num % 2 === 0); // true

// some() - any pass test
const hasLarge = numbers.some((num) => num > 8); // true
```

#### Sorting and Reversing

```javascript
const fruits = ["banana", "apple", "cherry"];

// sort() - alphabetical
fruits.sort(); // ['apple', 'banana', 'cherry']

// sort() with custom comparator
const numbers = [10, 5, 8, 1, 9];
numbers.sort((a, b) => a - b); // [1, 5, 8, 9, 10]

// reverse() - reverse order
fruits.reverse(); // ['cherry', 'banana', 'apple']
```

#### Modern Array Methods

```javascript
// flat() - flatten nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
const flattened = nested.flat(); // [1, 2, 3, 4, [5, 6]]
const deeplyFlattened = nested.flat(2); // [1, 2, 3, 4, 5, 6]

// flatMap() - map then flatten
const sentences = ["Hello world", "Good morning"];
const words = sentences.flatMap((sentence) => sentence.split(" ")); // ['Hello', 'world', 'Good', 'morning']

// fill() - fill with value
const arr = new Array(3).fill(0); // [0, 0, 0]
```

#### Method Chaining

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = numbers
  .filter((num) => num % 2 === 0) // [2, 4, 6, 8, 10]
  .map((num) => num * 2) // [4, 8, 12, 16, 20]
  .reduce((sum, num) => sum + num, 0); // 60
```

</details>

<details>
<summary><strong>🚀 Best Practices</strong></summary>

- **Prefer non-mutating methods** when possible to avoid side effects
- **Use method chaining** for complex transformations
- **Be aware of return values** - some methods return the array, others return new values
- **Use appropriate methods** - `forEach` for side effects, `map` for transformations, `filter` for filtering
- **Avoid `for...in`** for arrays - use `for...of` or array methods instead
- **Use `reduce()`** for complex accumulations and transformations
- **Consider performance** - `forEach` is faster than `for...of` for simple iterations
- **Use `flatMap()`** when you need to map and flatten in one step

</details>

<details>
<summary><strong>🎯 Tricky Questions & Answers</strong></summary>

#### Basic Array Operations

**Q: What will this output?**

```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

**A:** `[1, 2, 3, 4]` (push adds to end and mutates array)

**Q: What will this output?**

```javascript
const arr = [1, 2, 3];
const result = arr.push(4);
console.log(result);
```

**A:** `4` (push returns the new length of the array)

#### Mutating vs Non-Mutating

**Q: What will this output?**

```javascript
const arr = [1, 2, 3];
const sliced = arr.slice(1);
console.log(arr);
console.log(sliced);
```

**A:** `[1, 2, 3]`, `[2, 3]` (slice doesn't mutate original)

**Q: What will this output?**

```javascript
const arr = [1, 2, 3];
const reversed = arr.reverse();
console.log(arr);
console.log(reversed);
```

**A:** `[3, 2, 1]`, `[3, 2, 1]` (reverse mutates and returns same array)

#### Splice Behavior

**Q: What will this output?**

```javascript
const arr = [1, 2, 3, 4, 5];
const removed = arr.splice(2, 2, "a", "b");
console.log(arr);
console.log(removed);
```

**A:** `[1, 2, 'a', 'b', 5]`, `[3, 4]` (splice removes and inserts, returns removed items)

**Q: What will this output?**

```javascript
const arr = [1, 2, 3];
arr.splice(1, 0, "a");
console.log(arr);
```

**A:** `[1, 'a', 2, 3]` (splice with 0 deleteCount only inserts)

#### Search Methods

**Q: What will this output?**

```javascript
const arr = [1, 2, 3, 2, 4];
console.log(arr.indexOf(2));
console.log(arr.lastIndexOf(2));
```

**A:** `1`, `3` (indexOf finds first, lastIndexOf finds last)

**Q: What will this output?**

```javascript
const arr = [1, 2, 3, 4, 5];
const found = arr.find((num) => num > 3);
const index = arr.findIndex((num) => num > 3);
console.log(found);
console.log(index);
```

**A:** `4`, `3` (find returns item, findIndex returns index)

#### Iteration Methods

**Q: What will this output?**

```javascript
const arr = [1, 2, 3];
const result = arr.forEach((num) => num * 2);
console.log(result);
```

**A:** `undefined` (forEach returns undefined)

**Q: What will this output?**

```javascript
const arr = [1, 2, 3];
const doubled = arr.map((num) => num * 2);
console.log(doubled);
```

**A:** `[2, 4, 6]` (map returns new array with transformed values)

#### Filter and Reduce

**Q: What will this output?**

```javascript
const arr = [1, 2, 3, 4, 5, 6];
const evens = arr.filter((num) => num % 2 === 0);
console.log(evens);
```

**A:** `[2, 4, 6]` (filter returns new array with items that pass test)

**Q: What will this output?**

```javascript
const arr = [1, 2, 3, 4];
const sum = arr.reduce((acc, num) => acc + num, 0);
console.log(sum);
```

**A:** `10` (reduce accumulates values, starting with initial value 0)

**Q: What will this output?**

```javascript
const arr = [1, 2, 3, 4];
const sum = arr.reduce((acc, num) => acc + num);
console.log(sum);
```

**A:** `10` (reduce without initial value uses first element as initial)

#### Testing Methods

**Q: What will this output?**

```javascript
const arr = [2, 4, 6, 8];
const allEven = arr.every((num) => num % 2 === 0);
const someOdd = arr.some((num) => num % 2 === 1);
console.log(allEven);
console.log(someOdd);
```

**A:** `true`, `false` (every checks all, some checks any)

#### Sort Behavior

**Q: What will this output?**

```javascript
const arr = [10, 5, 8, 1, 9];
arr.sort();
console.log(arr);
```

**A:** `[1, 10, 5, 8, 9]` (sort converts to strings by default)

**Q: What will this output?**

```javascript
const arr = [10, 5, 8, 1, 9];
arr.sort((a, b) => a - b);
console.log(arr);
```

**A:** `[1, 5, 8, 9, 10]` (numeric sort with comparator)

#### Method Chaining

**Q: What will this output?**

```javascript
const arr = [1, 2, 3, 4, 5];
const result = arr
  .filter((num) => num > 2)
  .map((num) => num * 2)
  .reduce((sum, num) => sum + num, 0);
console.log(result);
```

**A:** `18` (filter [3,4,5] → map [6,8,10] → reduce 6+8+10=18)

#### Array-like Objects

**Q: What will this output?**

```javascript
const str = "hello";
const chars = Array.from(str);
console.log(chars);
```

**A:** `['h', 'e', 'l', 'l', 'o']` (Array.from converts array-like to array)

#### Sparse Arrays

**Q: What will this output?**

```javascript
const arr = [1, , 3];
console.log(arr.length);
console.log(arr[1]);
```

**A:** `3`, `undefined` (sparse arrays have holes)

**Q: What will this output?**

```javascript
const arr = [1, , 3];
const filtered = arr.filter((x) => true);
console.log(filtered);
```

**A:** `[1, 3]` (filter skips holes)

#### Flat and FlatMap

**Q: What will this output?**

```javascript
const arr = [1, [2, 3], [4, [5, 6]]];
const flattened = arr.flat();
console.log(flattened);
```

**A:** `[1, 2, 3, 4, [5, 6]]` (flat flattens one level by default)

**Q: What will this output?**

```javascript
const arr = [1, 2, 3];
const result = arr.flatMap((x) => [x, x * 2]);
console.log(result);
```

**A:** `[1, 2, 2, 4, 3, 6]` (flatMap maps then flattens)

#### Return Values

**Q: What will this output?**

```javascript
const arr = [1, 2, 3];
const popResult = arr.pop();
const pushResult = arr.push(4);
console.log(popResult);
console.log(pushResult);
```

**A:** `3`, `3` (pop returns removed item, push returns new length)

#### Empty Arrays

**Q: What will this output?**

```javascript
const arr = [];
const result = arr.reduce((acc, num) => acc + num);
console.log(result);
```

**A:** `TypeError: Reduce of empty array with no initial value`

**Q: What will this output?**

```javascript
const arr = [];
const result = arr.reduce((acc, num) => acc + num, 0);
console.log(result);
```

**A:** `0` (with initial value, reduce works on empty array)

#### Index Parameters

**Q: What will this output?**

```javascript
const arr = ["a", "b", "c"];
arr.forEach((item, index, array) => {
  console.log(item, index, array.length);
});
```

**A:** `a 0 3`, `b 1 3`, `c 2 3` (forEach provides item, index, and array)

#### Mutable vs Immutable

**Q: What will this output?**

```javascript
const arr = [{ name: "John" }, { name: "Jane" }];
const names = arr.map((person) => person.name);
arr[0].name = "Bob";
console.log(names);
```

**A:** `['John', 'Jane']` (names array is separate, but objects are referenced)

#### Complex Reduce

**Q: What will this output?**

```javascript
const arr = [1, 2, 3, 4, 5];
const result = arr.reduce(
  (acc, num) => {
    acc.evens.push(num % 2 === 0 ? num : 0);
    acc.odds.push(num % 2 === 1 ? num : 0);
    return acc;
  },
  { evens: [], odds: [] }
);
console.log(result);
```

**A:** `{evens: [0, 2, 0, 4, 0], odds: [1, 0, 3, 0, 5]}` (complex reduce with object accumulator)

</details>

<details>
<summary><strong>🔍 Deep Dive</strong></summary>

- **Performance**: `forEach` is generally faster than `for...of` for simple iterations
- **Memory**: Non-mutating methods create new arrays, which can impact memory usage
- **Sparse Arrays**: Methods handle holes differently - `filter` skips them, `map` preserves them
- **Array-like Objects**: `Array.from()` and spread operator can convert array-like objects to arrays
- **Method Chaining**: Chain non-mutating methods for complex transformations
- **Return Values**: Always check what methods return - some return arrays, others return values
- **Callback Functions**: Many methods accept optional parameters like `thisArg` for callback context
- **Polyfills**: Some methods like `flat()` and `flatMap()` may need polyfills in older browsers

</details>

---
