// ===== HOISTING COMPLETE CHEATSHEET =====

console.log("🎯 JAVASCRIPT HOISTING COMPLETE GUIDE\n");

console.log("=== 1. BASIC HOISTING RULES ===");
console.log("✅ Function declarations: Fully hoisted");
console.log("⚠️  var variables: Hoisted but initialized to undefined");
console.log("❌ let/const variables: Hoisted but in Temporal Dead Zone");
console.log("❌ Function expressions: Not hoisted");
console.log("❌ Arrow functions: Not hoisted");

console.log("\n=== 2. HOISTING PRECEDENCE ===");
console.log("1. Function declarations (highest priority)");
console.log("2. Variable declarations (var, let, const)");
console.log("3. Function expressions and assignments");

console.log("\n=== 3. TEMPORAL DEAD ZONE (TDZ) ===");
console.log("• Period between entering scope and variable declaration");
console.log("• Applies to let and const only");
console.log("• Results in ReferenceError if accessed");
console.log("• var variables are initialized to undefined");

console.log("\n=== 4. SCOPE AND HOISTING ===");
console.log("• var: Function-scoped, hoists to function top");
console.log("• let/const: Block-scoped, hoists to block top");
console.log("• Function declarations: Hoist to scope top");

console.log("\n=== 5. PRACTICAL EXAMPLES ===");

// Example 1: Basic hoisting
console.log("\nExample 1 - Basic hoisting:");
console.log("var x =", typeof x); // undefined
var x = 5;

// Example 2: Function hoisting
console.log("\nExample 2 - Function hoisting:");
hoistedFunc(); // Works!
function hoistedFunc() {
  console.log("I'm hoisted!");
}

// Example 3: TDZ
console.log("\nExample 3 - Temporal Dead Zone:");
// console.log(y); // ReferenceError
let y = 10;

console.log("\n=== 6. COMMON PITFALLS ===");
console.log("1. Variable shadowing with var");
console.log("2. Accidental global variables with var");
console.log("3. Function redeclaration");
console.log("4. Accessing let/const before declaration");

console.log("\n=== 7. BEST PRACTICES ===");
console.log("✅ Use let/const instead of var");
console.log("✅ Declare variables at scope top");
console.log("✅ Use function declarations for hoisting benefits");
console.log("✅ Be aware of TDZ with let/const");
console.log("✅ Use block scope to prevent leakage");
console.log("✅ Avoid variable shadowing");

console.log("\n=== 8. INTERVIEW TIPS ===");
console.log("• Always mention TDZ when discussing let/const");
console.log("• Explain why var is problematic");
console.log("• Know the hoisting precedence order");
console.log("• Understand block vs function scope");
console.log("• Be able to trace code execution");

console.log("\n=== 9. CODE EXAMPLES FOR INTERVIEWS ===");

console.log("\nQ: What will this output?");
console.log("console.log(x);");
console.log("var x = 5;");
console.log("A: undefined (var is hoisted but not initialized)");

console.log("\nQ: What will this output?");
console.log("console.log(y);");
console.log("let y = 5;");
console.log("A: ReferenceError (TDZ)");

console.log("\nQ: What will this output?");
console.log("myFunc();");
console.log("function myFunc() { console.log('Hello'); }");
console.log("A: 'Hello' (function declarations are fully hoisted)");

console.log("\n=== 10. COMPLETE HOISTING FLOW ===");
console.log("1. JavaScript engine scans the code");
console.log("2. Hoists function declarations to top");
console.log("3. Hoists variable declarations to top");
console.log("4. Initializes var to undefined");
console.log("5. Leaves let/const in TDZ");
console.log("6. Executes code line by line");

console.log("\n🎉 CONGRATULATIONS! You now understand ALL hoisting concepts!");
console.log("You're ready for any hoisting-related interview questions!");
