import {
  createAuthRequestInterceptor,
  createAuthResponseInterceptor,
} from '../interceptor/interceptor'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'

const ACCESS_TOKEN_KEY = 'roommatex_access_token'
const REFRESH_TOKEN_KEY = 'roommatex_refresh_token'

const requestInterceptors = []
const responseInterceptors = []

const isFormData = (value) =>
  typeof FormData !== 'undefined' && value instanceof FormData

const jsonRequestInterceptor = (config) => {
  if (!config.body || isFormData(config.body)) {
    return config
  }

  config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
  config.body = JSON.stringify(config.body)

  return config
}

const buildUrl = (endpoint, params) => {
  const url = endpoint.startsWith('http')
    ? new URL(endpoint)
    : new URL(`${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`)

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  return url.toString()
}

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || ''

  if (response.status === 204) {
    return null
  }

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

const createApiError = (response, data) => {
  const message =
    data?.message ||
    data?.error ||
    response.statusText ||
    'Something went wrong while contacting RoomMateX.'

  const error = new Error(message)
  error.status = response.status
  error.data = data
  return error
}

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: ({ accessToken, refreshToken }) => {
    if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}

requestInterceptors.push(createAuthRequestInterceptor(tokenStorage), jsonRequestInterceptor)
responseInterceptors.push(createAuthResponseInterceptor(tokenStorage))

export const apiInterceptors = {
  useRequest: (interceptor) => {
    requestInterceptors.push(interceptor)
    return () => {
      const index = requestInterceptors.indexOf(interceptor)
      if (index >= 0) requestInterceptors.splice(index, 1)
    }
  },
  useResponse: (interceptor) => {
    responseInterceptors.push(interceptor)
    return () => {
      const index = responseInterceptors.indexOf(interceptor)
      if (index >= 0) responseInterceptors.splice(index, 1)
    }
  },
}

export const apiClient = async (endpoint, options = {}) => {
  const {
    params,
    headers,
    method = 'GET',
    signal,
    retry = 0,
    ...rest
  } = options

  let config = {
    method,
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    signal,
    ...rest,
  }

  for (const interceptor of requestInterceptors) {
    config = await interceptor(config)
  }

  let response

  try {
    response = await fetch(buildUrl(endpoint, params), config)
  } catch (error) {
    if (retry > 0) {
      return apiClient(endpoint, { ...options, retry: retry - 1 })
    }

    throw error
  }

  for (const interceptor of responseInterceptors) {
    response = await interceptor(response)
  }

  const data = await parseResponse(response)

  if (!response.ok) {
    throw createApiError(response, data)
  }

  return data
}

export const api = {
  get: (endpoint, options) => apiClient(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) =>
    apiClient(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) =>
    apiClient(endpoint, { ...options, method: 'PUT', body }),
  patch: (endpoint, body, options) =>
    apiClient(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options) => apiClient(endpoint, { ...options, method: 'DELETE' }),
}

export default api
