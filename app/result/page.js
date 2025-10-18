// app/result/page.js
import { Suspense } from "react";
import ResultClient from "./ResultClient";

// Opt this route into dynamic rendering so it won't be prerendered.
// (These are allowed in a Server file, not in a Client file.)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ResultPage() {
  // We don't actually need search params, but wrapping the client subtree
  // in Suspense keeps the shell static and silences the CSR bailout rule.
  return (
    <main className="screen-wrap">
      <Suspense fallback={<div className="box"><p>Scoring…</p></div>}>
        <ResultClient />
      </Suspense>
    </main>
  );
}
