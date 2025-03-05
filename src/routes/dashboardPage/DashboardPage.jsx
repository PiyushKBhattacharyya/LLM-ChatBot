import './dashboardPage.css'

const DashboardPage = () => {
  return (
    <div className='dashboardPage'>
      <div className="texts">
        <h1>LLM Chat-Bot</h1>
      </div>
      <div className="formContainer">
        <form>
          <input type='text' placeholder='Ask Me Anything!' />
          <button>
            <img src='/arrow.png' alt = '' />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage