'use client'
import React, { useState } from 'react'
import { CheckoutContext } from './context'
import { Product } from './CartProvider'


const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [checkout, setCheckout] = useState<Product[]>([])

    function addCheckout(products: Product[]) {
        setCheckout([...products])
    }

    return (
        <CheckoutContext.Provider value={{ checkout, addCheckout }}>
            {children}
        </CheckoutContext.Provider>
    )
}

export default CheckoutProvider