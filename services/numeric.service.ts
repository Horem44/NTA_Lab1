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
    let s = BigInt(0);
    p = p - BigInt(1);

    while (p % BigInt(2) === BigInt(0)) {
      p /= BigInt(2);
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

    while (n >= BigInt(1)) {
      binaryNumber.push(n % BigInt(2));
      n = n / BigInt(2);
    }

    return binaryNumber.reverse();
  }

  public moduloHornerScheme(n: bigint, pow: bigint, m: bigint): bigint {
    let binaryPow = this.toBinary(pow);
    let result = BigInt(1);

    for (let i = 0; i < binaryPow.length; i++) {
      if (binaryPow[i] === BigInt(1)) {
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
      this.moduloHornerScheme(x, numberDecomposition.d, p) === BigInt(1) ||
      this.moduloHornerScheme(x, numberDecomposition.d, p) === p - BigInt(1)
    ) {
      return true;
    }

    for (let i = 1; i < numberDecomposition.s; i++) {
      x = this.moduloHornerScheme(
        x,
        numberDecomposition.d * BigInt(Math.pow(2, i)),
        p
      );

      if (x === p - BigInt(1)) {
        return true;
      }
    }

    return false;
  }
}
