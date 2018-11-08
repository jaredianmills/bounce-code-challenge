let cart = document.querySelector('.mini-cart-products')
let productDetails

if (cart) {
  cart = Array.from(cart.children)

  productDetails = cart.map(product => {
  	const details = {}

  	details['img'] = product.querySelector('.mini-cart-image a').innerHTML

  	let price = product.querySelector('.mini-cart-pricing')

    let priceAdjustedTotal = price.querySelector('.price-adjusted-total')
    let miniCartPrice = price.querySelector('.mini-cart-price')

    if (priceAdjustedTotal) {
      priceAdjustedTotal = priceAdjustedTotal.innerText.split('$')[1]
      details['price'] = parseFloat(priceAdjustedTotal)
    } else {
      miniCartPrice = miniCartPrice.innerText.split('$')[1]
      details['price'] = parseFloat(miniCartPrice)
    }


  	return details
  })
}

let cartModal = document.createElement('div')
cartModal.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;z-index:100;overflow:auto;background:rgba(0,0,0,0.5);display:none'

let cartModalContent = document.createElement('div')
cartModalContent.style.cssText = 'position: relative; margin: auto; background-color: #fefefe; padding: 2%; width: 80%; height: 60%; margin-top: 10%; opacity:1'

let cartTotal = 0
productDetails.forEach(product => cartTotal += product['price'])

cartTotal = cartTotal.toString()

if (cartTotal.split('.')[1] && cartTotal.split('.')[1].length === 1) {
  cartTotal += "0"
} else {
  cartTotal += ".00"
}

cartModalContent.innerHTML = `<h1>Your Cart</h1><h3>Items: ${productDetails.length} | Total: $${cartTotal}</h3><br/>`

productDetails.forEach(product => cartModalContent.innerHTML += `${product['img']}`)


let checkOutButton = document.createElement('button')
checkOutButton.style.cssText = 'position: relative; margin-top: 10px; float: right; background-color: #d00; color: white; width: 20%; height: 5%; font: bold 12px/12px ars_maquette_probold,sans-serif;'
checkOutButton.innerText = "CHECKOUT"

let closeButton = document.createElement('button')
closeButton.style.cssText = 'position: relative; margin-top: 10px; float: left; background-color: #d00; color: white; width: 20%; height: 5%; font: bold 12px/12px ars_maquette_probold,sans-serif;'
closeButton.innerText = "CLOSE"

cartModalContent.appendChild(closeButton)
cartModalContent.appendChild(checkOutButton)


cartModal.appendChild(cartModalContent)
document.body.appendChild(cartModal)

let pageHeight = document.documentElement.scrollHeight
let windowHeight = window.innerHeight
let bottomTenPercentOfPage = pageHeight/10

document.addEventListener('scroll', () => {
  let scrollPosition = window.pageYOffset
  if (pageHeight - windowHeight - scrollPosition <= bottomTenPercentOfPage) {
    cartModal.style.display = 'block'
  }
})
