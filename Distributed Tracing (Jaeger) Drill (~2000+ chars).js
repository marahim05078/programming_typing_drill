import { initTracer } from "jaeger-client";

const config={
  serviceName:"backend-service",
  reporter:{ logSpans:true },
  sampler:{ type:"probabilistic", param:0.1 }
};
const options={ logger:console };
const tracer=initTracer(config,options);

function tracedOperation(){
  const span=tracer.startSpan("operationX");
  span.log({event:"processing",value:"step1"});
  span.finish();
}
