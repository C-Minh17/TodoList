import { Button, Col, Form, Input, InputNumber, message, Row } from "antd"
import "../login.scss"
import type React from "react";
import { getUsers, postUser } from "../../../util/axios";
import { useEffect, useState } from "react";


type PropUp = {
  setStatus : React.Dispatch<React.SetStateAction<boolean>>,
  success : () => void
}


function SignUp({ setStatus , success } : PropUp){
  const [form] = Form.useForm()
  const [dataUser , setDataUser ] = useState<IUserLogin[]>([])
  const [messageApi, contextHolder] = message.useMessage();

  const signUpFail = () => {
    messageApi.open({
      type: 'error',
      content: 'Thông tin email , userName hoặc phone đã tồn tại',
    });
  };

  const onFinish = async (e : IUserLogin) => {
    try {
      if (!checkSignUp(e)){
        await postUser({...e,token:crypto.randomUUID()})
        success()
        setStatus(true)
      }else{
        signUpFail()
      }
    }catch (er) {
      console.log(er)
    }
  }

  const checkSignUp = (userNew:IUserLogin):boolean => {
    const check:boolean = dataUser.some(item => userNew?.phone === item?.phone || userNew?.email === item?.email || userNew?.userName === item?.userName)
    return check
  }

  useEffect(()=>{
    getUsers().then(res => setDataUser(res.data))
  },[])

  return (
    <>
      {contextHolder}
      <div className="login--sign">
        <h2>Sign Up</h2>
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
                label="Username"
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input/>
              </Form.Item>
            </Col>
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
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
              >
                <InputNumber controls={false} style={{ width: '100%' }}/>
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
                <Button htmlType="submit" style={{ width: '100%' }} type="primary">Sign up</Button>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item>
                <Button style={{ width: '100%' }} onClick={()=>{setStatus(true)}}>Sign in</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}

export default SignUp