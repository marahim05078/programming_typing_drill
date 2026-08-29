// Memoized Fibonacci
function fib(n,memo={}){ if(n<=1) return n; if(memo[n]) return memo[n]; memo[n]=fib(n-1,memo)+fib(n-2,memo); return memo[n]; }

// Knapsack
function knapsack(weights,values,W){
  const n=weights.length;
  const dp=Array(n+1).fill().map(()=>Array(W+1).fill(0));
  for(let i=1;i<=n;i++){
    for(let w=1;w<=W;w++){
      if(weights[i-1]<=w){
        dp[i][w]=Math.max(values[i-1]+dp[i-1][w-weights[i-1]],dp[i-1][w]);
      } else dp[i][w]=dp[i-1][w];
    }
  }
  return dp[n][W];
}
