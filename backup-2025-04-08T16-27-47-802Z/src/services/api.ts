import axios from "axios"
import type { User, Notification, Property, AttendanceData, RevenueData, Scenario } from "../types"

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post<{ user: User; token: string }>("/auth/login", { email, password }),

  logout: () => api.post("/auth/logout"),

  getCurrentUser: () => api.get<User>("/auth/me"),
}

// Dashboard API
export const dashboardAPI = {
  getOverview: () => api.get("/dashboard/overview"),

  getAttendanceData: (period = "30d") => api.get<AttendanceData[]>(`/dashboard/attendance?period=${period}`),

  getRevenueData: (period = "30d") => api.get<RevenueData[]>(`/dashboard/revenue?period=${period}`),

  getProperties: () => api.get<Property[]>("/properties"),

  getPropertyPerformance: (propertyId?: string) =>
    api.get(`/dashboard/property-performance${propertyId ? `?propertyId=${propertyId}` : ""}`),
}

// Notifications API
export const notificationsAPI = {
  getNotifications: () => api.get<Notification[]>("/notifications"),

  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),

  markAllAsRead: () => api.put("/notifications/read-all"),
}

// Scenarios API
export const scenariosAPI = {
  getScenarios: () => api.get<Scenario[]>("/scenarios"),

  getScenario: (id: string) => api.get<Scenario>(`/scenarios/${id}`),

  createScenario: (scenario: Omit<Scenario, "id" | "createdAt" | "updatedAt">) =>
    api.post<Scenario>("/scenarios", scenario),

  updateScenario: (id: string, scenario: Partial<Scenario>) => api.put<Scenario>(`/scenarios/${id}`, scenario),

  deleteScenario: (id: string) => api.delete(`/scenarios/${id}`),

  compareScenarios: (ids: string[]) => api.post("/scenarios/compare", { ids }),
}

export { api }

