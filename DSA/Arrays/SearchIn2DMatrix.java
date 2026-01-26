class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int n=matrix.length;
        int m=matrix[0].length;
        int low=0;
        int rear=(n*m-1);

        while(low<=rear){
            int mid=low+(rear-low)/2;
            int row=mid/m;
            int col=mid%m;
            if(matrix[row][col]==target){
                return true;
            }
            else if (matrix[row][col]<target){
                low=mid+1;
            }
            else{
                rear=mid-1;
            }
        }
        return false;
    }
}