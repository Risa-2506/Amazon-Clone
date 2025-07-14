export let cart=JSON.parse(localStorage.getItem('cart')) || [];
/*
if (!cart) 
{
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}
*/
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

export function renderpayment(cart,products)
{
  let payment='';
  let cartQuantity=0;
  let matchingitem='';
  let totalprice=0;
  cart.forEach((item)=>
  {
    
    cartQuantity+=item.quantity;
    products.forEach((product)=>
    {
      if(product.id===item.productId)
      {
        matchingitem=product;
      }
    });
    totalprice+=matchingitem.priceCents;
  });
  payment+=
  `
          <div class="price-title">
            Order Summary
          </div>

          <div class="price-calculation">
            <div class="item">
              <div class="item-name">
                Items(${cartQuantity})
              </div>
              <div class="item-price">
                $${(totalprice/100).toFixed(2)}
              </div>
            </div>
            <div class="shipping">
              <div class="shipping-name">
                Shipping & handling:
              </div>
              <div class="shipping-price">
                $0.00
              </div>
            </div>
            <div class="total-bef-tax">
              <div calss="total-bef-tax-name">
                Total before tax:
              </div>
              <div class="total-bef-tax-price">
                $31.85
              </div>
            </div>
            <div class="tax">
              <div class="tax-name">
                Estimated tax (10%):
              </div>
              <div class="tax-price">
                $3.19
              </div>
            </div>
          </div>

          <div class="price-total">
            <div class="order-summary">
              <div class="order-summary-title">
                Order total:
              </div>
              <div class="order-price">
                $35.04
              </div>
            </div>
            <div class="order-btn">
              <a href="orders.html"><button class="order-btn-css">Place your order</button></a>
            </div>
          </div>
  
  `
  return payment;
}
