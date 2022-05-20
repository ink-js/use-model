import { useRef } from 'react'

export const isEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) {
    return true
  }
  if (typeof a !== typeof b) {
    return false
  }
  const al = Object.keys(a as object)
  const bl = Object.keys(b as object)
  if (al.length !== bl.length) {
    return false
  }
  return al.every(i => (a as Record<string, unknown>)[i] === (b as Record<string, unknown>)[i])
}

export const useGetSet = <T>(value: T): [() => T, (newValue: T) => void, React.MutableRefObject<T>] => {
  const ref = useRef(value)
  const get = () => ref.current
  const set = (newValue: T) => {
    ref.current = newValue
  }
  return [get, set, ref]
}
