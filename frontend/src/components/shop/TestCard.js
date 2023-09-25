import React, { useEffect, useState } from "react";
import "./Tests.css";
import axios from "axios";

export const TestCard = ({ 
  item, 
  userId, 
  cart, 
  setCart,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [showQuantityController, setShowQuantityController] = useState(false);

  // Check if the item's test_id is already in the cart and set quantity
  useEffect(() => {
    const cartItem = cart.find((cartItem) => cartItem.test_id === item.test_id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setShowQuantityController(true);
    } else {
      setShowQuantityController(false);
    }
  }, [cart, item.test_id]);
  // console.log(userId);

  const handleAddToCartClick = () => {
    setShowQuantityController(true);
    const data = { test_id: item.test_id, userId, quantity: 1 };
    // console.log(data);
    axios.post("http://localhost:3500/addtocart", data)
      .then((response) => {
        if (response.data.Status === "Success") {
          // Refresh the cart data
          // refreshCart();
        } else {
          console.log("err occurred, not Success");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
    updateCartItemQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartItemQuantity(quantity - 1);
    } else if (quantity === 1) {
      removeCartItem();
    }
  };

  // const refreshCart = () => {
  //   // Make an Axios GET request to fetch the updated cart data
  //   axios.get(`http://localhost:3500/cart/${userId}`)
  //     .then((response) => {
  //       if (response.data) {
  //         // Update the cartData state with the new cart data
  //         setCart(response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Errorrr refreshing cart:", error);
  //     });
  // };

  // Function to update cart item quantity in the database
  const updateCartItemQuantity = (newQuantity) => {
    const data = { test_id: item.test_id, quantity: newQuantity, userId};
    axios.post("http://localhost:3500/updatecartitemquantity", data)
      .then((response) => {
        if (response.data.Status === "Success") {
          // refreshCart();
        } else {
          console.log("err occurred while updating quantity");
        }
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  // Function to remove cart item from the database
  const removeCartItem = () => {
    const data = { test_id: item.test_id, userId };
    axios.post("http://localhost:3500/removecartitem", data)
      .then((response) => {
        if (response.data.Status === "Success") {
          // refreshCart();
        } else {
          console.log("err occurred while removing item");
        }
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  return (
    <>
      <div className="tstCards d-flex gap-2">
        <img src="/images/k.png" className="cardcomplogo" alt="" />
        <div className="tstsCard w-100">
          <div className="go-corner"></div>
          <div className="tcardbody">
            <div className="card_org_cont">
              <img
                src={"/images/organs/" + item.category + ".png"}
                className="testOrgImg"
                alt=""
              />
            </div>
            <h5 className="tstTitle">{item.name}</h5>
            <p className="tstInv">
              <b>INVCODE:</b> {item.test_code}
            </p>
            <h6 className="mb-0 tstPrice">
              <small>Rs:</small> {item.price}/-
            </h6>
          </div>

          <div className="w-100 border-top tcardfooter">
            {showQuantityController ? (
              <div>
                <button onClick={(event) => { event.preventDefault(); handleDecrementQuantity(item.test_id) }}>-</button>
                <span>{quantity}</span>
                <button onClick={(event) => { event.preventDefault(); handleIncrementQuantity(item.test_id) }}>+</button>
              </div>
            ) : (
              <button onClick={ (event) => { event.preventDefault(); handleAddToCartClick(item.test_id) }}>Add to Cart</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
