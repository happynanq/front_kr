import { createContext, useContext, useEffect, useState } from "react";
import { fetchResult } from "../api/api_req.js";


const OrderContext = createContext({
  order:{}, 
})

export function OrderContextProvider({children}){
  const [loading, setLodaing] = useState(false)
  const [order, setOrder] = useState({})
  


  useEffect(()=>{

    async function preload() {
      setLodaing(true)
      const result = await fetchResult()

      setOrder(result)
      console.log(result)
      setLodaing(false)

    }
    console.log(order);
    
    preload()
  }, [])


  return(
    <OrderContext.Provider value={{loading, order}}>
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext

export function useOrder(){
  return useContext(OrderContext)
}