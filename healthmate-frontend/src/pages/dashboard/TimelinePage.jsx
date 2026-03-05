import useTimeline from '../../hooks/useTimeline'
import TimelineItem from '../../dashboard/TimeLineItem'
import Loader from '../../components/shared/Loader'
import { Clock } from 'lucide-react'

const TimelinePage = () => {
  const { timeline, loading, error } = useTimeline()

  return (
    <div className="space-y-6 w-full">      <div>
      <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Medical Timeline</h2>
      <p className="text-gray-500 text-sm">Aapki poori health history ek jagah</p>
    </div>
      {loading ? <div className="flex justify-center py-16"><Loader /></div>
        : error ? <div className="text-center py-16 text-red-500">{error}</div>
          : timeline.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <Clock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">Timeline empty hai — report ya vitals add karo</p>
            </div>
          ) : (
            <div className="pl-2">
              {timeline.map((item, idx) => (
                <TimelineItem key={item._id} item={item} isLast={idx === timeline.length - 1} />
              ))}
            </div>
          )}
    </div>
  )
}

export default TimelinePage