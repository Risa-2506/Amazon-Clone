import {cart,removeFromCart, saveTostorage} from '../data/cartData.js';
import {products} from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

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
        <div class="cart-checkout js-cart-${matchingitem.id}">         <!--Date+ product det + del options-->
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
                <div class="quantity-update-delete">
                  <span class="quantity">
                    Quantity: <span class="js-quantity-${matchingitem.id}">${item.quantity}</span>
                  </span>
                  <span class="update-link js-update-link-${matchingitem.id}" data-matchingitem-id="${matchingitem.id}">
                    Update
                  </span>
                  <input type="number" class="input-number js-input-number-${matchingitem.id}">
                  <span class="Save js-save-link-${matchingitem.id}" data-matching-item-id="${matchingitem.id}">Save</span>
                  <span class="delete-link js-delete-link" data-product-id="${matchingitem.id}">
                    Delete
                  </span>
                </div>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-text">
                Choose a delivery option:
              </div>
              ${delivery(matchingitem,item)}
            </div>
          </div>
         </div>`;

});

function delivery(matchingitem,item)
{
  let deliverHTML='';
  deliveryOptions.forEach((deliveryOption) =>
  {
    const today =dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMMM D');
    function price()
    {
      if(deliveryOption.priceCents===0)
        return 'FREE';
      else
      {
        return `$${(deliveryOption.priceCents/100).toFixed(2)}`;
      }
    }
    const isChecked=item.deliveryOptionId===deliveryOption.id;
    deliverHTML+=
    `
      <div class="delivery-option-select js-delivery-option" data-deliveryoption-id="${deliveryOption.id}" 
        data-product-id="${matchingitem.id}">
        <div class="radio-btn">
          <input type="radio" name=${matchingitem.id} 
            ${isChecked ? 'checked' : ''}>
        </div>
        <div class="delivery-option-detail">
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${price()} Shipping
          </div>
        </div>
      </div>
    `
  });
  return deliverHTML;
}


let cartQuantity=0;
cart.forEach((item) =>
{
  cartQuantity+=item.quantity;
});
document.querySelector('.js-cart-summary').innerHTML=cartHTML;
document.querySelector('.js-cart-quantity').innerHTML=cartQuantity + ' items';


/*Update section*/
document.querySelectorAll('.update-link')
  .forEach((update)=>
  {
    update.addEventListener('click',()=>
      {
        const matchingitemId=update.dataset.matchingitemId;
        const input = document.querySelector(`.js-input-number-${matchingitemId}`);
        const updateLink=document.querySelector(`.js-update-link-${matchingitemId}`);
        const saveLink=document.querySelector(`.js-save-link-${matchingitemId}`);
        const quantity=document.querySelector(`.js-quantity-${matchingitemId}`);
        input.classList.add('input-display');
        updateLink.classList.add('update-display');
        saveLink.classList.add('save-display');
        quantity.classList.add('quantity-display');
      }
    );
  });

/*Save section*/
document.querySelectorAll('.Save')
  .forEach((save)=>
  {
    save.addEventListener('click',()=>
    {
      const matchingitemId=save.dataset.matchingItemId;
      const input = document.querySelector(`.js-input-number-${matchingitemId}`);
      const updateLink=document.querySelector(`.js-update-link-${matchingitemId}`);
      const saveLink=document.querySelector(`.js-save-link-${matchingitemId}`);
      const quantity=document.querySelector(`.js-quantity-${matchingitemId}`);
      const newQuantity=Number(input.value);
      document.querySelector(`.js-quantity-${matchingitemId}`).innerHTML=newQuantity;
      let cartQuantity=0;
      cart.forEach((item)=>
      {
        if(item.productId===matchingitemId)
        {
          item.quantity=newQuantity;
        }
        cartQuantity+=item.quantity;
      });
      document.querySelector('.js-cart-quantity').innerHTML=cartQuantity + ' items';
      saveTostorage();
      input.classList.remove('input-display');
      updateLink.classList.remove('update-display');
      saveLink.classList.remove('save-display');
      quantity.classList.remove('quantity-display');
    });

  });


  document.querySelectorAll('.js-delete-link')
    .forEach((deleteLink)=>
    {
      deleteLink.addEventListener('click',()=>
      {
        const productId=deleteLink.dataset.productId;
        removeFromCart(productId);
        const container=document.querySelector(`.js-cart-${productId}`);
        container.remove();
        let cartQuantity=0;
        cart.forEach((item)=>
        {
          cartQuantity+=item.quantity;
        });
        saveTostorage();
        document.querySelector('.js-cart-quantity').innerHTML=cartQuantity + ' items';
        saveTostorage();
      });
    });

    document.querySelectorAll('.js-delivery-option')
      .forEach((option)=>
      {
        option.addEventListener('click',()=>
        {
          const deliveryoptionId=option.dataset.deliveryoptionId;
          const productId=option.dataset.productId;
          cart.forEach((item)=>
          {
            if(productId===item.productId)
            {
              item.deliveryOptionId=deliveryoptionId;
            }
          });
          saveTostorage();
          console.log(cart);
        });
      });