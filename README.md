# JavaScript Preparation Guide

A comprehensive collection of JavaScript concepts, cheatsheets, and code snippets for JS preparation.

## Table of Contents

1. [Hoisting](#hoisting)
2. [Variables](#variables)
3. [Objects](#objects)

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
<summary><strong>➕ More Tricky Variable Questions</strong></summary>

**Q: What’s wrong here?**

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

**A:** `'undefined'` (`var a` is hoisted, but the value assignment is not)

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
