import { NumericService } from "./numeric.service";

export class FactorizationService {
  private readonly numericService = new NumericService();

  constructor(private readonly primes: bigint[]) {}

  trialDivisionMethod(n: bigint) {
    for (let i = 0; i < this.primes.length; i++) 
      if (n % this.primes[i] === BigInt(0)) {
        return this.primes[i];
      }

      return null;
    }  
}
