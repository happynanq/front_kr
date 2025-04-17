import { Space, Divider , Typography, Button } from "antd";
import { useOrder } from "../../context/order-context"
import { useApp } from "../../context/app-context";
import { useEffect } from "react";

export default function ResponseOrder({fetchRes, setModal}){ 
  const {asset} = useApp()
  useEffect(()=>{
    console.log("fetchRes", asset);

  })
  function onSendReq(){
    // some async 
    
    setModal(false)
  }
//   if(Object.keys(asset) == 0){
//     return <></>
// }
  return (
    <>
      <Typography>
        <Typography.Text>
        <Typography.Title level={5} > Смета: </Typography.Title>  <Typography.Text type='success'>{asset.smeta}</Typography.Text> ₽
        </Typography.Text>
      </Typography>
      <Divider/> 

      <Typography>
        <Typography.Text>
        <Typography.Title level={5} >Дроны: </Typography.Title> {asset.drone_model.map((a, i)=><div key={i}> <Typography.Text strong > {a.name} </Typography.Text> , {a.cnt} шт, {a.price_one} ₽</div> )}
        </Typography.Text>
      </Typography>
      <Divider/> 
      <Typography>
        <Typography.Text>
        <Typography.Title level={5} >Комплектующие:</Typography.Title> {asset.additional.map((a, i)=><div key={i}><Typography.Text strong>{a.name} </Typography.Text>, {a.cnt} шт, {a.price_one} ₽</div> )}

        </Typography.Text>
      </Typography>
      <Typography/> 
      <Divider/> 

      <Typography>
        <Typography.Text>
        <Typography.Title level={5} >Рекомендация: </Typography.Title> {asset.recomendation}
        </Typography.Text>
      </Typography>
      <Divider/>
      {/* <Button type="primary" onClick={onSendReq}>
        Отправить заказ
      </Button> */}
    </>
    
  )
}