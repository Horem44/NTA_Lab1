import { NumericService } from "./numeric.service";

export class FactorizationService {
  private readonly numericService = new NumericService();
  private readonly FactorBase: bigint[] = [-1n];

  constructor(private readonly primes: bigint[]) {}

  trialDivisionMethod(n: bigint): bigint | null {
    for (let i = 0; i < this.primes.length; i++){
      if(this.primes[i] > 47){
        return null;
      }

      if (n % this.primes[i] === 0n) {
        return this.primes[i];
      }
    }

    return null;
  }

  pollardMethod(n: bigint): bigint | null {
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

  public buildFactorBase(n: bigint): void {
    const L = this.numericService.getLConstant();

    for (let i = 0; i < L; i++) {
      if (this.numericService.legendreSymbol(n, this.primes[i]) === 1n) {
        this.FactorBase.push(this.primes[i]);
      }
    }
  }

  brillhartMorrisonMethod(n: bigint): bigint | null {
    if (this.numericService.sqrt(n) * this.numericService.sqrt(n) === n) {
      return null;
    }

    this.buildFactorBase(n);

    const smoothNumbers = this.numericService.getSmoothNumbers(
      n,
      this.FactorBase.length
    );

    const bVector = smoothNumbers.map((smoothNumber) => smoothNumber[0]);
    const b2Vector = smoothNumbers.map((smoothNumber) => smoothNumber[1]);

    const factorizationVectors: number[][] = [];

    for (let i = 0; i < smoothNumbers.length; i++) {
      factorizationVectors[i] = this.numericService.factorizationByFactorBase(
        b2Vector[i],
        this.FactorBase
      );
    }

    const solutionsVectorsIndexes =
      [...new Set(this.numericService.findSolutionsVectorsIndexes(factorizationVectors))];

    const X = this.numericService.calcBMX(
      n,
      solutionsVectorsIndexes.map((index) => bVector[index])
    );

    const Y = this.numericService.calcBMY(
      n,
      solutionsVectorsIndexes.map((index) => b2Vector[index])
    );

    if (Y - X === n || X - Y === n || X + Y === n) {
      return null;
    }

    let gcds;

    if (X < Y) {
      gcds = [
        this.numericService.gcd(X + Y, n),
        this.numericService.gcd(Y - X, n),
      ];
    } else {
      gcds = [
        this.numericService.gcd(X + Y, n),
        this.numericService.gcd(X - Y, n),
      ];
    }

    return gcds[0] === 1n ? gcds[1] : gcds[0];
  }
}
