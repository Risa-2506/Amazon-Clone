export let cart=JSON.parse(localStorage.getItem('cart')) || [];

export function saveTostorage()
{
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function removeFromCart(productId)
{
  let newCart=[];
  cart.forEach((item)=>
  {
    if(item.productId!==productId)
    {
      newCart.push(item);
    }
  });
  cart=newCart;
  saveTostorage();
}
