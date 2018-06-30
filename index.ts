const name = "dal",
  age = 30,
  gender = "male";

const sayHi = (name, age, gender?) => {
  console.log(`Hello ${name} you are ${age}, and ${gender}`);
};

sayHi(name, age);

export {};
