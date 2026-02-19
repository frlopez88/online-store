import React, { useState, useEffect } from 'react'
import { Card } from '../components/Card'

export const Sports = () => {

  const [sports, setSports] = useState([])

  const getSports = async () => {

    const url = import.meta.env.VITE_SUPABASE_URL + 'products?category=eq.Sports';
    const token = import.meta.env.VITE_TOKEN;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'apikey': token
      }
    })

    const data = await response.json();

    setSports(data)

  }

  // on load - event that is triggered the first time the component
  // is presented in the screen.
  useEffect(() => {

    getSports()


  }, [])

  return (
    <>
      { sports.map( (item)=>(
        <Card key={item.id} name={item.name} price = {item.price} />

      )) }
    
    </>
  )
}
