import bigInt from "big-integer";
import _ from "lodash";

interface INumberDecomposition {
  d: bigint;
  s: bigint;
}

export class NumericService {
  public gcd(x: bigint, p: bigint): bigint {
    let t: bigint;

    while (p) {
      t = p;
      p = x % p;
      x = t;
    }

    return x;
  }

  public numberDecomposition(p: bigint): INumberDecomposition {
    let s = 0n;
    p = p - 1n;

    while (p % 2n === 0n) {
      p /= 2n;
      s++;
    }

    return {
      d: p,
      s,
    };
  }

  public getRandomFromInterval(p: bigint): bigint {
    return BigInt(bigInt.randBetween(1, p - 1n).valueOf());
  }

  public toBinary(n: bigint): bigint[] {
    const binaryNumber = [];

    while (n >= 1) {
      binaryNumber.push(n % 2n);
      n = n / 2n;
    }

    return binaryNumber.reverse();
  }

  public moduloHornerScheme(n: bigint, pow: bigint, m: bigint): bigint {
    let binaryPow = this.toBinary(pow);
    let result = 1n;

    for (let i = 0; i < binaryPow.length; i++) {
      if (binaryPow[i] === 1n) {
        result = (result * n) % m;
      }

      if (i === binaryPow.length - 1) {
        break;
      }

      result = (result * result) % m;
    }

    return result;
  }

  public ifStrongPseudoprime(p: bigint, x: bigint): boolean {
    const numberDecomposition = this.numberDecomposition(p);
    let x_r: bigint;

    if (
      this.moduloHornerScheme(x, numberDecomposition.d, p) === 1n ||
      this.moduloHornerScheme(x, numberDecomposition.d, p) === p - 1n
    ) {
      return true;
    }

    for (let i = 1; i < numberDecomposition.s; i++) {
      x_r = this.moduloHornerScheme(
        x,
        numberDecomposition.d * BigInt(Math.pow(2, i)),
        p
      );

      if (x_r === p - 1n) {
        return true;
      }
    }

    return false;
  }

  public splitToNumbers(n: bigint): bigint[] {
    return n
      .toString()
      .split("")
      .map((a) => BigInt(a));
  }

  public legendreSymbol(a: bigint, p: bigint): bigint {
    if (a === 0n) {
      return 0n;
    }

    if (a === 1n) {
      return 1n;
    }

    if (p === 2n) {
      if (a % 2n === 0n) {
        return 0n;
      } else {
        return (-1n) ** ((a * a - 1n) / 8n);
      }
    }

    let result = 1n;

    if (a < 0n) {
      a = ((a % p) + p) % p;

      if (p % 4n === 3n) {
        result = -result;
      }
    }

    while (a !== 0n) {
      let t = 0n;

      while (a % 2n === 0n) {
        a /= 2n;
        t += 1n;
      }
      if (t % 2n === 1n && (p % 8n === 3n || p % 8n === 5n)) {
        result = -result;
      }
      if (a % 4n === 3n && p % 4n === 3n) {
        result = -result;
      }
      const temp = a;
      a = p % temp;
      p = temp;
    }

    return result;
  }

  public getLConstant(): number {
    return 1000;
  }

  public sqrt(n: bigint): bigint {
    if (n < 2n) {
      return n;
    }

    if (n < 16n) {
      return BigInt(Math.sqrt(Number(n)) | 0);
    }

    let x0: bigint;
    let x1: bigint;

    if (n < 4503599627370496n) {
      x1 = BigInt(Math.sqrt(Number(n)) | 0) - 3n;
    } else {
      let vlen = n.toString().length;

      if (!(vlen & 1)) {
        x1 = 10n ** BigInt(vlen / 2);
      } else {
        x1 = 4n * 10n ** BigInt((vlen / 2) | 0);
      }
    }

    do {
      x0 = x1;
      x1 = (n / x0 + x0) >> 1n;
    } while (x0 !== x1 && x0 !== x1 - 1n);

    return x0;
  }

  public getChainFractionCoefficients(
    n: bigint,
    iterationsCount: number
  ): bigint[] {
    let v = 1n;
    let a = BigInt(this.sqrt(n));
    let u = a;
    const chainFractionCoefficients: bigint[] = [a];

    for (let i = 0; i < iterationsCount - 1; i++) {
      v = (n - u * u) / v;
      a = (this.sqrt(n) + u) / v;
      u = a * v - u;

      chainFractionCoefficients.push(a);
    }

    return chainFractionCoefficients;
  }

  public decompose(n: bigint, trialDivisionMethod: Function) {
    const decomposition: {
      divisor: bigint;
      power: bigint;
    }[] = [];

    while (n > 1) {
      const divisor = trialDivisionMethod(n);
      const exisitingDivisor = decomposition.find(
        (element) => element.divisor === divisor
      );

      if (!divisor) {
        break;
      }

      if (exisitingDivisor) {
        exisitingDivisor.power++;
      } else {
        decomposition.push({
          divisor,
          power: 1n,
        });
      }

      n = n / divisor;
    }

    return decomposition;
  }

  public getSmoothNumbers(
    n: bigint,
    iterationsCount: number,
    factorBase: bigint[],
    trialDivisionMethod: Function
  ): bigint[][] {
    const chainFractionCoefficients = this.getChainFractionCoefficients(
      n,
      iterationsCount
    );

    let b = 1n;
    let bPrev = 0n;
    let temp: bigint;

    const smoothNumbers: bigint[][] = [];

    for (let i = 0; i < chainFractionCoefficients.length; i++) {
      temp = b;
      b = (chainFractionCoefficients[i] * b + bPrev) % n;
      bPrev = temp;

      if (
        this.decompose(((b * b) % n) - n, trialDivisionMethod).every(
          (element) => factorBase.includes(element.divisor)
        )
      ) {
        if ((b * b) % n > n / 2n) {
          smoothNumbers.push([b, ((b * b) % n) - n]);
        } else {
          smoothNumbers.push([b, (b * b) % n]);
        }
      }
    }

    return smoothNumbers;
  }

  public factorizationByFactorBase(n: bigint, factorBase: bigint[]): number[] {
    const factorizedNumber: number[] = [];

    if (n < 0) {
      n = -1n * n;
      factorizedNumber.push(1);
    } else {
      factorizedNumber.push(0);
    }

    for (let i = 1; i < factorBase.length; i++) {
      let degree = 0;

      if (n % factorBase[i] === 0n) {
        let toFactorize = n / factorBase[i];
        degree = 1;

        while (toFactorize % factorBase[i] === 0n) {
          toFactorize /= factorBase[i];
          degree++;
        }

        factorizedNumber.push(degree % 2);
      } else {
        factorizedNumber.push(0);
      }
    }

    return factorizedNumber;
  }

  public findSolutionsVectorsIndexes(vectors: number[][]): number[] {
    const indexes: number[] = [];

    outer: for (let i = 0; i < vectors.length; i++) {
      const vector = vectors[i];

      for (let j = i + 1; j < vectors.length; j++) {
        if (_.isEqual(vectors[j], vector)) {
          indexes.push(i, j);
          continue outer;
        }
      }
    }

    return indexes;
  }

  public calcBMX(n: bigint, smoothNumbers: bigint[]): bigint {
    return smoothNumbers.reduce((acc, num) => (num * acc) % n, 1n);
  }

  public calcBMY(n: bigint, smoothNumbers: bigint[]): bigint {
    return smoothNumbers.reduce((acc, num) => this.sqrt(num) * acc, 1n) % n;
  }
}
