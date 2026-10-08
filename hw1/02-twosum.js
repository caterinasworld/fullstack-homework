/** Exercise 02 - Two Sum

Problem:

You are given an array of integers 'nums' and an integer 'target', write a function that returns indices of the two 
numbers such that they add up to target.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**/

let array = [2, 3, 5, 7, 8];
let target = 12;
for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array.length && j != i; j++) {
    if (array[i] + array[j] == target) {
      console.log(`(${i}, ${j})`);
    }
  }
}
