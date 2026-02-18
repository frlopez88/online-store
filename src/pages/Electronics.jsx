import React , {useState, useEffect, useEffectEvent} from 'react'
import { Card } from '../components/Card'
export const Electronics = () => {

  const [electronics , setElectronics] = useState([])

  const getElectronics = async () => {

    const url = import.meta.env.VITE_SUPABASE_URL + 'products?category=eq.Electronics';
    const token = import.meta.env.VITE_TOKEN;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'apikey': token
      }
    })

    const data = await response.json();

    setElectronics(data)

  }

  useEffect(()=>{

    getElectronics()


  }, [])

  return (
    <>
      { electronics.map( (item)=>(

        <Card key={item.id} name={item.name} price = {item.price} />

      ) ) }
    </>
  )
}
