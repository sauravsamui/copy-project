import axios from "axios";
import { ADD_TO_CART_ERROR, ADD_TO_CART_LOADING, ADD_TO_CART_SUCCESS, GET_ITEM_CART_ERROR, GET_ITEM_CART_LOADING, GET_ITEM_CART_SUCCESS, REMOVE_FROM_CART_ERROR, REMOVE_FROM_CART_LOADING, REMOVE_FROM_CART_SUCCESS, UPDATE_CART_ERROR, UPDATE_CART_LOADING, UPDATE_CART_SUCCESS } from "./cart.types";









export const getItemApi=()=>(dispatch)=>{
    dispatch({type:GET_ITEM_CART_LOADING})

    axios.get("http://localhost:8080/cartItem")
    .then((res)=>(dispatch({type:GET_ITEM_CART_SUCCESS,payload:res.data})))
    .catch((r)=>(dispatch({type:GET_ITEM_CART_ERROR})))
} 

export const addCartApi=(item,s)=>(dispatch)=>{
     dispatch({type:ADD_TO_CART_LOADING})
        axios.post("http://localhost:8080/cartItem",{
            productName:item.BrandName,
            Image:item.Image,
            price:item.Price,
            size:s,
            color:item.color,
            quantity:1,
            id:item.id
         }).then((res)=>(dispatch({type:ADD_TO_CART_SUCCESS,payload:res.data})))
         .catch((r)=>(dispatch({type:ADD_TO_CART_ERROR})))
     
}

export const removeCartApi=(id)=>(dispatch)=>{
   dispatch({type:REMOVE_FROM_CART_LOADING})

   axios.delete(`http://localhost:8080/cartItem/${id}`)
   .then((res)=>(dispatch({type:REMOVE_FROM_CART_SUCCESS,payload:id})))
   .catch((r)=>(dispatch({type:REMOVE_FROM_CART_ERROR})))
}

export const updateCartApi=(id,qnty,size)=>(dispatch)=>{
   dispatch({type:UPDATE_CART_LOADING})

   axios.patch(`http://localhost:8080/cartItem/${id}`,{
      quantity:qnty,
      size:size
   }).then((res)=>(dispatch({type:UPDATE_CART_SUCCESS,payload:{id,qnty,size}})))
   .catch((r)=>(dispatch({type:UPDATE_CART_ERROR})))
}