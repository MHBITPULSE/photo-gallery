import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Photos from './components/photos/Photos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Photos />
    </div>
  )
}

export default App
