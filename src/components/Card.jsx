import React from 'react'

export const Card = ({name, price}) => {
    return (
        <>
            <div className="card m-3" >
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">${price}.00</p>
                        
                    </div>
            </div>
        </>
    )
}
