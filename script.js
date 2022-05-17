// let date = new Date();
let date = new Date('2022-03-05');
console.log(date);
console.log(date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }));