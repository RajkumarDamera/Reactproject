export function caluculateTotal(cartItems) {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

export function caluculateButtonDiscount(totalPrice, discountPercentage) {
  return (totalPrice * discountPercentage) / 100;
}


export function applyCoupon(totalPrice, code) {
  const coupons = {
    RAJU10: 10,   
    RAJU20: 20,   
    RAJU30: 30,   
  };

  const discount = coupons[code.toUpperCase()] || 0; 
  return caluculateButtonDiscount(totalPrice, discount);
}
