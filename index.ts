import { primes } from "./constants/primes";
import { FactorizationService } from "./services/factorization.service";
import { NumericService } from "./services/numeric.service";
import { ProbabilityService } from "./services/probability-test.service";
import { TimeService } from "./services/time.service";

const probabilityService = new ProbabilityService();
const timeService = new TimeService();
const numericService = new NumericService();
const factorizationService = new FactorizationService(primes);


// timeService.getExecutionTime(
//   probabilityService.millerRabinTest.bind(probabilityService),
//   [BigInt("44531863691195734177338197455569767193298247502066806595979646595136492027235782814594845492097865682056265398300200700471798687479590613927231636475675017034786471249164892858870830712052808191802867")],
//   "Miller-Rabin Test"
// );

timeService.getExecutionTime(
  factorizationService.pollardMethod.bind(factorizationService),
  [BigInt("58156853827224043")],
  "Pollard method"
)










