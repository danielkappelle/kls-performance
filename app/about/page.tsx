export default function AboutPage() {
  return (
    <div class="mx-auto w-1/2">
      <h2 className="text-2xl font-bold tracking-tight">About</h2>
      <p className="text-muted-foreground">
        In order to speed up the process of creating a performance calculation
        for flights at the KLM FA I created this tool. Especially looking up the
        TORA, TODA, LDA every time and having to update the different
        rolls/distances each time seemed unnecessary.
      </p>
      <p className="text-muted-foreground mt-3">
        Please use this tool with care. Remember you are still responsible for
        ensuring the calculations are correct. Also make sure that the runway
        characteristics and aircraft performance data are correct.
      </p>
      <p className="text-muted-foreground mt-3">
        Created by Daniel Kappelle (a.k.a. Sat-Cum) in 2024. Source is over at{" "}
        <a
          href="https://github.com/danielkappelle/kls-performance"
          target="_NEW"
        >
          Github
        </a>
        .
      </p>
      <p className="text-muted-foreground mt-3">
        Version: {process.env.version}
      </p>
    </div>
  );
}
