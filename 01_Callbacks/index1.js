console.log('index1.js');

console.log('started at ' + new Date().toISOString());
setTimeout(function(){
  console.log('index1.js loaded');
  console.log('ended at ' + new Date().toISOString());
}, 5000);



console.log('index1.js loaded again');
