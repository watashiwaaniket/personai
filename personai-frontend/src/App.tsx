// import { Dashboard } from "./pages/dashboard"
import { Dashboard } from "./pages/dashboard"
import { Landing } from "./pages/Landing"
import { ShareView } from "./pages/ShareView"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareId" element={<ShareView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App