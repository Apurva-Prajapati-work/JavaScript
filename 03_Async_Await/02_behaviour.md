# Understanding Parallel `await` in JavaScript

## How Parallel `await` Works

In JavaScript, when you use `await` inside an `async` function, it pauses the execution of the function until the awaited promise resolves. However, if you want to execute multiple asynchronous operations in parallel, you can initiate them first and then `await` their results.

## Example Using `setTimeout`

Here’s an example to demonstrate parallel `await`:

```javascript
async function parallelAwaitExample() {
  const task1 = new Promise((resolve) => setTimeout(() => resolve('Task 1 Complete'), 2000));
  const task2 = new Promise((resolve) => setTimeout(() => resolve('Task 2 Complete'), 1000));

  console.log('Starting tasks in parallel...');
  
  // Start both tasks in parallel
  const [result1, result2] = await Promise.all([task1, task2]);

  console.log(result1); // Logs after 2 seconds: "Task 1 Complete"
  console.log(result2); // Logs after 2 seconds: "Task 2 Complete"
}

parallelAwaitExample();
```

### Execution Explanation

1. Both `task1` and `task2` are initiated simultaneously.
2. `Promise.all` waits for both promises to resolve.
3. The total execution time is determined by the longest-running promise (`task1` in this case, which takes 2 seconds).

### Interesting Facts

- **Efficiency**: Parallel `await` is more efficient than sequential `await` when tasks are independent, as it reduces the overall execution time.
- **Error Handling**: If any promise in `Promise.all` rejects, the entire operation fails, and the error is thrown.
- **Order of Results**: The results from `Promise.all` are returned in the same order as the promises in the array, regardless of the order in which they resolve.

### Sequential vs Parallel

Here’s a comparison:

#### Sequential Example
```javascript
async function sequentialAwaitExample() {
  const task1 = await new Promise((resolve) => setTimeout(() => resolve('Task 1 Complete'), 2000));
  const task2 = await new Promise((resolve) => setTimeout(() => resolve('Task 2 Complete'), 1000));

  console.log(task1); // Logs after 2 seconds: "Task 1 Complete"
  console.log(task2); // Logs after 3 seconds: "Task 2 Complete"
}

sequentialAwaitExample();
```

- Total time: 3 seconds (2 seconds for `task1` + 1 second for `task2`).

#### Parallel Example
```javascript
async function parallelAwaitExample() {
  const task1 = new Promise((resolve) => setTimeout(() => resolve('Task 1 Complete'), 2000));
  const task2 = new Promise((resolve) => setTimeout(() => resolve('Task 2 Complete'), 1000));

  const [result1, result2] = await Promise.all([task1, task2]);

  console.log(result1); // Logs after 2 seconds: "Task 1 Complete"
  console.log(result2); // Logs after 2 seconds: "Task 2 Complete"
}

parallelAwaitExample();
```

- Total time: 2 seconds (the longest-running task).

By understanding and leveraging parallel `await`, you can optimize the performance of your asynchronous JavaScript code.


### Why Sequential `await` Takes Longer

When you use `await` for each promise sequentially, the execution of the next promise is delayed until the current one resolves. This is why the total execution time is the sum of the durations of all promises.

#### Example with Different Durations

```javascript
async function sequentialExample() {
  const promise1 = new Promise((resolve) => setTimeout(() => resolve('Promise 1 Resolved'), 10000)); // 10 seconds
  const promise2 = new Promise((resolve) => setTimeout(() => resolve('Promise 2 Resolved'), 5000));  // 5 seconds

  console.log('Starting sequential execution...');
  
  const result1 = await promise1; // Waits 10 seconds
  console.log(result1);

  const result2 = await promise2; // Waits an additional 5 seconds
  console.log(result2);
}

sequentialExample();
```

#### Execution Time

- `promise1` takes 10 seconds to resolve.
- After `promise1` resolves, `promise2` starts and takes 5 seconds.
- Total time: 10 + 5 = 15 seconds.

### Optimizing with Parallel Execution

To reduce the total execution time, you can start both promises simultaneously and then `await` their results.

#### Example with Parallel Execution

```javascript
async function parallelExample() {
  const promise1 = new Promise((resolve) => setTimeout(() => resolve('Promise 1 Resolved'), 10000)); // 10 seconds
  const promise2 = new Promise((resolve) => setTimeout(() => resolve('Promise 2 Resolved'), 5000));  // 5 seconds

  console.log('Starting parallel execution...');
  
  const [result1, result2] = await Promise.all([promise1, promise2]); // Waits for the longest promise (10 seconds)
  console.log(result1);
  console.log(result2);
}

parallelExample();
```

#### Execution Time

- Both `promise1` and `promise2` start simultaneously.
- The total time is determined by the longest-running promise (`promise1`), which takes 10 seconds.

### Key Takeaway

Using `await` sequentially can lead to longer execution times when promises are independent. Leveraging `Promise.all` for parallel execution can significantly improve performance.
