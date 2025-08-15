// 2. Object Oriented Programming
// it's a simple program to calculate the age and salary of a person
// converted playground_base.js to object oriented programming

class Player {
  #name;
  #birthDate;
  #monthlySalary;
  #noOfMonths;

  constructor(name, birthDate, monthlySalary, noOfMonths) {
    this.#name = name;
    this.#birthDate = birthDate;
    this.#monthlySalary = monthlySalary;
    this.#noOfMonths = noOfMonths;
  }

  calculate_age() {
    const diff_ms = Date.now() - new Date(this.#birthDate).getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  getSalary() {
    return (this.#monthlySalary * this.#noOfMonths).toLocaleString();
  }
}

const mahadi = new Player("Mahadi", "1990-01-01", 500000, 12);
console.log(`${mahadi.name} age is ${mahadi.calculate_age()} years`);
console.log(`${mahadi.name} salary is ${mahadi.getSalary()} Taka`);
