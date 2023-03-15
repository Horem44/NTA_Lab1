import * as bigInt from "big-integer";

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
    return BigInt(bigInt.randBetween(1, p).valueOf());
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

    if (
      this.moduloHornerScheme(x, numberDecomposition.d, p) === 1n ||
      this.moduloHornerScheme(x, numberDecomposition.d, p) === p - 1n
    ) {
      return true;
    }

    for (let i = 1; i < numberDecomposition.s; i++) {
      x = this.moduloHornerScheme(
        x,
        numberDecomposition.d * BigInt(Math.pow(2, i)),
        p
      );

      if (x === p - 1n) {
        return true;
      }
    }

    return false;
  }

  public splitToNumbers(n: bigint) {
    return n
      .toString()
      .split("")
      .map((a) => BigInt(a));
  }
}
