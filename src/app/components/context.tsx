/* eslint-disable */
'use client'

import { createContext } from "react"

interface Cart{
    [x:string]:any
    
}

export const CartContext = createContext({} as Cart)

export const CheckoutContext = createContext({} as Cart)

