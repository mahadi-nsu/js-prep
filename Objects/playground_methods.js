// ╔══════════════════════════════════════╗
// ║ 📦  Object.assign()                  ║
// ╚══════════════════════════════════════╝

// Create Target Object
const person1 = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};

// Create Source Object
const person2 = { firstName: "Anne", lastName: "Smith" };

// Assign Source to Target
Object.assign(person1, person2);

console.log("person1", person1); //person1 { firstName: 'Anne', lastName: 'Smith', age: 50, eyeColor: 'blue' }
console.log("person2", person2); //person2 { firstName: 'Anne', lastName: 'Smith' }

// ╔══════════════════════════════════════╗
// ║ 📦  Object.entries()                 ║
// ╚══════════════════════════════════════╝

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};

let text = Object.entries(person);

console.log("text", text);
// [
//   [ 'firstName', 'John' ],
//   [ 'lastName', 'Doe' ],
//   [ 'age', 50 ],
//   [ 'eyeColor', 'blue' ]
// ]

// ╔══════════════════════════════════════╗
// ║ 📦  Object.fromEntries()             ║
// ╚══════════════════════════════════════╝

const fruits = [
  ["apples", 300],
  ["pears", 900],
  ["bananas", 500],
];

const myObj = Object.fromEntries(fruits);
// { apples: 300, pears: 900, bananas: 500 }

// ╔══════════════════════════════════════╗
// ║ 📦  Object.values()                  ║
// ╚══════════════════════════════════════╝

const person_new = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};

let text_new = Object.values(person_new);
console.log("text_new", text_new);

// [ 'John', 'Doe', 50, 'blue' ]

// ╔══════════════════════════════════════╗
// ║ 📦  Object.keys()                    ║
// ╚══════════════════════════════════════╝

const person_new_2 = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};

let text_new_2 = Object.keys(person_new_2);
console.log("text_new_2", text_new_2); //[ 'firstName', 'lastName', 'age', 'eyeColor' ]

// ╔══════════════════════════════════════╗
// ║ 📦  Object.groupBy()                 ║
// ╚══════════════════════════════════════╝
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
  { name: "David", age: 30 },
  { name: "Eve", age: 35 },
];

// using reduce
const groupByAge = people.reduce((acc, person) => {
  console.log("acc", acc);
  console.log("person", person);
  if (!acc[person.age]) {
    acc[person.age] = [];
  }
  acc[person.age].push(person);
  return acc;
}, {});

console.log("groupByAge", groupByAge);

// using groupBy

const grouped = Object.groupBy(people, (person) => {
  return person.age;
});
