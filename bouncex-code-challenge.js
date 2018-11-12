let cart = document.querySelector('.mini-cart-products')

let pageHeight = document.documentElement.scrollHeight
let windowHeight = window.innerHeight
let bottomTenPercentOfPage = pageHeight/10

if (cart) {

  cartItems = Array.from(cart.children)

  let numItemsInCart = cartItems.length

  let cartImages = ''

  let cartTotal = 0

  cartItems.forEach((product, index) => {
    if (index < 2) (
      cartImages += `${product.querySelector('.mini-cart-image a').innerHTML}<br/>`
    )

    let priceAdjustedProductTotal = product.querySelector('.price-adjusted-total')

    if (priceAdjustedProductTotal) {
      priceAdjustedProductTotal = priceAdjustedProductTotal.innerText.split('$')[1]
      cartTotal += parseFloat(priceAdjustedProductTotal)
    } else {
      let miniCartPrice = product.querySelector('.mini-cart-price')
      miniCartPrice = miniCartPrice.innerText.split('$')[1]
      cartTotal += parseFloat(miniCartPrice)
    }

  })

  cartTotal = cartTotal.toString()

  if (cartTotal.split('.')[1] && cartTotal.split('.')[1].length === 1) {
    cartTotal += "0"
  } else {
    cartTotal += ".00"
  }

  let cartModal = document.createElement('div')
  cartModal.style.cssText = 'position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 100; overflow: auto; background-color: rgba(0, 0, 0, 0.6); display: none; text-align: center; font-weight: bold; font-family: ars_maquette_problack,sans-serif;'

  let modalContent = document.createElement('div')
  modalContent.style.cssText = 'display: flex; flex-direction: row; justify-content: center; position: relative; overflow: hidden; margin: auto; background-color: #fefefe; padding: 2%; width: 80%; height: 60%; margin-top: 10%; padding-top: 2%'

  let modalImage = document.createElement('img')
  modalImage.src = 'https://jooinn.com/images1280_/man-wearing-red-hooded-jacket-and-red-pants-while-holding-black-metal-stick-2.jpg'
  modalImage.style.cssText = 'max-height: 75%; max-width: 50%; margin-left: 5%; margin-top: 3%; overflow: hidden; object-fit: cover; padding-right: 3%;'


  let cartContent = document.createElement('div')
  cartContent.style.cssText = 'background-color: #fefefe; width: 50%; margin-top: 4%; font-size: 1.1em;'

  if (numItemsInCart === 1) {
    cartContent.innerHTML = `<h1>You have an item in your cart</h1><br/> ${cartImages} <br/><h3>Total: $${cartTotal}</h3>`
  } else if (numItemsInCart === 2) {
    cartContent.innerHTML = `<h1>You have these ${numItemsInCart} items in your cart</h1><br/> ${cartImages} <br/><h3>Total: $${cartTotal}</h3>`
  } else {
    cartContent.innerHTML = `<h1>You have these items and ${numItemsInCart - 2} more in your cart</h1><br/> ${cartImages} <br/><h3>Total: $${cartTotal}</h3>`
  }


  modalContent.appendChild(cartContent)
  modalContent.appendChild(modalImage)

  let cartButton = document.createElement('button')
  cartButton.style.cssText = 'position: relative; bottom: 0px; background-color: #cc0001; color: white; width: 35%; height: 100%; font: bold 12px/12px ars_maquette_probold,sans-serif; margin-right: 20%;'
  cartButton.innerText = "YOUR CART"
  cartButton.className = "modal-button"

  let closeButton = document.createElement('button')
  closeButton.style.cssText = 'position: relative; bottom: 0px; background-color: #cc0001; color: white; width: 35%; height: 100%; font: bold 12px/12px ars_maquette_probold,sans-serif;'
  closeButton.innerText = "CLOSE"
  closeButton.className = "modal-button"

  let buttonContainer = document.createElement('div')
  buttonContainer.style.cssText = 'display: flex; flex-direction: row; justify-content: center; position: absolute; bottom: 20px; width: 100%; height: 10%; padding: 0% 5%'

  buttonContainer.appendChild(cartButton)
  buttonContainer.appendChild(closeButton)
  modalContent.appendChild(buttonContainer)

  cartModal.appendChild(modalContent)

  document.body.appendChild(cartModal)

  closeButton.addEventListener('click', () => {
    cartModal.style.display = 'none'
  })

  cartButton.addEventListener('click', () => {
    location.href='https://www.marmot.com/cart'
  })

  closeButton.addEventListener('click', () => {
    cartModal.style.display = 'none'
  })

  buttonContainer.addEventListener('mouseover', () => {
    if (event.target.className === 'modal-button') {
      event.target.style.backgroundColor = '#d00'
    }
  })

  buttonContainer.addEventListener('mouseout', () => {
    if (event.target.className === 'modal-button') {
      event.target.style.backgroundColor = '#cc0001'
    }
  })

  document.addEventListener('scroll', () => {
      let scrollPosition = window.pageYOffset
      if (pageHeight - windowHeight - scrollPosition <= bottomTenPercentOfPage) {
        cartModal.style.display = 'block'
      }
  })

}
