import { NumericService } from "./numeric.service";

export class ProbabilityService {
  private readonly numericService = new NumericService();

  public millerRabinTest(p: bigint): boolean {
    const k = 10;

    for (let i = 0; i < k; i++) {
      const x = this.numericService.getRandomFromInterval(p);

      if(this.numericService.gcd(x, p) > 1){
        return false;
      }

      if (this.numericService.ifStrongPseudoprime(p, x)) {
        continue;
      } else {
        return false;
      }
    }

    return true;
  }
}
