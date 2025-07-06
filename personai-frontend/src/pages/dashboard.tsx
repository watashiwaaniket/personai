import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Modal } from '../components/Modal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContext'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { MessageModal } from '../components/section/MessageModal'
import { useMessageModal } from '../hooks/useMessageModal'


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();
  const {messageModalOpen,trigger} = useMessageModal();

  useEffect(() => {
    refresh()
  }, [modalOpen])

  return (
    <div>
    <Sidebar />
    <MessageModal message='content deleted!' open={messageModalOpen} />
    <Modal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }}/>
    <div className='p-4 min-h-screen sm:pl-64 z-0'>
      
      <div className='flex justify-center sm:justify-end sm:mr-8'>
        <Button variant='primary' size='md' onClick={async() => {
          const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
            share: true
          }, {
            headers: {
              "token": localStorage.getItem("token")
            }
          });
          const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
          alert(shareUrl)
        }} text={'Share Brain'} startIcon={<ShareIcon size='md'/>}/>
        <Button variant='secondary' size='md' onClick={() => {setModalOpen(true)}} text='Add Content' startIcon={<PlusIcon size='lg'/>}/>
      </div>    
      <div className='flex flex-wrap mt-6 z-0 justify-center sm:justify-normal'>
        {contents.map(({_id, type, link, title, dateAdded, context}) => <Card 
          key={_id}
          type={type}
          link={link}
          title={title}
          dateAdded={dateAdded}
          context={context}
          shareHandler={() => {
            window.open(link, '_blank');
          }}
          deleteHandler={async () => {
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
              headers: {
                "token" : localStorage.getItem("token")
              },
              data:{
                _id
              }
            })
            refresh()
            trigger()
          }}
        />)}
      </div>
    </div>
    </div>
  )
}
