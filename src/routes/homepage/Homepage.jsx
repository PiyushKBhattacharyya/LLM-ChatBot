import { Link } from 'react-router-dom'
import './homepage.css'

const Homepage = () => {
  return (
    <div className='Homepage'>
      <h1>LLM ChatBot</h1>
      <Link to='/dashboard'>Get Started</Link>
    </div>
  )
}

export default Homepage