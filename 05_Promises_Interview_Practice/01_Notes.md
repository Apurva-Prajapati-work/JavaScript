# Promises in JavaScript

## Promise.all in JavaScript

### Overview
`Promise.all` is a method that takes an array (or any iterable) of promises and returns a single promise. This returned promise resolves when all the promises in the array resolve or rejects as soon as one of the promises rejects.

### Syntax
```javascript
Promise.all(iterable);
```

### Example
```javascript
const promise1 = Promise.resolve(10);
const promise2 = new Promise((resolve) => setTimeout(() => resolve(20), 1000));
const promise3 = Promise.resolve(30);

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // [10, 20, 30]
  })
  .catch((error) => {
    console.error(error);
  });
```

### Pros
1. **Concurrent Execution**: Executes all promises in parallel, improving performance.
2. **Aggregated Results**: Returns an array of results in the same order as the input promises.
3. **Error Handling**: Simplifies error handling by rejecting immediately if any promise fails.

### Cons
1. **Single Point of Failure**: If one promise rejects, the entire `Promise.all` fails.
2. **Memory Usage**: Holds all results in memory until all promises resolve, which can be problematic for large datasets.

### Use Cases
1. **Fetching Multiple APIs**: When you need to fetch data from multiple endpoints simultaneously.
2. **Batch Processing**: Running multiple independent tasks concurrently.
3. **Data Aggregation**: Combining results from multiple asynchronous operations.

### Success Scenario
```javascript
const promises = [
  Promise.resolve('Task 1 completed'),
  Promise.resolve('Task 2 completed'),
  Promise.resolve('Task 3 completed'),
];

Promise.all(promises)
  .then((results) => {
    console.log('All tasks completed:', results);
  });
```

### Failure Scenario
```javascript
const promises = [
  Promise.resolve('Task 1 completed'),
  Promise.reject('Task 2 failed'),
  Promise.resolve('Task 3 completed'),
];

Promise.all(promises)
  .then((results) => {
    console.log('All tasks completed:', results);
  })
  .catch((error) => {
    console.error('One of the tasks failed:', error);
  });
```

### Key Notes
- The order of results matches the order of the input promises, regardless of the order in which they resolve.
- Use `Promise.allSettled` if you want to handle both resolved and rejected promises without failing the entire operation.
- Be cautious when using `Promise.all` with a large number of promises, as it can lead to performance bottlenecks.

## Promise.allSettled in JavaScript
### Overview
`Promise.allSettled` is a method that takes an array (or any iterable) of promises and returns a single promise. This returned promise resolves when all the promises in the array have settled, meaning they have either resolved or rejected.

### Syntax
```javascript
Promise.allSettled(iterable);
```

### Example
```javascript
const promise1 = Promise.resolve(10);
const promise2 = new Promise((_, reject) => setTimeout(() => reject('Error'), 1000));
const promise3 = Promise.resolve(30);

Promise.allSettled([promise1, promise2, promise3])
  .then((results) => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 10 },
    //   { status: 'rejected', reason: 'Error' },
    //   { status: 'fulfilled', value: 30 }
    // ]
  });
```

### Pros
1. **Handles All Outcomes**: Provides results for both resolved and rejected promises.
2. **No Short-Circuiting**: Ensures all promises are processed, regardless of individual failures.
3. **Detailed Results**: Returns an array of objects with `status` and `value`/`reason`.

### Cons
1. **No Aggregated Success**: Does not directly provide only resolved values.
2. **Manual Filtering**: Requires additional steps to separate fulfilled and rejected results.

### Use Cases
1. **Logging Results**: Useful when you want to log all outcomes, including errors.
2. **Non-Critical Tasks**: Running tasks where failures do not block the overall process.
3. **Batch Processing with Tolerance**: Handling multiple tasks while tolerating individual failures.

### Key Notes
- Each result object has a `status` property (`fulfilled` or `rejected`).
- For fulfilled promises, the result object includes a `value` property.
- For rejected promises, the result object includes a `reason` property.
- Unlike `Promise.all`, it does not reject if any promise fails.

### Comparison with `Promise.all`
| Feature                | `Promise.all`                     | `Promise.allSettled`               |
|------------------------|------------------------------------|------------------------------------|
| Resolves When          | All promises resolve              | All promises settle                |
| Rejects When           | Any promise rejects               | Never rejects                      |
| Result Format          | Array of resolved values          | Array of result objects            |
| Use Case               | All-or-nothing operations         | Handling mixed outcomes            |


## Promise.race in JavaScript

### Overview
`Promise.race` is a method that takes an array (or any iterable) of promises and returns a single promise. This returned promise resolves or rejects as soon as the first promise in the array settles (either resolves or rejects).

### Syntax
```javascript
Promise.race(iterable);
```

