import { useState, useEffect } from 'react'
import { getTimelineApi } from '../api/reportApi'

const useTimeline = () => {
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTimeline = async () => {
    setLoading(true)
    try {
      const res = await getTimelineApi()
      setTimeline(res.data.timeline || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Timeline load nahi ho saki')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTimeline()
  }, [])

  return { timeline, loading, error, refetch: fetchTimeline }
}

export default useTimeline