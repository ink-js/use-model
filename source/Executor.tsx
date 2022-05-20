import { useEffect, useRef, useMemo } from 'react'
import type Store from './Store'

interface Props {
  store: Store
  name: string
  hook(): unknown
}

const Executor = ({ store, name, hook }: Props) => {
  const isInitialRef = useRef(false)

  let data: unknown

  useEffect(() => {
    if (isInitialRef.current) {
      store.update(name, data)
    } else {
      isInitialRef.current = true
    }
  })

  try {
    data = hook()
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Invoking "${name || 'unknown'}" model failed: `, error)
    }
  }

  useMemo(() => {
    store.update(name, data)
  }, [])

  return null
}

export default Executor
