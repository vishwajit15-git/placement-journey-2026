//APPROACH 1:BINARY SEARCH
import java.util.*;
class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        int[] small,large;
    if (nums1.length <= nums2.length){
        small = nums1;
        large = nums2;
    }
    else{
        small = nums2;
        large = nums1;
    }
    Arrays.sort(small);
    boolean[] used =new boolean[small.length];
    int[] temp=new int[Math.min(small.length,large.length)];
    int k=0;
    
    for(int i=0;i<large.length;i++){
        int idx=BinSearch(large[i],small,used);
        if(idx!=-1){
            temp[k++]=large[i];
            used[idx]=true;
        }
    }
    return Arrays.copyOfRange(temp,0,k);

}
    public int BinSearch(int target,int[] arr,boolean[] used){
        int low=0;
        int high=arr.length-1;
        while(low<=high){
            int mid=low+(high-low)/2;

            if(arr[mid]==target){
                int x=mid;

                while(x>=0 && arr[x]==target){
                    if(!used[x]){
                        return x;
                    }
                    x--;
                }

                x=mid+1;

                while(x<arr.length && arr[x]==target){
                    if(!used[x]){
                        return x;
                    }
                    x++;
                }
                return -1;

            }
            else if(arr[mid]<target){
                low=mid+1;
            }
            else{
                high=mid-1;
            }
        }
        return -1;
    
    }
}

