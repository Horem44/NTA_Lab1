import { CONSOLE_COLORS } from "../constants/console-colors";


export class CLIService {
  public static getCLIArgumentsArray(): bigint[] {
    return process.argv.slice(2).length > 0
      ? process.argv.slice(2).map((argv) => {
          if (
            !isNaN(Number(argv)) &&
            !isNaN(parseFloat(argv)) &&
            parseFloat(argv) > 1
          ) {
            return BigInt(argv);
          } else {
            console.log(
              CONSOLE_COLORS.RED_BG,
              "Invalid arguments! Only numbers > 1 allowed!"
            );
            process.exit(-1);
          }
        })
      : (() => {
          console.log(CONSOLE_COLORS.RED_BG, "Empty arguments list!");
          process.exit(-1);
        })();
  }
}
