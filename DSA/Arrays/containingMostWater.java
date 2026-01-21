class Solution {
    public int maxArea(int[] height) {
       int currwater=0;
       int i=0;
       int j=height.length-1;
       while(i<j){
        int width=j-i;
        int water=width*Math.min(height[i],height[j]);
        if(height[i]<height[j]){
            i++;
        }
        else{
            j--;
        }

        if(currwater<water){
            currwater=water;
        }
        
       } 
       return currwater;
    }
}