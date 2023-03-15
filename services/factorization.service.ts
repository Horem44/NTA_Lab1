import { NumericService } from "./numeric.service";

export class FactorizationService {
  private readonly numericService = new NumericService();

  constructor(private readonly primes: bigint[]) {}

  trialDivisionMethod(n: bigint) {
    for (let i = 0; i < this.primes.length; i++)
      if (n % this.primes[i] === 0n) {
        return this.primes[i];
      }

    return null;
  }

  pollardMethod(n: bigint) {
    const pollardFunction = (x: bigint) => (x * x + 1n) % n;

    let x = 2n;
    let y = 2n;
    let d: bigint;

    while (true) {
      x = pollardFunction(x);
      y = pollardFunction(pollardFunction(y));

      if (x - y < 0) {
        d = this.numericService.gcd(y - x, n);
      } else {
        d = this.numericService.gcd(x - y, n);
      }

      if (x === y) {
        return null;
      }

      if (d !== 1n) {
        return d;
      }
    }
  }
}
