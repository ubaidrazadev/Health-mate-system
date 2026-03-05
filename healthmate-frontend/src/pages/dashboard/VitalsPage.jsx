import VitalsForm from '../../dashboard/VitalsForm'
import VitalsCard from '../../dashboard/VitalsCard'
import useTimeline from '../../hooks/useTimeline'
import Loader from '../../components/shared/Loader'

const VitalsPage = () => {
  const { timeline, loading, refetch } = useTimeline()
  const vitals = timeline.filter(i => i.type === 'vital')

  return (
    <div className="space-y-8 w-full">
      <VitalsForm onSuccess={refetch} />

      <div className="w-full">
        <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
          Purane Vitals ({vitals.length})
        </h2>

        {loading ? (
          <Loader />
        ) : vitals.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 w-full">
            <p className="text-gray-400">Abhi koi vitals nahi hain</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            {vitals.map(v => <VitalsCard key={v._id} vital={v} />)}
          </div>
        )}
      </div>
    </div>
  )
}

export default VitalsPage