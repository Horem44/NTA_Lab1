export class TimeService {
  logExecutionTime(fn: (...args: any) => any, args: any[], fnName: string) {
    console.time(fnName + " execution time");
    console.log(fnName, "arguments:", ...args.map((arg) => arg.toString()));
    console.log(
      fnName,
      "output:",
      fn(...args) ? fn(...args).toString() : fn(...args)
    );
    console.timeEnd(fnName + " execution time");
    process.stdout.write("\n");
  }
}
