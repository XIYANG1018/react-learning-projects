import { useEffect, useState } from 'react'

function Son() {
  // 渲染开启一个timer
  useEffect(() =>{
    const timer = setInterval(()=>{
      console.log('this is a timer running')
    }, 1000)

    return ()=> {
      // clearInterval 是一个 JavaScript 方法，用于取消由 setInterval 方法设置的定时器。当你调用 clearInterval 时，它会停止定时器的执行。

      clearInterval(timer)
    }
  }, [])
  return <div>this is Son</div>
}

function App() {
  const [show, setShow] = useState(true)
  return (
    <div>
      {show && <Son />}
      <button onClick={() => setShow(false)}>uninstall</button>
    </div>
  )
}

export default App;


