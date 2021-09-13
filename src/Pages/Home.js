import React from 'react'

const Home = (props) => {
  let userInfo = props.userInfo;
  return (
    <div>
      <h1>Welcome {userInfo.email}</h1>
    </div>
  )
}

export default Home
