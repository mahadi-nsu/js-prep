// 1. Procedural Programming
// it's a simple program to calculate the age and salary of a person

let birthDay = "1990-01-01";
let monthlySalary = 500000;
let noOfMonths = 12;

function calculate_age(dob) {
  const diff_ms = Date.now() - new Date(dob).getTime();
  const age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function getSalary(monthlySalary, noOfMonths) {
  return (monthlySalary * noOfMonths).toLocaleString();
}

console.log(`Your age is ${calculate_age(birthDay)} years`);
console.log(`Your salary is ${getSalary(monthlySalary, noOfMonths)} Taka`);
