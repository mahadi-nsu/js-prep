// ╔══════════════════════════════════════╗
// ║ 📦  Basic This keyword               ║
// ╚══════════════════════════════════════╝

// implicit binding
// explicit binding
// new binding
// window binding

// ╔══════════════════════════════════════╗
// ║ 📦  implicit binding                 ║
// ╚══════════════════════════════════════╝

// 1. Ex-1
const person = {
  name: "John",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

person.greet(); // keyword beside greed is "this" , in this case person is "this"

// 2. Ex-2

const printPlayerNameFunction = function (obj) {
  obj.printPlayerName = function () {
    console.log(this.name);
  };
};

const sakib = {
  name: "Sakib",
};

const tamim = {
  name: "Tamim",
};

printPlayerNameFunction(sakib);
printPlayerNameFunction(tamim);

sakib.printPlayerName(); // Sakib
tamim.printPlayerName(); // Tamim

// 3. Ex-3

const Person_3 = function (name, age) {
  return {
    name: name,
    age: age,
    printName: function () {
      console.log(this.name);
    },
    father: {
      name: "John",
      printName: function () {
        console.log(this.name);
      },
    },
  };
};

const mahadi = Person_3("Mahadi", 20);

mahadi.printName();
mahadi.father.printName();

// ╔══════════════════════════════════════╗
// ║ 📦  explicit binding                 ║
// ╚══════════════════════════════════════╝

// 1. Ex-1

const printName = function (v1, v2) {
  console.log(`Mr. ${this.name} is ${v1} and ${v2}`);
};

const Nazmul = {
  name: "Nazmul",
  age: 25,
};

const attribute_1 = "Handome";
const attribute_2 = "Smart";

const attributes = [attribute_1, attribute_2];

// call method
printName.call(Nazmul, attribute_1, attribute_2);

// apply method
printName.apply(Nazmul, attributes);

// bind method
const printNameBind = printName.bind(Nazmul);
printNameBind(attribute_1, attribute_2);

// ╔══════════════════════════════════════╗
// ║ 📦  New binding                      ║
// ╚══════════════════════════════════════╝

function Employee(name, profession) {
  this.name = name;
  this.profession = profession;
}

// When a function is called with the new keyword,
// JavaScript creates a new empty object and
// sets this inside the constructor to that new object,
//  allowing properties and methods to be attached to it.
// This is called the new binding.
const employee1 = new Employee("Nazmul", "Software Engineer");
console.log(employee1);

// ╔══════════════════════════════════════╗
// ║ 📦  Window binding                   ║
// ╚══════════════════════════════════════╝

const windowPrintName = function () {
  console.log(this.name); //undefined as its pointing to window object
};

const windowSakib = {
  name: "Sakib",
};

windowPrintName();
