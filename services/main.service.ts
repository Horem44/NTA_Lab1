import { TimeService, ProbabilityService, FactorizationService } from ".";

export class MainService {
  private readonly factorizationService: FactorizationService;
  private readonly probabilityService: ProbabilityService;
  private readonly timeService: TimeService;

  constructor(private primes: bigint[]) {
    this.factorizationService = new FactorizationService(primes);
    this.probabilityService = new ProbabilityService();
    this.timeService = new TimeService();
  }

  public main(n: bigint) {
    const factorizedNumber: bigint[] = [];

    this.timeService.logExecutionTime(
      this.probabilityService.millerRabinTest.bind(this.probabilityService),
      [n],
      "Miller-Rabin Test"
    );

    const resultOfTest = this.probabilityService.millerRabinTest(n);

    if (resultOfTest) {
      console.log("Number", n, "is prime!");
      factorizedNumber.push(n);
      console.log("Ended with result", factorizedNumber);
      return;
    }

    let trialDivisionPart = n;

    while (this.factorizationService.trialDivisionMethod(trialDivisionPart)) {
      this.timeService.logExecutionTime(
        this.factorizationService.trialDivisionMethod.bind(
          this.factorizationService
        ),
        [trialDivisionPart],
        "Trial Division Method"
      );

      const resultOfTrialDivision =
        this.factorizationService.trialDivisionMethod(trialDivisionPart)!;

      trialDivisionPart /= resultOfTrialDivision;

      factorizedNumber.push(resultOfTrialDivision);

      this.timeService.logExecutionTime(
        this.probabilityService.millerRabinTest.bind(this.probabilityService),
        [trialDivisionPart],
        "Miller-Rabin Test (Trial Division part)"
      );

      const resultOfTest =
        this.probabilityService.millerRabinTest(trialDivisionPart);

      if (resultOfTest) {
        console.log("Number", trialDivisionPart, "is prime!");
        factorizedNumber.push(trialDivisionPart);
        console.log("Trial Division part ended with result", factorizedNumber);
        return;
      }
    }

    console.log("Trial Division part ended with result", factorizedNumber);

    let pollardMethodPart = trialDivisionPart;

    while (this.factorizationService.pollardMethod(pollardMethodPart)) {
      this.timeService.logExecutionTime(
        this.factorizationService.pollardMethod.bind(this.factorizationService),
        [pollardMethodPart],
        "Pollart Method Method"
      );

      const resultOfPollardMethod =
        this.factorizationService.pollardMethod(pollardMethodPart);

      pollardMethodPart /= resultOfPollardMethod!;

      factorizedNumber.push(resultOfPollardMethod!);

      this.timeService.logExecutionTime(
        this.probabilityService.millerRabinTest.bind(this.probabilityService),
        [pollardMethodPart],
        "Miller-Rabin Test (Pollard Method part)"
      );

      const resultOfTest =
        this.probabilityService.millerRabinTest(trialDivisionPart);

      if (resultOfTest) {
        console.log("Number", trialDivisionPart, "is prime!");
        factorizedNumber.push(trialDivisionPart);
        console.log("Pollard Method part ended with result", factorizedNumber);
        return;
      }

      if (
        this.factorizationService.brillhartMorrisonMethod(pollardMethodPart)
      ) {
        this.timeService.logExecutionTime(
          this.factorizationService.brillhartMorrisonMethod.bind(
            this.factorizationService
          ),
          [pollardMethodPart],
          "Brillhart Morrison Method"
        );

        const resultOfBMMethod =
          this.factorizationService.brillhartMorrisonMethod(pollardMethodPart);

        pollardMethodPart /= resultOfBMMethod!;

        factorizedNumber.push(resultOfBMMethod!);

        this.timeService.logExecutionTime(
          this.probabilityService.millerRabinTest.bind(this.probabilityService),
          [pollardMethodPart],
          "Miller-Rabin Test (BM part)"
        );

        const resultOfTest =
          this.probabilityService.millerRabinTest(pollardMethodPart);

        if (resultOfTest) {
          console.log("Number", pollardMethodPart, "is prime!");
          factorizedNumber.push(pollardMethodPart);
          console.log("BM part ended with result", factorizedNumber);
          return;
        }
      }
    }
  }
}
