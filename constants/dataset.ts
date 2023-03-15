export const dataset: bigint[] =
  process.argv.slice(2).length > 0
    ? process.argv.slice(2).map((argv) => {
        if (!isNaN(Number(argv)) && !isNaN(parseFloat(argv))) {
          return BigInt(argv);
        } else {
          console.error("Invalid arguments! Provide numbers only!");
          process.exit(-1);
        }
      })
    : (() => {
        console.error("Empty arguments list!");
        process.exit(-1);
      })();

// [
//     901667173167834173n,
//     323324583518541583n,
//     2500744714570633849n,
//     691534156424661573n,
//     1184056490329830239n,
//     1449863225586482579n,
//     778320232076288167n,
//     1515475730401555091n,
//     341012868237902669n,
//     7442109405582674149n,
//     3009182572376191n,
//     1021514194991569n,
//     4000852962116741n,
//     15196946347083n,
//     499664789704823n,
//     269322119833303n,
//     679321846483919n,
//     96267366284849n,
//     61333127792637n,
//     2485021628404193n,
//   ];
