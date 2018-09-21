class Person {
  static country = 'India';
  static sayHello = () => {
    Logger.log('Hello World!!');
  };
  name = 'Amit Agarwal';
  greet = () => `Hello ${this.name}!!`;
  getFirstName = () => {
    const [firstName] = this.name.split(' ');
    return firstName;
  };
}

const person = new Person();
Logger.log(person.getFirstName());
Logger.log(Person.country);

Person.sayHello();
