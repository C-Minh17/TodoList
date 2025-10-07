import axios from "axios"
const url : string = "https://obljstonhvmppxfvzqsw.supabase.co/rest/v1/"
const apiKey:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ibGpzdG9uaHZtcHB4ZnZ6cXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMTAwNTcsImV4cCI6MjA3NDg4NjA1N30.rjzvjogk1wGoEPndOCXmBW2IHB45vgLFCRPGjzfI6y4"
export const getUsers = async () => {
  const res = await axios.get<IUserLogin[]>(`${url}users`,{
    headers:{
      apikey:apiKey,
      Authorization:`Bearer ${apiKey}`,
      "Content-Type":"application/json"
    }    
  })
  return res
}

export const postUser = async (data:IUserLogin) => {
  const res = await axios.post<IUserLogin>(`${url}users`,data,{
    headers:{
      apikey:apiKey,
      Authorization:`Bearer ${apiKey}`,
      "Content-Type":"application/json",
    },
  })

  return res.data
}

export const getTodo = async () => {
  const res = await axios.get<ITodo[]>(`${url}todo`,{
    headers:{
      apikey:apiKey,
      Authorization:`Bearer ${apiKey}`,
      "Content-Type":"application/json"
    }
  })
  return res
}

export const postTodo = async (data:ITodo) => {
  const res = await axios.post<ITodo>(`${url}todo`,data,{
    headers:{
      apikey:apiKey,
      Authorization:`Bearer ${apiKey}`,
      "Content-Type":"application/json"
    }
  })
  return res
}

export const patchTodo = async (data:ITodo , id?:number) => {
  const res = await axios.patch<ITodo>(`${url}todo`,data,{
    headers:{
      apikey:apiKey,
      Authorization:`Bearer ${apiKey}`,
      "Content-Type":"application/json"
    },
    params: {
      id: `eq.${id}`,
    },
  })
  return res
}

export const deleteTodo = async (id?:number) => {
  const res = await axios.delete(`${url}todo`,{
    headers:{
      apikey:apiKey,
      Authorization:`Bearer ${apiKey}`,
      "Content-Type":"application/json"
    },
    params: {
      id: `eq.${id}`,
    },
  })
  return res
}

