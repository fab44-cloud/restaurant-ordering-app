import menuArray from "./data.js"

const menuSection = document.querySelector('.menu-section')
const orderSection = document.querySelector('.order-section')
let orderArray = []

const menuString = menuArray.map(food => {
    return `
     <div class="menu-container">
        <span class="food-emoji">${food.emoji}</span>
        <div class="food-description">
          <h2 class="main-heading">${food.name}</h2>
          <p class="ingredients">${food.ingredients}</p>
          <p>$${food.price}</p>
        </div>
        <button class="plus-btn" data-id='${food.id}'>
          <i class="fa-regular fa-plus"></i>
        </button>
      </div>
      <hr />
    `
}).join('')

menuSection.innerHTML = menuString;


// Event listener
menuSection.addEventListener('click', function(e) {
    const clickedBtn = e.target.closest('.plus-btn')

    if (clickedBtn) {
        const foodId = parseInt(clickedBtn.dataset.id)
        console.log(`Button with data-id: ${foodId} was clicked`)
        handleAddItemToCart(foodId)
    }
})

function handleAddItemToCart(itemId) {
    const selectedItem = menuArray.find(item => item.id === itemId)
    orderArray.push(selectedItem)
    renderOrderSummary()
}

function renderOrderSummary() {
    let orderHtml = ''
    if (orderArray.length > 0) {

        // Generate Html for individual items
        orderArray.forEach(orderItem => {
            orderHtml += `
                <h2>Your order</h2>
                <div>
                    <p>${orderItem.name}</p>
                </div>
            `
        })
    }
    orderSection.innerHTML = orderHtml
}