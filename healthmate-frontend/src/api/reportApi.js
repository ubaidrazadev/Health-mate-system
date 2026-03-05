import axiosInstance from './axiosInstance'

export const uploadReportApi = (formData) =>
  axiosInstance.post('/api/reports/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const addVitalsApi = (data) =>
  axiosInstance.post('/api/reports/vitals', data)

export const getTimelineApi = () =>
  axiosInstance.get('/api/reports/timeline')