export async function fetchResult(body){ 
  let url = "http://192.168.1.123:8000/init/router"
    
  let res = await fetch(url, {
    method:"POST", 
    body:body
  }).then(e=>{
    console.log("res: ", e)
  })

  const data = { 
    smeta:1000000, 
    drone_model:[
      {name:"P10", cnt:10, price_one:123},
      {name:"A32-ultra", cnt:2, price_one:10000},
    ], 
    additional:[
      {name:"Расширитель ХХХ", cnt:2, price_one:100},
      {name:"Расширитель бочка", cnt:2, price_one:100},
    ], 
    recomendation:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima facere pariatur voluptate dolorem quo cumque mollitia ad, ipsam nihil excepturi at atque eaque nisi minus tempora? Distinctio voluptatem suscipit dignissimos."
  }

  return new Promise(res=>{
    setTimeout(()=>{res(data)}, 1)
  })

}