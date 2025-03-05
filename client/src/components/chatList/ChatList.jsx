import { Link } from 'react-router-dom'
import './chatList.css'

const ChatList = () => {
  return (
    <div className='chatList'>
        <span className='title'>DASHBOARD</span>
        <Link to='/dashboard'>Create a New Chat</Link>
        <hr />
        <span className='title'>RECENT CHATS</span>
        <div className="list">
            
        </div>
        <hr />
        <div className="footer">
            <span>Created By Piyush K. Bhattacharyya</span>
            <span>Home Assignment: Sarvam AI</span>
        </div>
    </div>
  )
}

export default ChatList