// Example 1: Creating a Promise using the Promise constructor
const promise1 = new Promise((resolve, reject) => {
  const success = true; // Simulate a condition
  if (success) {
    resolve("Promise resolved successfully!");
  } else {
    reject("Promise rejected!");
  }
});
promise1.then(console.log).catch(console.error);

// Example 2: Wrapping a setTimeout in a Promise
const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Resolved after 2 seconds");
  }, 2000);
});
promise2.then(console.log);

// Example 3: Using Promise.resolve
const promise3 = Promise.resolve("This is a resolved promise");
promise3.then(console.log);

// Example 4: Using Promise.reject
const promise4 = Promise.reject("This is a rejected promise");
promise4.catch(console.error);

// Example 5: Creating a custom function that returns a Promise
function asyncOperation(success) {
  return new Promise((resolve, reject) => {
    if (success) {
      resolve("Operation succeeded!");
    } else {
      reject("Operation failed!");
    }
  });
}
asyncOperation(true).then(console.log).catch(console.error);
asyncOperation(false).then(console.log).catch(console.error);



// Creating Prmise and using it:

const cart = ['apple', 'banana', 'orange'];

const validateCart = function(cart){
  return cart && cart.length > 0; 
}

const createOrder = function(cart){
  const pr = new Promise((resolve, reject) => {
    if(!validateCart(cart)){
      const err = new Error('Invalid cart!');
      err.code = 400;
      reject(err);
    }
    const orderId = '12345';
    if(orderId){
      resolve(orderId);
    }
  })
  return pr;
}

const proceedToPayment = function(orderId){
  return new Promise((resolve, reject) => {
    if(!orderId){
      const err = new Error('Invalid order ID!');
      err.code = 400;
      reject(err);
    }
      resolve({
        orderId: orderId,
        paymentMethod: 'Credit Card',
        amount: 100.00
      });
  });
}

const promise = createOrder(cart);

promise.then((orderId)=>{
  console.log('Order created successfully! Order ID:', orderId);
  return orderId;
})
.then((orderId)=>{
  console.log('Proceeding to payment...');
  return proceedToPayment(orderId);
})
.then((paymentInfo)=>{
  console.log('Payment information:', paymentInfo);
})
.catch((err)=>{
  console.error('Error creating order:', err.message, 'Code:', err.code);
  // Handle the error here (e.g., show an error message to the user)
})