import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Modal } from '../components/Modal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContext'


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();

  return (
    <div>
    <Sidebar />
    <Modal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }}/>
    <div className='p-4 min-h-screen pl-64'>
      
      <div className='flex justify-end mr-8'>
        <Button variant='primary' size='md' onClick={() => {alert('hi there')}} text={'Share Brain'} startIcon={<ShareIcon size='md'/>}/>
        <Button variant='secondary' size='md' onClick={() => {setModalOpen(true)}} text='Add Content' startIcon={<PlusIcon size='lg'/>}/>
      </div>    
      <div className='flex mt-6'>
        {contents.map(({type, link, title, dateAdded}) => <Card 
          type={type}
          link={link}
          title={title}
          dateAdded={dateAdded}
          shareHandler={() => {
            window.open(link, '_blank');
          }}
        />)}
      </div>
    </div>
    </div>
  )
}
