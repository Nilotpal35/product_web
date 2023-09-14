export function onRenderCallBack(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) {
  console.log("ID", id);
  console.log("PHASE", phase);
  console.log("ACTUAL DURATION", actualDuration);
  console.log("BASE DURATION", baseDuration);
  console.log("START TIME", startTime);
  console.log("COMMIT TIME", commitTime);
  console.log("INTERACTIONS", interactions);
}
