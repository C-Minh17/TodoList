import { useState } from "react"
import SignIn from "./components/signIn"
import SignUp from "./components/signUp"
import { useOutletContext } from "react-router-dom";

type MessageLogin = {
  successIn: () => void;
  successUp: () => void;
}
function Login(){
  const [status ,setStatus] = useState<boolean>(true)
  const outletContext = useOutletContext<MessageLogin>()
  const successIn = outletContext?.successIn
  const successUp = outletContext?.successUp
  return (
    <>
      <div className="login">
        {status ?
          <SignIn setStatus={setStatus} success={successIn}/>
        :
          <SignUp setStatus={setStatus} success={successUp}/>
        }
      </div>
    </>
  )
}

export default Login