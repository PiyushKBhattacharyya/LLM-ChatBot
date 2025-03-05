import { useEffect, useRef } from 'react'
import './newPrompt.css'

const NewPrompt = () => {
    const endRef = useRef(null)
    useEffect(() => {
      endRef.current.scrollIntoView(
        {
          behavior: 'smooth',
        }
      )
    }, [])
  return (
    <>
        <div className="newForm">
            <label htmlFor='file'>
                <img src='/attachment.png' alt='' />
            </label>
            <input id='file' type="file" multiple={false} hidden />
            <input type='text' placeholder='Ask Me Anyting!' /> 
            <button>
                <img src='/arrow.png' alt='' />
            </button>

            <div ref={endRef} />
        </div>
    </>
  )
}

export default NewPrompt