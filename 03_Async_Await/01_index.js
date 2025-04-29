/* Async function will always Return a PROMISE */
/* Await can only be used inside an async function. */
async function getData (){
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/10');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


console.log(getData())
// The above code fetches data from a placeholder API and logs it to the console.