const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let products = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  products.forEach(product => {
    const isVisible =
      product.name.toLowerCase().includes(value) || product.description.toLowerCase().includes(value)

    product.element.classList.toggle("hide", !isVisible)
  })
})

fetch("product_dummy_data.json")
  .then(res => res.json())
  .then(data => {
    products = data.map(products => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const title = card.querySelector("[data-title]")
      const description = card.querySelector("[data-description]")
      const category = card.querySelector("[data-category]")
      const img = card.querySelector("[data-img]")
      const price = card.querySelector("[data-price]")
      title.textContent = products.title
      description.textContent = products.description
      img.src = products.thumbnail
      category.textContent=products.category
      price.textContent = "Price: $ "+ products.price 
      userCardContainer.append(card)
      return { name: products.title, description: products.description,price: products.price, element:card }
    })
  })