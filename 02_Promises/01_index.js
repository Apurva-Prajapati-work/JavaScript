// Callback-based function
function fetchDataCallback(callback) {
  setTimeout(() => {
    callback("Data fetched using Callback");
  }, 1000);
}

// Promise-based function
function fetchDataPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched using Promise");
    }, 1000);
  });
}

// Using the callback-based function
fetchDataCallback((data) => {
  console.log("Callback:", data);
});

// Using the Promise-based function
fetchDataPromise().then((data) => {
  console.log("Promise:", data);
});


// Creating and using a new Promise
const myPromise = new Promise((resolve, reject) => {
  const success = true; // Simulate success or failure
  setTimeout(() => {
    if (success) {
      // Simulating the success with resolve msg using resolve method
      resolve("Promise resolved successfully");
    } else {
      // Simulating the error with rejection msg using reject method
      reject("Promise rejected");
    }
  }, 1000);
});

myPromise
  .then((message) => {
    console.log("MyPromise:", message);
  })
  .catch((error) => {
    console.error("MyPromise Error:", error);
  });