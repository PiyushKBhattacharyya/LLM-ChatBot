import { Link, Outlet } from 'react-router-dom'
import './rootLayout.css'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className='rootLayout'>
          <header>
              <Link to='/'>
                  <span>LLM ChatBot</span>
              </Link>
              <div className="user">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
          </header>
          <main>
              <Outlet/>
          </main>
      </div>
    </ClerkProvider>
  )
}

export default RootLayout