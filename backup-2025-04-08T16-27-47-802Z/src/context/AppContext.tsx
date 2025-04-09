"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { User, Notification, Property } from "../types"
import { authAPI, notificationsAPI, dashboardAPI } from "../services/api"

// Define the state shape
interface AppState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  notifications: Notification[]
  properties: Property[]
  error: string | null
}

// Define action types
type AppAction =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_NOTIFICATIONS"; payload: Notification[] }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "SET_PROPERTIES"; payload: Property[] }

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  notifications: [],
  properties: [],
  error: null,
}

// Create context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
}>({
  state: initialState,
  dispatch: () => null,
})

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      }
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      }
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload ? { ...notification, read: true } : notification,
        ),
      }
    case "SET_PROPERTIES":
      return {
        ...state,
        properties: action.payload,
      }
    default:
      return state
  }
}

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: user } = await authAPI.getCurrentUser()
        dispatch({ type: "SET_USER", payload: user })
      } catch {
        dispatch({ type: "LOGOUT" })
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    checkAuth()
  }, [])

  // Fetch notifications when authenticated
  useEffect(() => {
    if (state.isAuthenticated) {
      const fetchNotifications = async () => {
        try {
          const { data: notifications } = await notificationsAPI.getNotifications()
          dispatch({ type: "SET_NOTIFICATIONS", payload: notifications })
        } catch {
          // Silently fail for notifications
        }
      }

      const fetchProperties = async () => {
        try {
          const { data: properties } = await dashboardAPI.getProperties()
          dispatch({ type: "SET_PROPERTIES", payload: properties })
        } catch {
          // Silently fail for properties
        }
      }

      fetchNotifications()
      fetchProperties()
    }
  }, [state.isAuthenticated])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext)

