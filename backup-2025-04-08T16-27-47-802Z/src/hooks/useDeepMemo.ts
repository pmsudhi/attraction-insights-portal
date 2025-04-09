"use client"

import type React from "react"

import { useRef, useMemo } from "react"
import { isEqual } from "lodash-es"

/**
 * A custom hook that memoizes a value based on deep comparison of dependencies
 * Useful for complex objects that would cause unnecessary re-renders with standard useMemo
 */
export function useDeepMemo<T>(factory: () => T, deps: React.DependencyList): T {
  const depsRef = useRef<React.DependencyList>([])

  if (!depsRef.current || !isEqual(depsRef.current, deps)) {
    depsRef.current = deps
  }

  return useMemo(factory, [factory, ...depsRef.current])
}

