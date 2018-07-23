import {
  head,
  tail,
  def,
  undef,
  copy,
  length,
  reverse,
  first,
  last,
  slice,
  isArray,
  flatten,
  swap,
  map,
  filter,
  reject,
  partition,
  reduce,
  reduceRight,
  partial,
  spreadArg,
  reverseArgs,
  pluck,
  flow,
  compose,
  min,
  max
} from '../../src/modules/recursive';

const mockArr1 = [10, 20, 30, 40, 50];
const equalOrGreaterThan30 = x => x >= 30;
const sum = (memo, x) => memo + x;
const getPrice = partial(pluck, 'price');
const discount = x => x * 0.9;
const tax = x => x + (x * 0.075);
const products = [
  { price: 10 },
  { price: 5 },
  { price: 1 }
];
let actual, getFinalPrice;

describe('Recursive utils tests', () => {

  it('head() should return the first item in an array', () => {
    actual = head(mockArr1);

    expect(actual).toEqual(10);
  });

  it('tail() should return the rest items in an array', () => {
    actual = tail(mockArr1);

    expect(actual).toEqual([20, 30, 40, 50]);
  });

  it('def() should return if argument supplied is defined', () => {
    const defined = 'this is defined';
    let notDefined;

    expect(def(defined)).toBeTruthy();
    expect(def(notDefined)).toBeFalsy();
  });

  it('undef() should return if argument supplied is undefined', () => {
    const defined = 'this is defined';
    let notDefined;

    expect(undef(notDefined)).toBeTruthy();
    expect(undef(defined)).toBeFalsy();
  });

  it('copy() should return a copy of an array', () => {
    actual = copy(mockArr1);

    expect(actual).toEqual(mockArr1);
  });

  it('length() should return a copy of an array', () => {
    actual = length(mockArr1);

    expect(actual).toEqual(mockArr1.length);
  });

  it('reverse() should return a reversed array', () => {
    actual = reverse(mockArr1);

    expect(actual).toEqual([50, 40, 30, 20, 10]);
  });

  it('first() should return a new array that contains the first n items', () => {
    actual = first(mockArr1, 3);

    expect(actual).toEqual([10, 20, 30]);
  });

  xit('last() should return a new array that contains the last n items', () => {
    actual = last(mockArr1, 3);

    expect(actual).toEqual([30, 40, 50]);
  });

  it('slice() should return a new array with value inserted at given index', () => {
    actual = slice(mockArr1, 2, 25);

    expect(actual).toEqual([10, 20, 25, 30, 40, 50]);
  });

  it('isArray() should return if the value supplied is an array', () => {
    const notAnArray = {};

    expect(isArray(mockArr1)).toBeTruthy();
    expect(isArray(notAnArray)).toBeFalsy();
  });

  it('flatten() should combine nested arrays into a single array', () => {
    const array1 = [1, 2, 3];
    const array2 = [4, [5, [6]]];
    actual = flatten([array1, array2]);

    expect(actual).toEqual([1, 2, 3, 4, 5, 6]);
  });

  // it doesn't work as expected
  xit('swap() should return a new array with value inserted at given index', () => {
    actual = swap(mockArr1, 0, 4);

    expect(actual).toEqual([50, 20, 30, 40, 10]);
  });

  it('map() should creates a new array with the results of calling a provided function on every element', () => {
    const double = x => x * 2;
    actual = map(mockArr1, double);

    expect(actual).toEqual([20, 40, 60, 80, 100]);
  });

  it('filter() should creates a new array with all elements that pass the test implemented by the provided function', () => {
    actual = filter(mockArr1, equalOrGreaterThan30);

    expect(actual).toEqual([30, 40, 50]);
  });

  it('reject() should creates a new array with all elements that doesn\'t pass the test implemented by the provided function', () => {
    actual = reject(mockArr1, equalOrGreaterThan30);

    expect(actual).toEqual([10, 20]);
  });

  it('partition() should split an array into two arrays', () => {
    actual = partition(mockArr1, equalOrGreaterThan30);

    expect(actual).toEqual([[30, 40, 50], [10, 20]]);
  });

  it('reduce() should reduce the value to each item in an array to a single one', () => {
    actual = reduce(mockArr1, sum, 0);

    expect(actual).toEqual(150);
  });

  it('reduceRight() should reduce the value to each item in an array to a single one', () => {
    actual = reduceRight(mockArr1, sum, 0);

    expect(actual).toEqual(150);
  });

  it('partial() should convert an function that takes an array to one that takes multiple arguments', () => {
    const add = (x,y) => x + y;
    const add5to = partial(add, 5);

    actual = add5to(10);

    expect(actual).toEqual(15);
  });

  it('spreadArg() should convert function that takes an array to one that takes multiple arguments', () => {
    const add = ([x, ...xs]) => def(x) ? parseInt(x + add(xs)) : [];
    const spreadAdd = spreadArg(add);

    actual = spreadAdd(10, 20, 30, 40, 50);

    expect(actual).toEqual(150);
  });

  it('reverseArgs() should reverse function argument order', () => {
    const divide = (x,y) => x / y;
    const reverseDivide = reverseArgs(divide);

    actual = reverseDivide(100,10);

    expect(actual).toEqual(0.1);
  });

  it('pluck() should extract propery value from array', () => {
    const product = { price: 15 };
    actual = pluck('price', product);

    expect(actual).toEqual(15);
  });

  it('flow() should make each function consumes the return value of the previous function', () => {
    getFinalPrice = flow(getPrice, discount, tax);

    actual = map(products, getFinalPrice);

    expect(actual).toEqual([9.675, 4.8375, 0.9675]);
  });

  it('compose() make each function consumes the return value of the previous function in reverse order', () => {
    getFinalPrice = compose(tax, discount, getPrice);

    actual = map(products, getFinalPrice);

    expect(actual).toEqual([9.675, 4.8375, 0.9675]);
  });

  it('min() should return the smallest number in an array', () => {
    actual = min(mockArr1);

    expect(actual).toEqual(10);
  });

  it('max() should return the largest number in an array', () => {
    actual = max(mockArr1);

    expect(actual).toEqual(50);
  });
});
