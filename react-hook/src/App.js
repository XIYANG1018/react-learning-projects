import { useState} from 'react'

function useToggle() {
  // 可以reuse的逻辑代码
  const [value, setValue] = useState(true)
  const toggle = () => setValue(!value)

  // 把后面会用到的状态或者函数return出去
  return {
    value,
    toggle
  }
}

function App() {
  // const [value, setValue] = useState(true)
  // const toggle = () => setValue(!value)
  const {value, toggle} = useToggle();
  return (
    <div>
      {value && <div>this is div</div>}
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

export default App;
