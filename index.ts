import { dataset } from "./constants";
import {
  FactorizationService,
  PrimesService,
  ProbabilityService,
  TimeService,
} from "./services";

const primesService = new PrimesService();

primesService.primes$.subscribe(
  (primes) => {
    console.log("*** Primes downloaded successfully ***", "\n");

    const probabilityService = new ProbabilityService();
    const factorizationService = new FactorizationService(primes);
    const timeService = new TimeService();

    dataset.forEach((data) => {
      console.log("*** Number:", data, "is processing now ***", "\n");

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

      console.log("*** ---- ***", "\n");
    });
  },
  (err) => console.log("*** Primes downloading error:", err, "***")
);
