// BFS
function bfs(graph,start){
  const visited=new Set();
  const queue=[start];
  visited.add(start);
  while(queue.length){
    const node=queue.shift();
    console.log(node);
    for(const neighbor of graph[node]){
      if(!visited.has(neighbor)){ visited.add(neighbor); queue.push(neighbor); }
    }
  }
}

// DFS
function dfs(graph,start,visited=new Set()){
  if(visited.has(start)) return;
  visited.add(start);
  console.log(start);
  for(const neighbor of graph[start]) dfs(graph,neighbor,visited);
}

// Dijkstra
function dijkstra(graph,start){
  const dist={},visited=new Set();
  for(const node in graph) dist[node]=Infinity;
  dist[start]=0;
  while(visited.size<Object.keys(graph).length){
    const u=Object.keys(graph).filter(n=>!visited.has(n)).reduce((a,b)=>dist[a]<dist[b]?a:b);
    visited.add(u);
    for(const [v,w] of graph[u]){
      if(dist[u]+w<dist[v]) dist[v]=dist[u]+w;
    }
  }
  return dist;
}
