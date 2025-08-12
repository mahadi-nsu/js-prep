// ╔══════════════════════════════════════╗
// ║ 📦  Basic Object definitions         ║
// ╚══════════════════════════════════════╝
// 1.
const person = {
  name: "John",
  age: 30,
  city: "New York",
};

// console.log(person);
// console.log(...Object.values(person));

const person_2 = new Object({
  name: "john_2",
  age: 20,
  city: "New York_2",
});

// 2. Entried and fromEntries
const fruits = [
  ["apples", 300],
  ["pears", 900],
  ["bananas", 500],
];

const fruitsData = Object.fromEntries(fruits);
// console.log(fruitsData);

const fruitsDataRevert = Object.entries(fruitsData);
// console.log(fruitsDataRevert);

// ╔══════════════════════════════════════╗
// ║ 📦  Object Constructors              ║
// ╚══════════════════════════════════════╝

const consPerson = new Object();
person.name = "Mahadi";

// Class Syntax
class Employee {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }
}

const employee1 = new Employee("Nazmul", "Software Engineer");
console.log(employee1);

// ╔══════════════════════════════════════╗
// ║ 📦  Object Destructuring             ║
// ╚══════════════════════════════════════╝

const con_data = {
  firstName: "Nazmul",
  lastName: "Mahadi",
  age: 25,
  city: "Dhaka",
};

const { firstName, lastName, age, city, country = "US" } = con_data;

console.log(firstName, lastName, age, city);

const { lastName: lName } = con_data;

console.log("country", country, lName);

// ╔══════════════════════════════════════╗
// ║ 📦  Object Prototype                 ║
// ╚══════════════════════════════════════╝

function ProtoPerson(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}

ProtoPerson.prototype.country = "Bangladesh";

console.log("ProtoPerson =>", ProtoPerson.prototype);

ProtoPerson.prototype.name = function () {
  return this.firstName + " " + this.lastName;
};

const proto_obj = {
  name: "proto_obj",
};

// proto_obj.prototype.age = 20; //Not going to work as we are not using new keyword

// console.log("proto_obj", proto_obj);

// console.log("prototype", Object.getPrototypeOf(proto_obj));
