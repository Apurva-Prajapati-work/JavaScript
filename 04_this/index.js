console.log(this);


const obj = {
  name: 'Apurva',
  age: 21,
  favSport: 'Cricket',
  getInfo: function(){
    console.log('This', this);
    console.log(this.name + ' is ' + this.age + ' years old and loves ' + this.favSport);
  }
}

obj.getInfo(); // Apurva is 21 years old and loves Cricket