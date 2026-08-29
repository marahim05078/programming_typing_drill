// Linear Search
function linearSearch(arr,x){ for(let i=0;i<arr.length;i++){ if(arr[i]===x) return i; } return -1; }

// Binary Search
function binarySearch(arr,x){
  let l=0,r=arr.length-1;
  while(l<=r){
    const m=Math.floor((l+r)/2);
    if(arr[m]===x) return m;
    if(arr[m]<x) l=m+1; else r=m-1;
  }
  return -1;
}
