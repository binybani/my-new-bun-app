import { useState } from 'react'
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col max-w-md m-auto gap-y-5">
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
