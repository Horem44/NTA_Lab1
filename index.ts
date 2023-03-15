import { CONSOLE_COLORS, DATASET } from "./constants";
import {
  FactorizationService,
  PrimesService,
  ProbabilityService,
  TimeService,
  NumericService
} from "./services";

const primesService = new PrimesService();

primesService.primes$.subscribe(
  (primes) => {

    console.log(
      CONSOLE_COLORS.GREEN_FONT,
      "*** Primes downloaded successfully ***",
      "\n"
    );

    const numericService = new NumericService();
    const probabilityService = new ProbabilityService();
    const factorizationService = new FactorizationService(primes);
    const timeService = new TimeService();

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

      timeService.logExecutionTime(
        factorizationService.trialDivisionMethod.bind(factorizationService),
        [data],
        "Trial Division method"
      );

      timeService.logExecutionTime(
        factorizationService.pollardMethod.bind(factorizationService),
        [data],
        "Pollard method"
      );

      console.log(CONSOLE_COLORS.CYAN_FONT, "*** ---- ***", "\n");

    });
  },
  (err) => console.log(CONSOLE_COLORS.RED_BG, "*** Primes downloading error:", err, "***")
);
