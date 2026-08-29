// Segment Tree
class SegmentTree{
  constructor(arr){
    this.n=arr.length;
    this.tree=Array(2*this.n).fill(0);
    for(let i=0;i<this.n;i++) this.tree[this.n+i]=arr[i];
    for(let i=this.n-1;i>0;i--) this.tree[i]=this.tree[i<<1]+this.tree[i<<1|1];
  }
  update(pos,val){
    pos+=this.n; this.tree[pos]=val;
    while(pos>1){ pos>>=1; this.tree[pos]=this.tree[pos<<1]+this.tree[pos<<1|1]; }
  }
  query(l,r){
    let res=0; l+=this.n; r+=this.n;
    while(l<r){
      if(l&1) res+=this.tree[l++];
      if(r&1) res+=this.tree[--r];
      l>>=1; r>>=1;
    }
    return res;
  }
}
