import React, { useEffect, useState } from 'react'

export const ChatBotForm = () => {

    const [messages, setMessages] = useState([])
    let question = "";

    const onChangeQuestion = (event) => {

        question = event.target.value;

    }

    const [loading , setLoading] = useState(false)

    const onSubmitForm = async () => {

        const url = import.meta.env.VITE_GEMINI_URL;
        const token = import.meta.env.VITE_GEMINI_KEY;

        const history = messages.concat();

        history.push({ role: "user", text: question })

        setMessages(history)

        const contents = {
            parts: [{ text: question }]
        }

        event.preventDefault();

        setLoading(true)

        const result = await fetch(url, {
            method: "POST",
            headers: {
                'x-goog-api-key': token
            },
            body: JSON.stringify(
                { contents: contents }
            )
        })

        const data = await result.json();

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
                            <p key={i} className={ item.role == "model" ? "text-success": "text-dark" }  > {item.text} </p>

                        ))
                    }

                </div>
                
                { loading ? <p> Loading ... </p> : <></> }

                <div className="mb-3">
                    <input type="text" className="form-control" onChange={onChangeQuestion}
                        placeholder="Ask your question" />
                </div>
                <button className='btn btn-success'>Send</button>
            </form>
        </>
    )
}
