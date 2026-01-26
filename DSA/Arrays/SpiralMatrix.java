class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();

        int n = matrix.length;
        int m = matrix[0].length;

        int startrow = 0, endrow = n - 1;
        int startcol = 0, endcol = m - 1;

        while (startrow <= endrow && startcol <= endcol) {

            for (int j = startcol; j <= endcol; j++)
                res.add(matrix[startrow][j]);

            for (int i = startrow + 1; i <= endrow; i++)
                res.add(matrix[i][endcol]);

            if (startrow == endrow) break;
            for (int j = endcol - 1; j >= startcol; j--)
                res.add(matrix[endrow][j]);

            if (startcol == endcol) break;
            for (int i = endrow - 1; i > startrow; i--)
                res.add(matrix[i][startcol]);

            startrow++;
            endrow--;
            startcol++;
            endcol--;
        }

        return res;
    }
}
