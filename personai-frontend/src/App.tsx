import { Button } from './components/Button'
import { Card } from './components/Card'
import { Modal } from './components/Modal'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function showModal(){
  alert('write modal logic here')
}

function App() {
  return (
    <div className='h-screen bg-[#EFF5F5]'>
      <Modal open={true} onClose={''}/>
      <div className='text-2xl text-green-400 p-4'>
        personAI
      </div>
      <code className='p-4'>
        ```
          Your second brain utilizing the power of AI
        ```
      </code><br />
      <div className='flex justify-end mr-8'>
        <Button variant='primary' size='md' onClick={() => {alert('hi there')}} text={'Share Brain'} startIcon={<ShareIcon size='md'/>}/>
        <Button variant='secondary' size='md' onClick={() => {showModal()}} text='Add Content' startIcon={<PlusIcon size='lg'/>}/>
      </div>    
      <div className='flex mt-6'>
        <Card type='tweet' title='Build a twitter embed' link='1918541398980059344' tags={['#productivity', '#trending']} shareHandler={() => {alert('share')}} deleteHandler={() => {alert('delete')}} dateAdded='01-05-2025'/>
        <Card type='youtube' title='A youtube embed' link='https://www.youtube.com/watch?v=ftYmXoH0V5I' tags={['#web-dev', '#educational']} shareHandler={() => {alert('share')}} deleteHandler={() => {alert('delete')}} dateAdded='01-05-2025'/>
      </div>
    </div>
  )
}

export default App