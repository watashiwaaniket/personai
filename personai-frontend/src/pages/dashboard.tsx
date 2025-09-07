import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Modal } from '../components/Modal'
import { ContextModal } from '../components/ContextModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContext'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { MessageModal } from '../components/section/MessageModal'
import { useMessageModal } from '../hooks/useMessageModal'


interface Content {
  _id: string;
  type: string;
  link: string;
  title: string;
  dateAdded: string;
  context: string;
  tags?: string[];
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contextModalOpen, setContextModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
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
    {selectedContent && (
      <ContextModal 
        open={contextModalOpen}
        onClose={() => {
          setContextModalOpen(false);
          setSelectedContent(null);
        }}
        context={selectedContent.context}
        title={selectedContent.title}
        link={selectedContent.link}
        type={selectedContent.type}
        dateAdded={selectedContent.dateAdded}
        tags={selectedContent.tags}
        shareHandler={() => {
          window.open(selectedContent.link, '_blank');
        }}
        deleteHandler={async () => {
          await axios.delete(`${BACKEND_URL}/api/v1/content`, {
            headers: {
              "token" : localStorage.getItem("token")
            },
            data:{
              _id: selectedContent._id
            }
          })
          refresh()
          trigger()
          setContextModalOpen(false);
          setSelectedContent(null);
        }}
      />
    )}
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
        {contents.map((content) => <Card 
          key={content._id}
          type={content.type}
          link={content.link}
          title={content.title}
          dateAdded={content.dateAdded}
          context={content.context}
          tags={content.tags}
          shareHandler={() => {
            window.open(content.link, '_blank');
          }}
          deleteHandler={async () => {
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
              headers: {
                "token" : localStorage.getItem("token")
              },
              data:{
                _id: content._id
              }
            })
            refresh()
            trigger()
          }}
          onContextClick={() => {
            setSelectedContent(content);
            setContextModalOpen(true);
          }}
        />)}
      </div>
    </div>
    </div>
  )
}
