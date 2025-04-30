console.log(this);


const obj = {
  name: 'Apurva',
  age: 21,
  favSport: 'Cricket',
  getInfo: function(hello, vishalSurname) {
    console.log('This', this);
    console.log(this.name + ' is ' + this.age + ' years old and loves ' + this.favSport+ hello+vishalSurname);
  }
}

obj.getInfo(); // Apurva is 21 years old and loves Cricket

const obj2 = {
  name: 'John',
  age: 30,
  favSport: 'Football'
}

/*
Why does this work?
1. The function getInfo is called with obj2 as the context, so this refers to obj2 inside the function.

What is call?
2. The call method is used to call a function with a given `this` value and arguments provided individually.
*/
obj.getInfo.call(obj2, "How are you", 'Umavane'); // John is 30 years old and loves Football

// Using apply
obj.getInfo.apply(obj2, ["How are you", 'Umavane']); // John is 30 years old and loves Football

// Using bind
const boundGetInfo = obj.getInfo.bind(obj2, "How are you", 'Umavane');
boundGetInfo(); // John is 30 years old and loves Football