import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col bg-background">
        <Button onClick={() => setCount((count) => count + 1)}>
          up
        </Button>
        <Button onClick={() => setCount((count) => count - 1)}>
          down
        </Button>
        <p>
          {count}
        </p>
      </div>
   
    </>
  )
}

export default App
