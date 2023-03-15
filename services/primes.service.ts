import { catchError, from, map, Observable, take, throwError } from "rxjs";
import axios, { AxiosError } from "axios";
import { primesUrl } from "../constants/primes";

interface IPrimesResponse {
  [key: string]: number;
}

export class PrimesService {
  private readonly primesAmount = 10000;

  public primes$: Observable<bigint[]> = from(
    axios<IPrimesResponse>(primesUrl)
  ).pipe(
    take(1),
    map((response) =>
      Array.from({ length: this.primesAmount }, (_, i) =>
        BigInt(response.data[i])
      )
    ),
    catchError((err: AxiosError) => throwError(err.message))
  );
}