### Example
```javascript
const promise1 = new Promise((resolve) => setTimeout(() => resolve('First'), 500));
const promise2 = new Promise((resolve) => setTimeout(() => resolve('Second'), 1000));
const promise3 = new Promise((_, reject) => setTimeout(() => reject('Error'), 300));

Promise.race([promise1, promise2, promise3])
  .then((result) => {
    console.log('Winner:', result); // 'Error' (since promise3 settles first)
  })
  .catch((error) => {
    console.error('Race failed:', error);
  });
```

### Pros
1. **Fastest Response**: Returns the result of the first settled promise, improving responsiveness.
2. **Timeout Handling**: Useful for implementing timeouts by racing against a delay promise.
3. **Simplified Logic**: Reduces complexity when only the first result matters.

### Cons
1. **Partial Results**: Ignores other promises once the first one settles.
2. **Error Propagation**: If the first settled promise rejects, the entire race fails.

### Use Cases
1. **Timeouts**: Implementing a timeout for an operation.
2. **First Response Wins**: Fetching data from multiple sources and using the fastest response.
3. **Fallback Mechanisms**: Racing a primary task against a fallback operation.

### Timeout Example
```javascript
const fetchData = new Promise((resolve) => setTimeout(() => resolve('Data fetched'), 2000));
const timeout = new Promise((_, reject) => setTimeout(() => reject('Timeout'), 1000));

Promise.race([fetchData, timeout])
  .then((result) => {
    console.log(result); // 'Timeout'
  })
  .catch((error) => {
    console.error(error); // 'Timeout'
  });
```

### Key Notes
- The returned promise settles as soon as the first promise in the array settles.
- Use `Promise.race` when you only care about the fastest result.
- Be cautious of unhandled rejections in the remaining promises.

### Comparison with Other Methods
| Feature                | `Promise.all`                     | `Promise.allSettled`               | `Promise.race`                     |
|------------------------|------------------------------------|------------------------------------|------------------------------------|
| Resolves When          | All promises resolve              | All promises settle                | First promise settles              |
| Rejects When           | Any promise rejects               | Never rejects                      | First promise rejects              |
| Result Format          | Array of resolved values          | Array of result objects            | Single value or error              |
| Use Case               | All-or-nothing operations         | Handling mixed outcomes            | Fastest response wins              |

---

## Promise.any
### Overview
`Promise.any` is a method that takes an array (or any iterable) of promises and returns a single promise. This returned promise resolves as soon as any of the promises in the array resolves. If all the promises reject, it rejects with an `AggregateError`, which is a special error object that contains all the rejection reasons.

### Syntax
```javascript
Promise.any(iterable);
```

### Example
```javascript
const promise1 = new Promise((_, reject) => setTimeout(() => reject('Error 1'), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve('Success'), 2000));
const promise3 = new Promise((_, reject) => setTimeout(() => reject('Error 2'), 3000));

Promise.any([promise1, promise2, promise3])
  .then((result) => {
    console.log('First resolved promise:', result); // 'Success'
  })
  .catch((error) => {
    console.error('All promises rejected:', error);
  });
```

### Pros
1. **First Success Wins**: Resolves as soon as the first promise fulfills, improving responsiveness.
2. **Error Tolerance**: Ignores rejected promises as long as at least one promise resolves.
3. **Simplified Fallbacks**: Useful for scenarios where any successful result is acceptable.

### Cons
1. **No Aggregated Errors**: Only the first resolved value is returned, ignoring other successes.
2. **AggregateError Handling**: Requires handling a special error type when all promises reject.

### Use Cases
1. **Fallback Mechanisms**: Trying multiple strategies and using the first successful result.
2. **Fastest Success**: Fetching data from multiple sources and using the first successful response.
3. **Error-Resilient Operations**: Running tasks where failures are acceptable as long as one succeeds.

### Failure Scenario
```javascript
const promise1 = Promise.reject('Error 1');
const promise2 = Promise.reject('Error 2');
const promise3 = Promise.reject('Error 3');

Promise.any([promise1, promise2, promise3])
  .then((result) => {
    console.log('First resolved promise:', result);
  })
  .catch((error) => {
    console.error('All promises rejected:', error.errors); // ['Error 1', 'Error 2', 'Error 3']
  });
```

### Key Notes
- The returned promise resolves with the value of the first fulfilled promise.
- If all promises reject, it rejects with an `AggregateError` containing all rejection reasons.
- Use `Promise.any` when you only care about the first successful result, regardless of failures.

### Comparison with Other Methods
| Feature                | `Promise.all`                     | `Promise.allSettled`               | `Promise.race`                     | `Promise.any`                      |
|------------------------|------------------------------------|------------------------------------|------------------------------------|------------------------------------|
| Resolves When          | All promises resolve              | All promises settle                | First promise settles              | First promise resolves             |
| Rejects When           | Any promise rejects               | Never rejects                      | First promise rejects              | All promises reject                |
| Result Format          | Array of resolved values          | Array of result objects            | Single value or error              | Single value or `AggregateError`   |
| Use Case               | All-or-nothing operations         | Handling mixed outcomes            | Fastest response wins              | First success wins                 |