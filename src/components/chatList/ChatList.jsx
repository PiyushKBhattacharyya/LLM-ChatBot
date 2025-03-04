import { Link } from 'react-router-dom'
import './chatList.css'

const ChatList = () => {
  return (
    <div className='chatList'>
        <span className='title'>DASHBOARD</span>
        <Link to='/dashboard'>Create a New Chat</Link>
        <hr/>
        <span className='title'>RECENT CHATS</span>
        <div className='list'>
            <Link to="/">Chat Title</Link>
            
        </div>
        <hr/>
    </div>
  )
}

export default ChatList