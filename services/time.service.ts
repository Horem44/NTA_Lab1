export class TimeService {
    getExecutionTime(fn: (...args: any) => any, args: any[], fnName: string){
        console.time(fnName);
        console.log(fnName, "output:", fn(...args));
        console.timeEnd(fnName);
    }
}