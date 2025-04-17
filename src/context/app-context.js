import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetchData, url_set } from "../utils/utils";
// import { fakeFetchAssets, fakeFetchCryptro } from "../api";


const AppContext = createContext({
    asset:[],
    order:[],
    loading:[],
})

export function AppContextProvider({children}){
  const [loading, setLodaing] = useState(false)
  const [order, setOrder] = useState({}) // ! тут я храню текущий ордер
  const [asset, setAsset] = useState({}) // ! тут мне надо получит только ассет с сервера от моего запроса(он уже идет от ордера)



  useEffect(()=>{
    async function prom(){
      let res = await fetch(url_set, {
        method:"POST", 
        body:JSON.stringify(order), 
        headers: {
          "Content-Type": "application/json",
        },
      }).then((e)=>{
        async function f() {
          let x = await e.json()
          return x
        }
        
        return f()
      })
      setAsset(res) // ! SET ASSET FOR ORDER
    }
    function fakeFetch(){
      return new Promise(res=>{
        setTimeout(()=>{
          res(fakeFetchData)
        }, 100)
      })
    }
    async function preload() {
      const as = await fakeFetch()
      
      setAsset(as)
    }
    if(Object.keys(order) != 0){
      setLodaing(true)

      console.log("FETCH ORDER", order)
      preload()
      // prom()
      //!!! prom()
      
    }
    setLodaing(false)
  }, [order])

  async function sendAndGetOrder(url) {
    setLodaing(true)

  }


  

  return <AppContext.Provider value = {{loading, crypto, asset, sendAndGetOrder, setOrder, setLodaing}}>
      
      {children}
  </AppContext.Provider>
}

export default AppContext

export function useApp(){
  return useContext(AppContext)
}