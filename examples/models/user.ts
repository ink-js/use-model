import { useState } from "react"

export default () => {
  const [user, setUser] = useState<{ name: string, id: string }>()

  const getUser = async () => {
    setTimeout(() => {
      setUser({
        name: '张三',
        id: '1'
      })
    }, 1e3)
  }

  return {
    user,
    getUser
  }
}