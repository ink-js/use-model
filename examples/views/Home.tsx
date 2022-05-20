import { useModel } from "../models"

const Home = () => {
  const { user, getUser } = useModel('user')
  return (
    <>
      <div>名称: {user?.name}</div>
      <div>ID: {user?.id}</div>
      <button onClick={getUser}>获取用户信息</button>
    </>
  )
}

export default Home
