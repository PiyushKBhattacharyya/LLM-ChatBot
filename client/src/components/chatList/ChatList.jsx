import { Link } from 'react-router-dom'
import './chatList.css'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });


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
            ? "Something went wrong!"
            : data?.map((chat) => (
                <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                  {chat.title}
                </Link>
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