import './signInPage.css'
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className='SignInPage'>
      <SignIn path="/sign-in" signInUrl="/sign-up"/>
    </div>
  )
}

export default SignInPage