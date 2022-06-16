import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemApi } from "../../store/cart/cart.actions";
import { Link } from "react-router-dom";
import { Alert, AlertIcon,Progress, Stack } from "@chakra-ui/react";
import CartItem from "./CartItem";
import styles from "./cart.module.css";
import { useState } from "react";

const Cart = () => {
 
  const dispatch = useDispatch();
  
  const { data, getItemCart } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getItemApi());

    return () => {};
  }, []);
console.log(data)
// let handleFlag=()=>{
//   setFlag(!flag)
// }
let  total1 = data.reduce((acu,el)=>(Number(acu)+Number(el.price)),0)
  if (getItemCart.loading) {
    return (
      <div>
        <div>Loading...</div>
        <Progress size="xs" isIndeterminate />
      </div>
    );
  }
  else if (getItemCart.error) {
    return (
      <div>
        <Stack spacing={3}>
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        </Stack>
      </div>
    );
  }
 else if (data.length === 0) {
    return <div>Your bag is empty</div>;
  } 
  else {
    return (
      <div className={styles.bigDiv}>
        <div className={styles.offerDiv}>
          <div>
            {/* women page link */}
            <Link to={"/menpage"}>
              <h3 className={styles.women}>WOMEN</h3>
            </Link>
          </div>
          <div className={styles.sale}>
            <h3>SALE: UP TO 70% OFF!</h3>
            <h3>IT'S CALLED BIG DISCOUNT ENERGY</h3>
          </div>
          <div >
            <Link to={"/menpage"}>
              <h3  className={styles.men} >MEN</h3>
            </Link>
          </div>
        </div>
        <div className={styles.mainDiv}>
          <div className={styles.leftDiv}>
            <div className={styles.leftDivOne}>
              <h1 className={styles.bag}>MY BAG</h1>
              <p className={styles.reserved}>Items are reserved for 60 minutes</p>
            </div>
            <div className={styles.leftDivTwoUper} >
              {data.map((el) => (
                <CartItem key={el.id} item={el}  />
              ))}
            </div>
            <div className={styles.leftDivThree}>
             
              <h2 className={styles.subPrice}>{`£${total1.toFixed(2)}`}</h2>
              <h2 className={styles.subT}>SUB - TOTAL </h2> 
            </div>
            <div className={styles.delivery}>
              <img className={styles.iconD}
                src="https://cdn-icons-png.flaticon.com/512/3233/3233997.png"
                alt="cart"
              />
              <div className={styles.insideDelivery}>
                <h1 className={styles.free}>FREE* STANDARD DELIVERY</h1>
                <p className={styles.country}>Fast delivery options available to most countries.</p>
                <p className={styles.more}>More info</p>
              </div>
            </div>
          </div>
          <div className={styles.rightDiv}>
            <h1 className={styles.total}>TOTAL</h1>
            <div className={styles.subTotal}>
              
              <h2 className={styles.sub_total}>Sub-total</h2>
              <p className={styles.sub_price}>{`£${total1.toFixed(2)}`}</p>
              
            </div>
            <div className={styles.dCharge}>
              <h2 className={styles.sub_total}>Delivery</h2>
              <p className={styles.pCharge}>!</p>
            </div>
            {/* 
            checkout Page */}
            <Link to={"/"}><button className={styles.btnCheckout} >CHECKOUT</button></Link> 
            <div className={styles.accept}>
              <h2 className={styles.weAc}>WE ACCEPT: </h2>
              <div className={styles.card}>
                <img className={styles.cardImg} src="https://assets.asosservices.com/asos-finance/images/marketing/single.png" alt="visa" />
               
              </div>
              <p className={styles.step}>Got a discount code? Add it in the next step.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;