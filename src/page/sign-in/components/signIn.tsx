import { Button, Col, Form, Input, message, Row } from "antd"
import "../login.scss"
import type React from "react";
import { useEffect, useState } from "react";
import { getUsers } from "../../../util/axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { useStoreUser } from '../../../stores/index'


type PropIn = {
  setStatus : React.Dispatch<React.SetStateAction<boolean>>,
  success : () => void
}

function SignIn({ setStatus , success } : PropIn){
  const [form] = Form.useForm<IUserLogin>();
  const [dataUser , setDataUser] = useState<IUserLogin[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  const { setUser } = useStoreUser()
  const navigate = useNavigate()

  const signInFail = () => {
    messageApi.open({
      type: 'error',
      content: 'Tài khoản và mật khẩu không chính xác',
    });
  };

  const checkSignIn = (userIn:IUserLogin) => {
    const check = dataUser.filter(item => item?.email === userIn?.email && item?.password === userIn?.password)
    return check[0]
  }
  const onFinish = (e : IUserLogin) => {
    try {
      if (checkSignIn(e)){
        const user = checkSignIn(e)
        Cookies.set('token', `${user.token}`, { expires: 1 })
        setUser(user)
        navigate("/")
        success()
      }else{
        signInFail()
      }
    }catch (er) {
      console.log(er)
    }
  }

  useEffect(() => {
    getUsers().then(res => setDataUser(res.data))
  },[])

  return (
    <>
      {contextHolder}
      <div className="login--sign">
        <h2>Sign In</h2>
        <Form
          form={form} 
          layout='vertical'
          name="SignIn"
          style={{ maxWidth: 400 }}
          onFinish={onFinish}
        >
          <Row>
            <Col sm={24}>
              <Form.Item<IUserLogin>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item<IUserLogin>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item>
                <Button htmlType="submit" style={{ width: '100%' }} type="primary">Sign in</Button>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item>
                <Button style={{ width: '100%' }} onClick={()=>{setStatus(false)}}>Sign up</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}

export default SignIn