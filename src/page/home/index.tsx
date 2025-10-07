import { Button, Form, Input, message, Modal, Popconfirm, Tag } from "antd"
import { useStoreUser } from "../../stores"
import "./home.scss"
import { CheckOutlined, CloseOutlined, EditOutlined , MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { deleteTodo, getTodo, patchTodo, postTodo } from "../../util/axios"
import { useForm } from "antd/es/form/Form"

function HomeTodoList(){
  const {user} = useStoreUser()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataTodo , setDataTodo] = useState<ITodo[]>([])
  const [dataInput , setDataInput] = useState<string>("")
  const [isReload , setIsReload] = useState<boolean>(true)
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm()

  const successAdd = () => {
    messageApi.open({
      type: 'success',
      content: 'Đã thêm việc làm vào danh sách',
    });
  };
  const successChange = () => {
    messageApi.open({
      type: 'success',
      content: 'Sửa thành công',
    });
  };
  const successDelete = () => {
    messageApi.open({
      type: 'success',
      content: 'Xóa thành công',
    });
  };

  const confirmFinish = async (e:ITodo) => {
    await patchTodo(e,e.id)
    successChange()
    setIsReload(!isReload)
  };
  const confirmDelete = async (e?:number) => {
    await deleteTodo(e)
    successDelete()
    setIsReload(!isReload)
  };

  const showModal = (input:ITodo) => {
    form.setFieldsValue(input)
    setIsModalOpen(true);
  };
  const changeTodo = async (e:ITodo) => {
    await patchTodo(e,e.id)
    successChange()
    setIsModalOpen(false);
    setIsReload(!isReload)
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addTodo = async () => {
    const dataTodo:ITodo = {
      nameWork:dataInput,
      status:false,
      idUser:user.id,
    }
    await postTodo(dataTodo)
    successAdd()
    setIsReload(!isReload)
    setDataInput("")
  }

  useEffect(() => {
    getTodo().then(res => setDataTodo(res.data.filter(item => item.idUser === user.id)))
  },[isReload])

  return (
    <>
      {contextHolder}
      <Modal
        title="Sửa công việc"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="changeTodo" onFinish={changeTodo}>
          <Form.Item<ITodo> style={{marginTop:30}} name="nameWork">
            <Input />
          </Form.Item>
          <Form.Item<ITodo> name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">Lưu</Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="title">
        <h1>Xin chào {user?.userName}</h1>
        <h2>hãy bắt đầu quản lý công việc của mình nào !!</h2>
      </div>
      <div className="createTodo">
        <Input value={dataInput} onChange={(e)=>{setDataInput(e.target.value)}} size="large" placeholder="Hãy nhập công việc của bạn nào !"/>
        <Button onClick={addTodo} size="large" icon={<PlusOutlined />}></Button>
      </div>
      <p>---------- Danh sách việc làm ----------</p>
      <div className="listTodo">
        {dataTodo.map(item => (
            <Tag key={item.id} className="listTodo--todo" color={item.status ? "green" : ""} style={item.status ? {textDecoration:"line-through"} : {}}>
              <p>{item.nameWork}</p>
              <div className="listTodo--todo__act">
                <Popconfirm
                  title={item.status ? "Hủy đánh dấu hoàn thành công việc" : "Đánh dấu hoàn thành công việc"}
                  onConfirm={() => {confirmFinish({status:!item.status , id:item.id})}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button style={item.status ? {backgroundColor:"gold"} : {backgroundColor:"#87d068"}}>{item.status ? <MinusOutlined /> : <CheckOutlined />}</Button>
                </Popconfirm>
                <Popconfirm
                  title="Bạn có muốn xóa công việc này không"
                  onConfirm={()=> {confirmDelete(item.id)}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button style={{backgroundColor:"#f50"}}><CloseOutlined /></Button>
                </Popconfirm>
                <Button style={{backgroundColor:"#108ee9"}} onClick={() => {showModal({nameWork:item.nameWork ,id:item.id})}}><EditOutlined /></Button>
              </div>
            </Tag>
        ))}
      </div>
    </>
  )
}

export default HomeTodoList

