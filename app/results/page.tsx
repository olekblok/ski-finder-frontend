import SkiResortResults from '@/components/ski-resort-results'

export default function ResultsPage() {
  return (
    <div>
      <SkiResortResults />
      <div className="text-center mt-8">
        <a href="/" className="text-blue-600 hover:underline">
          Back to Search
        </a>
      </div>
    </div>
  )
}