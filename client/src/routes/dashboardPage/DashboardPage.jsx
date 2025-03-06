import './dashboardPage.css'
import { useAuth } from "@clerk/clerk-react";

const DashboardPage = () => {
  const { userId } = useAuth()

  const handleSubmit = async (e)=> {
    e.preventDefault();

    const text = e.target.text.value
    if(!text) return;

    await fetch("http://localhost:3000/api/chats", {
      method: "POST",
      credentials:"include",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, text })
    })
  }
  return (
    <div className='dashboardPage'>
      <div className="texts">
        <h1>LLM Chat-Bot</h1>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input name='text' type='text' placeholder='Ask Me Anything!' />
          <button>
            <img src='/arrow.png' alt = '' />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage