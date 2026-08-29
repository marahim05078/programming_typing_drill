// Activity Selection
function activitySelection(activities){
  activities.sort((a,b)=>a[1]-b[1]);
  const result=[activities[0]];
  let lastEnd=activities[0][1];
  for(let i=1;i<activities.length;i++){
    if(activities[i][0]>=lastEnd){
      result.push(activities[i]);
      lastEnd=activities[i][1];
    }
  }
  return result;
}
