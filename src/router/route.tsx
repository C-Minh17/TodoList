import App from "../App";
import HomeTodoList from "../page/home";
import Login from "../page/sign-in";

export const elementRoute = [
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index:true,
        element:<HomeTodoList/>
      },
      {
        path:"/login",
        element:<Login/>,
      }
    ]
  }
]