import { CONSOLE_COLORS, DATASET } from "./constants";
import {
  FactorizationService,
  PrimesService,
  ProbabilityService,
  TimeService,
  NumericService,
} from "./services";

const primesService = new PrimesService();

primesService.primes$.subscribe(
  (primes) => {
    console.log(
      CONSOLE_COLORS.GREEN_FONT,
      "*** Primes downloaded successfully ***",
      "\n"
    );

    const probabilityService = new ProbabilityService();
    const timeService = new TimeService();
    const factorizationService = new FactorizationService(primes);

    DATASET.forEach((data) => {
      console.log(
        CONSOLE_COLORS.CYAN_FONT,
        `*** Number: ${data} is processing now ***`,
        "\n"
      );

      timeService.logExecutionTime(
        probabilityService.millerRabinTest.bind(probabilityService),
        [data],
        "Miller-Rabin Test"
      );

      
      console.log(CONSOLE_COLORS.CYAN_FONT, "*** ---- ***", "\n");
    });
  },
  (err) =>
    console.log(
      CONSOLE_COLORS.RED_BG,
      "*** Primes downloading error:",
      err,
      "***"
    )
);
