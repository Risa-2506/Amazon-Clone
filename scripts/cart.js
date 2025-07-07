import {cart} from '../data/cartData.js';
import {products} from '../data/products.js';

let cartHTML='';
cart.forEach((item) =>
{
  let matchingitem;
  products.forEach((product)=>
  {
    if(product.id===item.productId)
    {
      matchingitem=product;
    }
  });
  cartHTML+=`
        <div class="cart-checkout">         <!--Date+ product det + del options-->
          <div class="delivery-date">       <!--Date-->
            Delivery Date:
          </div>
          <div class="cart-delivery">                 <!--Product dets + del options-->
            <div class="cart-product-details">        <!--Product img name price-->
              <div class="products-img">
                <img src="${matchingitem.image}" class="cart-product-img">
              </div>
              <div class="product-details">
                <div class="product-name">
                  ${matchingitem.name}
                </div>
                <div class="price">
                  $${(matchingitem.priceCents/100).toFixed(2)}
                </div>
                <div class="quantity">
                  Quantity: ${item.quantity}
                </div>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-text">
                Choose a delivery option:
              </div>
              <div class="delivery-option-select">
                <div class="radio-btn">
                  <input type="radio" name="1">
                </div>
                <div class="delivery-option-detail">
                  <div class="delivery-option-date">
                   Thursday, July 10
                 </div>
                 <div class="delivery-option-price">
                   FREE Shipping
                 </div>
                </div>
              </div>
              <div class="delivery-option-select">
                <div class="radio-btn">
                  <input type="radio" name="1">
                </div>
                <div class="delivery-option-detail">
                  <div class="delivery-option-date">
                   Thursday, July 10
                 </div>
                 <div class="delivery-option-price">
                   FREE Shipping
                 </div>
                </div>
              </div>
              <div class="delivery-option-select">
                <div class="radio-btn">
                  <input type="radio" name="1">
                </div>
                <div class="delivery-option-detail">
                  <div class="delivery-option-date">
                   Thursday, July 10
                 </div>
                 <div class="delivery-option-price">
                   FREE Shipping
                 </div>
                </div>
              </div>
            </div>
          </div>
         </div>`;

        let cartQuantity=0;
        cart.forEach((item) =>
        {
          cartQuantity+=item.quantity;
        });
         document.querySelector('.js-cart-summary').innerHTML=cartHTML;
         document.querySelector('.js-cart-quantity').innerHTML=cartQuantity + ' items';

});