export class NumericService {
  gcd(x: number, p: number): number {
    let t: number;

    while (p) {
      t = p;
      p = x % p;
      x = t;
    }

    return x;
  }

  numberDecomposition(p: number) {
    let s = 0;
    p = p - 1;

    while (p % 2 === 0) {
      p /= 2;
      s++;
    }

    return {
      d: p,
      s,
    };
  }

  getRandomFromInterval(p: number): number {
    return Math.floor(Math.random() * (p - 1) + 1);
  }

  toBinary(n: number) {
    let binaryNumber = [];

    while (n >= 1) {
      binaryNumber.push(n % 2);
      n = Math.floor(n / 2);
    }

    return binaryNumber.reverse();
  }

  moduloHornerScheme(n: number, pow: number, m: number) {
    let binaryPow = this.toBinary(pow);
    let result = 1;

    for (let i = 0; i < binaryPow.length; i++) {
      if (binaryPow[i] === 1) {
        result = (result * n) % m;
      }

      if (i === binaryPow.length - 1) {
        break;
      }

      result = (result * result) % m;
    }

    return result;
  }

  ifStrongPseudoprime(p: number, x: number): boolean {
    const numberDecomposition = this.numberDecomposition(p);

    if (
      this.moduloHornerScheme(x, numberDecomposition.d, p) === 1 ||
      this.moduloHornerScheme(x, numberDecomposition.d, p) === p - 1
    ) {
      return true;
    }

    for (let i = 1; i < numberDecomposition.s; i++) {
      x = this.moduloHornerScheme(x, numberDecomposition.d * Math.pow(2, i), p);

      if (x === p - 1) {
        return true;
      }
    }

    return false;
  }
}
