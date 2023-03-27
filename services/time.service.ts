export class TimeService {
  logExecutionTime(fn: (...args: any) => any, args: any[], fnName: string): void {
    console.time(fnName + " execution time");
    console.log(fnName, "arguments:", ...args.map((arg) => arg.toString()));
    console.log(
      fnName,
      "output:",
      fn(...args)
    );
    console.timeEnd(fnName + " execution time");
    process.stdout.write("\n"); 
  }
}
