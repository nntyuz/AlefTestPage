const container = document.querySelector('.content')
const sortPriceBtn = document.querySelector('#price-btn')
const scrollBtn = document.querySelector('.scroll-btn')
const email = document.querySelector('.mailing-input')
const emailBtn = document.querySelector('.mailing-btn')

function formatPrice (elem, selector) {
  return parseFloat(elem.querySelector(selector).innerHTML.replace(/\s|.руб/g, ''))
}

function toggleSortByPrice () {
  const cards = Array.from(document.querySelectorAll('.card'))
  let isReverse = false

  sortPriceBtn.classList.toggle('reverse')
  if (sortPriceBtn.classList.contains('reverse')) {
    isReverse = true
  }

  cards.sort(function (a, b) {
      const cardA = formatPrice(a, '.card-price')
      const cardB = formatPrice(b, '.card-price')

      if (cardA > cardB) {
        return isReverse ? 1 : -1
      } else if (cardA === cardB) {
        return 0
      } else {
        return isReverse ? -1 : 1
      }
    })
    .forEach(function (node) { container.appendChild(node) })
}

function windowScroll () {
  const scroll = window.scrollY
  if (scroll === 0) {
    scrollBtn.style.opacity = 0
  } else {
    scrollBtn.style.opacity = '100%'
  }
}
function scrollPageUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function likeCard(event) {
  const card = event.target.closest('.card')
  card.classList.toggle('liked')
  if(card.classList.contains('liked')) {
    alert('Добавленно в избранное')
  }
}

function validateEmail(value) {
  const regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return regexp.test(value)
}

function updateEmail() {
  if(validateEmail(email.value)) {
    email.style.borderColor = "#6EBBD3"
  } else {
    email.style.borderColor = "#E62D2D"
  }
}


toggleSortByPrice()
windowScroll()

sortPriceBtn.addEventListener('click', toggleSortByPrice)
window.addEventListener('scroll', windowScroll)
scrollBtn.addEventListener('click', scrollPageUp)
container.addEventListener('click', likeCard)
emailBtn.addEventListener('click', updateEmail)