import { Button, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import { useStoreUser } from './stores';
import { LogoutOutlined } from '@ant-design/icons';

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = Cookies.get("token")
  const navigate = useNavigate()

  const successIn = () => {
    messageApi.open({
      type: 'success',
      content: 'Đăng nhập thành công',
    });
  };
  const successUp = () => {
    messageApi.open({
      type: 'success',
      content: 'Đăng kí thành công',
    });
  };

  const logOut = () => {
    useStoreUser.persist.clearStorage()
    Cookies.remove("token")
    setIsModalOpen(false);
    navigate("/login")
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!token){
      navigate("/login")
    }
  },[])

  return (
    <>
      {contextHolder}
      <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={logOut}
        onCancel={handleCancel}
      >
        <div style={{textAlign:"center"}}>
          <p style={{fontSize:"30px"}}><LogoutOutlined /></p>
          <h3>Bạn có chắc chắn muốn đăng xuất</h3>
        </div>
      </Modal>
      <div style={{  
        textAlign:"right",
        margin:"15px"
      }}>
        {token ? <Button onClick={() => setIsModalOpen(true)}>Đăng xuất</Button> : <></>}
      </div>
      <Outlet context={{ successIn , successUp }}/>
    </>
  )
}

export default App
