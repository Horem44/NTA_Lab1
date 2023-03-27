import { CONSOLE_COLORS, DATASET } from "./constants";
import { MainService, PrimesService } from "./services";

const primesService = new PrimesService();

primesService.primes$.subscribe(
  (primes) => {
    console.log(
      CONSOLE_COLORS.GREEN_FONT,
      "*** Primes downloaded successfully ***",
      "\n"
    );

    const mainService = new MainService(primes);

    console.time("MAIN FUNCTION EXECUTION TIME: ");

    DATASET.forEach((data) => {
      console.log(
        CONSOLE_COLORS.CYAN_FONT,
        `*** Number: ${data} is processing now ***`,
        "\n"
      );

      mainService.main(data);

      console.log(CONSOLE_COLORS.CYAN_FONT, "*** ---- ***", "\n");
    });
    
    console.timeEnd("MAIN FUNCTION EXECUTION TIME: ");
  },
  (err) =>
    console.log(
      CONSOLE_COLORS.RED_BG,
      "*** Primes downloading error:",
      err,
      "***"
    )
);
