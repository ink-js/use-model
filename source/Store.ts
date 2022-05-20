
type Handler = (state: unknown) => unknown

export default class Store {
  #handlers: Record<string, Set<Handler>> = {}

  public data: Record<string, unknown> = {}

  public addHandler (
    key: string,
    handler: Handler,
    invoke = true
  ) {
    try {
      this.#handlers[key].add(handler)
    } catch (e) {
      this.#handlers[key] = new Set([handler])
    } finally {
      if (invoke) {
        handler(this.data[key])
      }
    }
  }

  public removeHandler (key: string, handler: Handler) {
    this.#handlers[key].delete(handler)
  }

  public update (key: string, value: unknown) {
    this.data[key] = value

    const handlers = this.#handlers[key] as (Set<Handler> | undefined)

    if (handlers?.size) {
      handlers.forEach(handler => handler(value))
    }
  }
}
