import { Suspense } from 'react'; // Step 1: Import Suspense
import SkiResortResults from '@/components/ski-resort-results';

export default function ResultsPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading results...</div>}> {/* Step 2: Wrap in Suspense */}
        <SkiResortResults />
      </Suspense>
      <div className="text-center mt-8">
        <a href="/" className="text-blue-600 hover:underline">
          Back to Search
        </a>
      </div>
    </div>
  );
}
