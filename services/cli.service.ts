import { CONSOLE_COLORS } from "../constants/console-colors";


export class CLIService {
  public static getCLIArgumentsArray(): bigint[] {
    return process.argv.slice(2).length > 0
      ? process.argv.slice(2).map((argv) => {
          if (
            !isNaN(Number(argv)) &&
            !isNaN(parseFloat(argv)) &&
            parseFloat(argv) > 0
          ) {
            return BigInt(argv);
          } else {
            console.log(
              CONSOLE_COLORS.RED_BG,
              "Invalid arguments! Provide positive numbers only!"
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
