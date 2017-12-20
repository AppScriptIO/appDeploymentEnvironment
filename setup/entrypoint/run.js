// (function endlessProcess() { process.nextTick(endlessProcess) })() // Readable solution but it utilizes all available CPU. https://stackoverflow.com/questions/39082527/how-to-prevent-the-nodejs-event-loop-from-exiting
console.log('Executing interval in run.js')
setTimeout(() => {  console.log('setTimeout command ended. The process will exit now.'); }, 5000);
