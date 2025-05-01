import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'

function App() {
  return (
    <>
    <div className='text-2xl text-green-400'>
      personAI
    </div>
    <code>
      ```
        this better work nicely
      ```
    </code><br />
    <Button variant='secondary' size='sm' onClick={() => {}} text={'Start Here'} startIcon={<PlusIcon size='md'/>}/>
    </>
  )
}

export default App
