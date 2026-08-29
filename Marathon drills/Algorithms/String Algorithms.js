// Palindrome Check
function isPalindrome(s){ return s===s.split("").reverse().join(""); }

// Longest Common Subsequence
function lcs(a,b){
  const dp=Array(a.length+1).fill().map(()=>Array(b.length+1).fill(0));
  for(let i=1;i<=a.length;i++){
    for(let j=1;j<=b.length;j++){
      if(a[i-1]===b[j-1]) dp[i][j]=dp[i-1][j-1]+1;
      else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);
    }
  }
  return dp[a.length][b.length];
}
