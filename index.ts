import { FactorizationService } from "./services/factorization.service";
import { PrimesService } from "./services/primes.service";
import { ProbabilityService } from "./services/probability-test.service";
import { TimeService } from "./services/time.service";

const primesService = new PrimesService();

primesService.primes$.subscribe(
  (primes) => {
    console.log("*** Primes downloaded successfully ***", "\n");

    const probabilityService = new ProbabilityService();
    const factorizationService = new FactorizationService(primes);
    const timeService = new TimeService();

    timeService.getExecutionTime(
      probabilityService.millerRabinTest.bind(probabilityService),
      [
        44531863691195734177338197455569767193298247502066806595979646595136492027235782814594845492097865682056265398300200700471798687479590613927231636475675017034786471249164892858870830712052808191802867n,
      ],
      "Miller-Rabin Test"
    );

    timeService.getExecutionTime(
      factorizationService.trialDivisionMethod.bind(factorizationService),
      [7442109405582674149n],
      "Trial Division method"
    );

    timeService.getExecutionTime(
      factorizationService.pollardMethod.bind(factorizationService),
      [7442109405582674149n],
      "Pollard method"
    );
  },
  (err) => console.log("*** Primes downloading error:", err, "***")
);
