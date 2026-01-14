import java.util.*;
class Solution {
    public int majorityElement(int[] nums) {
        int n=nums.length;
        Arrays.sort(nums);
        int soln=nums[n/2];
        return soln;

  }
}