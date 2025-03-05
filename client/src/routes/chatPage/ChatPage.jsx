import { useRef } from 'react'
import './chatPage.css'
import { useEffect } from 'react'
import NewPrompt from '../../components/newPrompt/newPrompt'

const ChatPage = () => {


  return (
    <div className='chatPage'>
      <div className="wrapper">
        <div className="chat">
          <NewPrompt />
        </div>
      </div>
    </div>
  )
}

export default ChatPage