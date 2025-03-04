import { SignUp } from '@clerk/clerk-react'
import './signUpPage.css'

const SignUpPage = () => {
  return (
    <div className='SignUpPage'>
      <SignUp 
      path="/sign-up" 
      signInUrl="sign-in"
      forceRedirectUrl="/dashboard"
      />
    </div>
  )
}

export default SignUpPage