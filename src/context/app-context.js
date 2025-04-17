import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetchData, url_set } from "../utils/utils";
// import { fakeFetchAssets, fakeFetchCryptro } from "../api";


const AppContext = createContext({
    asset:[],
    order:[],
    loading:[],
})

export function AppContextProvider({children}){
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState({}) // ! тут я храню текущий ордер
  const [asset, setAsset] = useState({}) // ! тут мне надо получит только ассет с сервера от моего запроса(он уже идет от ордера)
  const [modalLoad, setModalLoad] = useState(true)


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
        }, 4000)
      })
    }
    async function preload() {
      setLoading(true)

      const as = await fakeFetch()
      
      setAsset(as)
      console.log("ASSET AS ", as)
      setModalLoad(false)
      setLoading(false)

    }

    if(Object.keys(order) != 0){

      console.log("FETCH ORDER", order)
      preload()
      console.log("FETCH ORDER 2", order)

      // prom()
      //!!! prom()
      
    }
  }, [order])

  async function sendAndGetOrder(url) {
    setLoading(true)

  }


  

  return <AppContext.Provider value = {{loading, crypto, asset, sendAndGetOrder, setOrder, setLoading, modalLoad, setModalLoad}}>
      
      {children}
  </AppContext.Provider>
}

export default AppContext

export function useApp(){
  return useContext(AppContext)
}