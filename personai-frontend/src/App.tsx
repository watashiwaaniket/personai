import { Button } from './components/Button'
import { Card } from './components/Card'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

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
    <Button variant='primary' size='md' onClick={() => {alert('hi there')}} text={'Share Brain'} startIcon={<ShareIcon size='md'/>}/>
    <Button variant='secondary' size='md' onClick={() => {alert('second button')}} text='Add Content' startIcon={<PlusIcon size='lg'/>}/>
    <Card />
    </>
  )
}

export default App
