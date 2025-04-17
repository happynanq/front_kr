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
  Modal
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
  const {setOrder, setLodaing} = useApp()

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
    setFetchRes({
      "smeta": 1000000,
      "drone_model": [
          {
              "name": "P10",
              "cnt": 10,
              "price_one": 123
          },
          {
              "name": "A32-ultra",
              "cnt": 2,
              "price_one": 10000
          }
      ],
      "additional": [
          {
              "name": "Расширитель ХХХ",
              "cnt": 2,
              "price_one": 100
          },
          {
              "name": "Расширитель бочка",
              "cnt": 2,
              "price_one": 100
          }
      ],
      "recommendation": "prompt.prompt"
    })

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
          I have read the <Link onClick={()=>console.log("qew")}>agreement</Link>
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

    <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
      <ResponseOrder fetchRes = {fetchRes} setModal={setModal} />
      </Modal >


    </>
  );
};
export default FormProduct;
