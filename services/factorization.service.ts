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

    pollardMethod(n: bigint){
        const pollardFunction = (x: bigint) => (x * x + BigInt(1)) % n; 

        let x = BigInt(2);
        let y = BigInt(2);
        let d: bigint;

        while(true){
            x = pollardFunction(x);
            y = pollardFunction(pollardFunction(y));

            if(x - y < 0){
                d = this.numericService.gcd(y - x, n);
            }else{
                d = this.numericService.gcd(x - y, n);
            }

            if(x === y){
                return null;
            }

            if(d !== BigInt(1)){
                return d;
            }
        }
    }
}
