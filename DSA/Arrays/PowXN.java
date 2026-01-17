class Solution {
    public double myPow(double a, int n) {

        long exp = n;          
        double ans = 1;

        if(exp < 0){
            a = 1.0 / a;        
            exp = -exp;       
        }

        while(exp > 0){
            if((exp & 1) != 0){
                ans = ans * a;
            }
            a = a * a;
            exp = exp >> 1;
        }
        return ans;
    }
}
