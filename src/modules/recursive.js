// return the first item in an array
export const head = ([x]) => x;

// return all but the first item in an array
export const tail = ([, ...xs]) => xs;

// return if argument supplied is defined.
export const def = x => typeof x !== 'undefined';

// return if argument supplied is undefined
export const undef = x => !def(x);

// returns a copy of an array without using Array.slice()
export const copy = array => [...array];

// return the length of an array
export const length = ([x, ...xs], len = 0) => def(x) ? length(xs, len + 1): len;

// return a reversed array
export const reverse = ([x, ...xs]) => def(x) ? [...reverse(xs), x] : [];

// returns a new array that contains the first n items of the given array
export const first = ([x, ...xs], n = 1) => def(x) && n ? [x, ...first(xs, n - 1)] : [];

// returns a new array that contains the last n items of the given array
export const last = ([xs, n = 1]) => reverse(first(reverse(xs), n));

// returns a new array with value inserted at given index
export const slice = ([x, ...xs], i, y, curr = 0) => def(x)
  ? curr === i
    ? [y, x, ...slice(xs, i, y, curr + 1)]
    : [x, ...slice(xs, i, y, curr + 1)]
  : [];

// returns if the value supplied is an array
export const isArray = x => Array.isArray(x);

// combines nested arrays into a single array
export const flatten = ([x, ...xs]) => def(x)
  ? isArray(x) ? [...flatten(x), ...flatten(xs)] : [x, ...flatten(xs)]
  : [];

// return a new array with 2 items swapped based on their index
export const swap = (a, i, j) => (
  map(a, (x,y) => {
    if(y === i) return a[j];
    if(y === j) return a[i];
    return x;
  })
);

// creates a new array with the results of calling a provided function on every element in this array
export const map = ([x, ...xs], fn) => def(x) ? [fn(x), ...map(xs, fn)] : [];

// creates a new array with all elements that pass the test implemented by the provided function
export const filter = ([x, ...xs], fn) => def(x)
  ? fn(x)
    ? [x, ...filter(xs, fn)] : [...filter(xs, fn)]
  : [];

// creates a new array with all elements that don't pass the test implemented by the provided function
export const reject = ([x, ...xs], fn) => {
  if (undef(x)) return [];
  if (!fn(x)) {
    return [x, ...reject(xs, fn)];
  } else {
    return [...reject(xs, fn)];
  }
};

// splits an array into two arrays - one whose items pass a filter function and one whose items fail.
export const partition = (xs, fn) => [filter(xs, fn), reject(xs, fn)];

// applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value
export const reduce = ([x, ...xs], fn, memo, i = 0) => def(x)
  ? reduce(xs, fn, fn(memo, x, i), i + 1) : memo;

// similar to reduce, but applies the function from right-to-left
export const reduceRight = (xs, fn, memo) => reduce(reverse(xs), fn, memo);

// partially apply a function by filling in any number of its arguments
export const partial = (fn, ...args) => (...newArgs) => fn(...args, ...newArgs);

// convert function that takes an array to one that takes multiple arguments
export const spreadArg = (fn) => (...args) => fn(args);

// reverse function argument order
export const reverseArgs = (fn) => (...args) => fn(...reverse(args));

// extract property value from array
export const pluck = (key, object) => object[key];

// each function consumes the return value of the function that came before
export const flow = (...args) => init => reduce(args, (memo, fn) => fn(memo), init);

// the same as flow, but arguments are applied in the reverse order
export const compose = (...args) => flow(...reverse(args));

// return the smallest number in an array - returns Infinity if array supplied is empty
export const min = ([x, ...xs], result = Infinity) => def(x)
  ? x < result
    ? min(xs, x)
    : result
  : result;

//
export const max = ([x, ...xs], result = -Infinity) => def(x)
  ? x > result
    ? max(xs, x)
    : max(xs, result)
  : result;
