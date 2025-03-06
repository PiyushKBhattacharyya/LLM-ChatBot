import { Link } from 'react-router-dom'
import './chatList.css'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`).then((res) =>
        res.json(),
      ),
  })

  return (
    <div className='chatList'>
        <span className='title'>DASHBOARD</span>
        <Link to='/dashboard'>Create a New Chat</Link>
        <hr />
        <span className='title'>RECENT CHATS</span>
        <div className="list">
            {isPending 
            ? "Loading..." 
            : error 
            ? "Something Went Wrong" 
            : data.map(chat=>(
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}></Link>
            ))}
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