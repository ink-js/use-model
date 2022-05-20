
import { PropsWithChildren, createContext } from 'react'
import Store from './Store'
import Executor from './Executor'
import { useState, useEffect, useContext } from 'react'
import { isEqual, useGetSet } from './util'

type ModelHooks = Record<string, () => unknown>

const createModels = <H extends ModelHooks>(hooks: H) => {

  const store = new Store()

  const Context = createContext(store)

  const Provider = ({ children }: PropsWithChildren<{}>) => (
    <Context.Provider value={store}>
      {Object.entries(hooks).map(([key, hook]) => (
        <Executor store={store} name={key} hook={hook} key={key} />
      ))}
      {children}
    </Context.Provider>
  )
  
  type Model<T extends keyof H> = {
    [key in keyof H]: ReturnType<H[T]>
  }

  function useModel<T extends keyof Model<T>> (model: T): Model<T>[T]
  function useModel<T extends keyof Model<T>, U> (model: T, selector: (model: Model<T>[T]) => U): U

  function useModel<T extends keyof Model<T>, U> (
    key: T,
    selector?: (model: Model<T>[T]) => U
  ): typeof selector extends undefined ? Model<T>[T] : ReturnType<NonNullable<typeof selector>> {
    type RetState = typeof selector extends undefined ? Model<T>[T] : ReturnType<NonNullable<typeof selector>>

    const store = useContext(Context)

    const [getIsMount, setIsMount] = useGetSet(false)

    const [state, setState] = useState<RetState>(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = store.data[key as string] as any
      return selector ? selector(e) : e
    })

    const [getOldState, setOldState] = useGetSet(state)
    setOldState(state)

    useEffect(() => {
      setIsMount(true)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handler = (e: any) => {
        if (getIsMount()) {
          if (selector) {
            const currentState = selector(e)
            if (!isEqual(currentState, getOldState())) {
              setState(currentState)
            }
          } else {
            setState(e)
          }
        }
      }

      store.addHandler(key as string, handler)

      return () => {
        setIsMount(false)
        store.removeHandler(key as string, handler)
      }
    }, [key])

    return state
  }


  return {
    Provider,
    useModel
  }
}

export { createModels }
export default { createModels }
