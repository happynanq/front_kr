import { Space, Divider , Typography, Button } from "antd";
import { useOrder } from "../../context/order-context"
import { useApp } from "../../context/app-context";

export default function ResponseOrder({fetchRes, setModal}){ 
  const {asset} = useApp()
  console.log("fetchRes", asset);
  function onSendReq(){
    // some async 
    
    setModal(false)
  }
  if(Object.keys(asset) == 0){
    return <></>
}
  return (
    <>
      <Space>
        <Typography.Text>
          smeta: {asset.smeta}
        </Typography.Text>
      </Space>
      <Divider/> 
      <Space>
        <Typography.Text>
          DRONE: {asset.drone_model.map((a, i)=><div key={i}><Typography.Text>{a.name}, {a.cnt}, {a.price_one} $</Typography.Text></div> )}
        </Typography.Text>
      </Space>
      <Divider/> 
      <Space>
        <Typography.Text>
        DRONE: {asset.additional.map((a, i)=><div><Typography.Text>{a.name}, {a.cnt}, {a.price_one} $</Typography.Text></div> )}

        </Typography.Text>
      </Space>
      <Divider/> 
      <Space>
        <Typography.Text>
          recomendation: {asset.recommendation}
        </Typography.Text>
      </Space>
      <Divider/>
      <Button type="primary" onClick={onSendReq}>
        Отправить заказ
      </Button>
    </>
    
  )
}