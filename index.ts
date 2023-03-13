import { NumericService } from "./services/numeric.service";
import { ProbabilityService } from "./services/probability-test.service";

const probabilityService = new ProbabilityService();

console.log(probabilityService.millerRabinTest(BigInt("975319753197531975319")));
