import * as bigInt from 'big-integer';

export class NumericService {
  gcd(x: bigint, p: bigint) {
    let t: bigint;

    while (p) {
      t = p;
      p = x % p;
      x = t;
    }

    return x;
  }

  bigintDecomposition(p: bigint) {
    let s = BigInt(0);
    p = p - BigInt(1);

    while (p % BigInt(2) === BigInt(0)) {
      p /= BigInt(BigInt(2));
      s++;
    }

    return {
      d: p,
      s,
    };
  }

  getRandomFromInterval(p: bigint) {
    return BigInt(bigInt.randBetween(1, p).valueOf());
  }

  toBinary(n: bigint) {
    let binarybigint = [];

    while (n >= BigInt(1)) {
      binarybigint.push(n % BigInt(BigInt(2)));
      n = n / BigInt(2);
    }

    return binarybigint.reverse();
  }

  moduloHornerScheme(n: bigint, pow: bigint, m: bigint) {
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

  ifStrongPseudoprime(p: bigint, x: bigint): boolean {
    const bigintDecomposition = this.bigintDecomposition(p);

    if (
      this.moduloHornerScheme(x, bigintDecomposition.d, p) === BigInt(1) ||
      this.moduloHornerScheme(x, bigintDecomposition.d, p) === p - BigInt(1)
    ) {
      return true;
    }

    for (let i = 1; i < bigintDecomposition.s; i++) {
      x = this.moduloHornerScheme(x, bigintDecomposition.d * BigInt(Math.pow(2, i)), p);

      if (x === p - BigInt(1)) {
        return true;
      }
    }

    return false;
  }
}
