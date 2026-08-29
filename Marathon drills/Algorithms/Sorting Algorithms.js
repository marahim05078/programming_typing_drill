// Bubble Sort
function bubbleSort(arr){
  for(let i=0;i<arr.length;i++){
    for(let j=0;j<arr.length-i-1;j++){
      if(arr[j]>arr[j+1]) [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
    }
  }
  return arr;
}

// Quick Sort
function quickSort(arr){
  if(arr.length<=1) return arr;
  const pivot=arr[arr.length-1];
  const left=[],right=[];
  for(let i=0;i<arr.length-1;i++){
    if(arr[i]<pivot) left.push(arr[i]); else right.push(arr[i]);
  }
  return [...quickSort(left),pivot,...quickSort(right)];
}

// Merge Sort
function mergeSort(arr){
  if(arr.length<=1) return arr;
  const mid=Math.floor(arr.length/2);
  const left=mergeSort(arr.slice(0,mid));
  const right=mergeSort(arr.slice(mid));
  return merge(left,right);
}
function merge(left,right){
  const result=[];
  while(left.length && right.length){
    if(left[0]<right[0]) result.push(left.shift());
    else result.push(right.shift());
  }
  return [...result,...left,...right];
}
