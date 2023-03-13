import { ProbabilityService } from "./services/probability-test.service";
import { TimeService } from "./services/time.service";

const probabilityService = new ProbabilityService();
const timeService = new TimeService();

timeService.getExecutionTime(
  probabilityService.millerRabinTest.bind(probabilityService),
  [BigInt("975319753197531975319")],
  "Miller-Rabin Test"
);
