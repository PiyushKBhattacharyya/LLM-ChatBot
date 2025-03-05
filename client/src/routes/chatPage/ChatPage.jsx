import { useRef } from 'react'
import './chatPage.css'
import { useEffect } from 'react'
import NewPrompt from '../../components/newPrompt/newPrompt'

const ChatPage = () => {


  return (
    <div className='chatPage'>
      <div className="wrapper">
        <div className="chat">
          <div className="message">Message</div>
          <div className="message user">Message from user</div>
          <div className="message">Message</div>
          

          <NewPrompt />
        </div>
      </div>
    </div>
  )
}

export default ChatPage