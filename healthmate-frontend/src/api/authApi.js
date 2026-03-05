import axiosInstance from './axiosInstance'

export const registerApi = (data) =>
  axiosInstance.post('/api/user/register', data)

export const verifyEmailApi = (token,email) =>
  axiosInstance.post('/api/user/verify', { token,email })

export const loginApi = (data) =>cd 
  axiosInstance.post('/api/user/login', data)

export const logoutApi = () =>
  axiosInstance.post('/api/user/logout')

export const forgotPasswordApi = (email) =>
  axiosInstance.post('/api/user/forgot-password', { email })

export const verifyOtpApi = (email, otp) =>
  axiosInstance.post(`/api/user/verify-otp/${email}`, { otp })

export const changePasswordApi = (email, data) =>
  axiosInstance.post(`/api/user/change-password/${email}`, data)

export const getProfileApi = () =>
  axiosInstance.get('/api/user/profile')

export const verifyTokenApi = () =>
  axiosInstance.get('/api/user/verify-token')