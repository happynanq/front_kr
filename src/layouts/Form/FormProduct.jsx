import React, { useState } from "react";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Upload,
  Select,
  Modal,
  Typography
} from "antd";
import Link from "antd/es/typography/Link";
import ResponseOrder from "./ResponseOrder";
import { useApp } from "../../context/app-context";
const { Option } = Select;

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e === null || e === void 0 ? void 0 : e.fileList;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const FormProduct = () => {
  const [form] = Form.useForm();
  const [modal, setModal] = useState(false)
  const [fetchRes, setFetchRes] = useState([])
  const {setOrder, loading, modalLoad, setModalLoad} = useApp()
  const [modalAgree, setModalAgree] = useState(false)

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    let ord = {
      ...values, 
      file_name:values.dragger.map(e=>e.name), 
      drag_file: ["bytes", "bytes"] //!!!!
    }
    delete ord.agreement
    delete ord.dragger
    setOrder(()=>ord)
    setModal(()=>true)
    

    async function prom() {
      let url = "http://192.168.1.123:8000/init/router"
      const bd = {
        ...values, 
        file_name:values.dragger.map(e=>e.name), 
        drag_file: ["bytes", "bytes"] //!!!!
      }
      delete bd.agreement
      delete bd.dragger
      console.log("str ", JSON.stringify(bd));
      
      console.log("BD : ", bd)
      let res = await fetch(url, {
        method:"POST", 
        body:JSON.stringify(bd), 
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((e)=>{
        async function f() {
          let x = await e.json()
          return x
          
        }
        
        return f()
        // console.log("res: ", JSON.parse(e))
      })
      
      console.log("RESULT ", res);
      setFetchRes(res)
    }
    // prom()
    // ! FETCH VALUES HERE
  };
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <>
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <Form layout="vertical" 
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      
      // layout="vertical"
      // scrollToFirstError
      
      >
      <Form.Item
        name="name"
        label="Имя"
        // ! rules = {[{required:true, message:"Это поле должно быть заполнено!"}]}
        // tooltip="Ваше имя необходимо для заполнения заявки"
        // rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        // ! rules={[{ required:   true, message: "Please input your phone number!" }]}
        >
        <Input  style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        // rules={[
        //   {
        //     type: "email",
        //     message: "The input is not valid E-mail!",
        //   },
        //   {
        //     required: true,
        //     message: "Please input your E-mail!",
        //   },
        // ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="dron_usage"
        label="Для каких задач вам нужен дрон?"
        // rules={[{ required: true, message: "Please input Intro" }]}
      >
        <Input.TextArea showCount  />
      </Form.Item>

      <Form.Item
        name="dron_location"
        label="Планируемые локации использования дрона?"
        // rules={[{ required: true, message: "Please input Intro" }]}
      >
        <Input.TextArea showCount  />
      </Form.Item>


      <Form.Item
        name="dron_realtime"
        label="Вас интересует работа в реальном времени или вас интересует запись какой-то информации?"
        // rules={[{ required: true, message: "Please input Intro" }]}
      >
        <Input.TextArea showCount  />
      </Form.Item>

      <Form.Item
        name="dron_asset"
        label="Какие характеристики для вас важны: время полёта, дальность, грузоподъёмность, тип камеры?"
        // rules={[{ required: true, message: "Please input Intro" }]}
      >
        <Input.TextArea showCount  />
      </Form.Item>


      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              // value
              true
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
        Принимаю условия  
          <Button color="primary" variant="link" onClick = {()=>{setModalAgree(true)}}>
          Соглашения
          </Button>
          на обработку персональных данных 
        </Checkbox>
      </Form.Item>


      <Form.Item label="Dragger">
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Отправить заказ
        </Button>
      </Form.Item>
      </Form>
    </div>

    <Modal open={!modalLoad} onCancel={() => setModalLoad(true)} footer={null}>
      <ResponseOrder fetchRes = {fetchRes} setModal={setModal} />
      </Modal >

      <Modal open={modalAgree} onCancel={() => setModalAgree(false)} footer={null}>
      <Typography>
        <Typography.Text>Настоящим в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.07.2006 года Вы подтверждаете свое согласие на обработку ООО НПП «Автономные аэрокосмические системы-ГеоСервис» Ваших персональных данных: сбор, систематизацию, накопление, хранение, уточнение (обновление, изменение), использование, блокирование, обезличивание, уничтожение.</Typography.Text>
        </Typography>
        <Typography>
        <Typography.Text>ООО НПП «Автономные аэрокосмические системы-ГеоСервис», гарантирует конфиденциальность получаемой нами информации. Обработка персональных данных осуществляется в целях эффективной обработки запросов, исполнения заказов, договоров и иных обязательств, принятых нашей компанией в качестве обязательных к исполнению перед Вами.</Typography.Text>
        </Typography>
        <Typography>
        <Typography.Text>Настоящее согласие распространяется на следующие Ваши персональные данные:</Typography.Text>
        </Typography>
        <Typography>
          <ul>
            <li>фамилия, имя и отчество;</li>
            <li>адрес электронной почты;</li>
            <li>контактный телефон;</li>
            <li>платёжные реквизиты.</li>
          </ul>
        </Typography>
        
        <Typography>
        <Typography.Text>Срок действия Вашего согласия является неограниченным, однако, Вы вправе в любой момент отозвать настоящее согласие, путём направления письменного уведомления на адрес: 660079, г. Красноярск, ул. Электриков, 156/1, ООО НПП «АВАКС-ГеоСервис», с пометкой «отзыв согласия на обработку персональных данных». Обращаем Ваше внимание, что отзыв Вашего согласия на обработку персональных данных влечёт за собой уничтожение записей, содержащих Ваши персональные данные, в системах обработки персональных данных ООО НПП «Автономные аэрокосмические системы-ГеоСервис», что может сделать невозможным пользование сервисами нашей компании.</Typography.Text>
        </Typography>
      </Modal >


    </>
  );
};
export default FormProduct;
