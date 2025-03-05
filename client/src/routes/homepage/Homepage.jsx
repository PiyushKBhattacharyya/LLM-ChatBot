import { Link } from 'react-router-dom'
import './homepage.css'

const Homepage = () => {
  return (
    <div className='homepage'>
      <div className="main">
        <h1>LLM Chat-Bot</h1>
        <h2>Chat with our LLM chat-bot and explore the possibilities of AI!</h2>
        <Link to='/dashboard'>Get Started</Link>
      </div>
    </div>
  )
}

export default Homepage