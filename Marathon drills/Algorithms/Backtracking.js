// N-Queens
function solveNQueens(n){
  const board=Array(n).fill().map(()=>Array(n).fill("."));
  const res=[];
  function isSafe(row,col){
    for(let i=0;i<row;i++){
      if(board[i][col]==="Q") return false;
      if(col-(row-i)>=0 && board[i][col-(row-i)]==="Q") return false;
      if(col+(row-i)<n && board[i][col+(row-i)]==="Q") return false;
    }
    return true;
  }
  function dfs(row){
    if(row===n){ res.push(board.map(r=>r.join(""))); return; }
    for(let col=0;col<n;col++){
      if(isSafe(row,col)){
        board[row][col]="Q";
        dfs(row+1);
        board[row][col]=".";
      }
    }
  }
  dfs(0);
  return res;
}
