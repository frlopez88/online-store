import React, { useState, useEffect } from 'react'
import { Card } from '../components/Card'

export const Drinks = () => {

  const [drinks, setDrinks] = useState([]);


  const getDrinks = async () => {

    const url = import.meta.env.VITE_SUPABASE_URL + 'products?category=eq.Drinks';
    const token = import.meta.env.VITE_TOKEN;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'apikey': token
      }
    })

    const data = await response.json();

    setDrinks(data)

  }

  useEffect(() => {
    getDrinks()


  }, [])

  return (
    <>

      {drinks.map((item) => (

        <Card  key={item.id} name={item.name} price={item.price} />

      ))}


    </>
  )
}
