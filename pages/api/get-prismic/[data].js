import { createClient } from '../../../prismicio'

export default async (req, res) => {
    const { data } = req.query
    const body = req.body

    if(body && body.type){
      const client = createClient({ req })
      const response = {data: {}}

      switch (body.type) {
        case "MULTI":
          response.data = await client.getAllByType(data, {
            orderings: {
              field: 'my.legalPage.order',
              direction: 'asc',
            }})
            
            response.data = response.data.map(d => {
              return {uid : d.uid, data: d.data}
            })
          break;
        case "SINGLE":
          response.data = await client.getSingle(data)  
          break;      
        default:
          break;
      }

      return res.status(200).json({status: "success", data:  response.data})

    }else{
      return res.status(200).json({status: "success", message: "no data"})
    }
  
    
}