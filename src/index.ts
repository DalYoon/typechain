interface Human {
  name: string;
  age: number;
  gender: string;
}

const dal = {
  name: "dal",
  age: 30,
  gender: "gay"
};

const sayHi = (person: Human) => {
  console.log(`Hello ${person.name} you are ${person.age}, and ${person.gender}`);
};

sayHi(dal);

export {};
