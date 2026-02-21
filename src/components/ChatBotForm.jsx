import React, { useEffect, useState } from 'react'

export const ChatBotForm = () => {

    const  [products , setProducts] = useState("");
    const getProductList = async () => {

        const url = import.meta.env.VITE_SUPABASE_URL + 'products';
        const token = import.meta.env.VITE_TOKEN;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'apikey': token
            }
        })

        const data = await response.json();
        let prods=""
        for (let i =0; i< data.length; i++){
            prods += `[${i+1}) ${data[i].name} - $ ${data[i].price}]`
        }


        setProducts(prods)
        

    }

    useEffect(()=>{
        getProductList()
    }, [])

    const [messages, setMessages] = useState([])
    let question = "";

    const onChangeQuestion = (event) => {

        question = event.target.value;

    }



    const [loading, setLoading] = useState(false);

    const instructions = `
    You are going be a helpfull assintant in my online store
    
    The product list is:

    ${products}

    You are going to take the order products and the request to our staff. 

    Always confirm the order

    When the order is confirmed say Good Bye, and give a summary of the total!

    Format Rule: Only respond in plain text. Don't use any format like HTML or Mark Down. Don't use Bold or Italic fonts. 

    You can use emojis.

    
    `

    console.log(instructions)

    const onSubmitForm = async () => {

        const url = import.meta.env.VITE_GEMINI_URL;
        const token = import.meta.env.VITE_GEMINI_KEY;

        const history = messages.concat();

        history.push({ role: "user", text: question })

        setMessages(history)

        //const contents = {
        //    parts: [{ text: question }]
        //}

        event.preventDefault();

        setLoading(true)

        // History Context to the AI

        const apiHistory = history.map(item => ({
            role: item.role,
            parts: [{ text: item.text }]
        }))

        console.log(apiHistory)

        const result = await fetch(url, {
            method: "POST",
            headers: {
                'x-goog-api-key': token
            },
            body: JSON.stringify(
                {
                    system_instruction: { parts: [{ text: instructions }] },
                    contents: apiHistory
                }
            )
        })

        const data = await result.json();
        console.log(data)

        const answer = data.candidates[0].content.parts[0].text;
        console.log(answer)
        const response = { role: "model", text: answer };

        history.push(response);

        setMessages(history)

        setLoading(false)

    }

    return (
        <>
            <form onSubmit={onSubmitForm}>
                <label>Chat History</label>
                <div className='mt-3 mb-3 border rounded-3'>
                    {
                        messages.map((item, i) => (
                            <p key={i} className={item.role == "model" ? "text-success" : "text-dark"}  > {item.text} </p>

                        ))
                    }

                </div>

                {loading ? <p> Loading ... </p> : <></>}

                <div className="mb-3">
                    <input type="text" className="form-control" onChange={onChangeQuestion}
                        placeholder="Ask your question" />
                </div>
                <button className='btn btn-success'>Send</button>
            </form>
        </>
    )
}
