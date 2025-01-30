import client from "../../../sanityClient";
import { Product } from "./CartProvider";

async function getData() {
    const data = await client.fetch('*[_type=="product"]');
    return data;
  }
 
 export const data:Product = await getData();