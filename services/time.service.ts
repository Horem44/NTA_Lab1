export class TimeService {
  getExecutionTime(fn: (...args: any) => any, args: any[], fnName: string) {
    console.time(fnName + ' execution time');
    console.log(fnName, "arguments:", ...args);
    console.log(fnName, "output:", fn(...args));
    console.timeEnd(fnName + ' execution time');
    console.log("\n");
  }
}
