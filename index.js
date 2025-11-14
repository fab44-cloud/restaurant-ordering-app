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

// Functions
function handleAddItemToCart(itemId) {
    const selectedItem = menuArray.find(item => item.id === itemId)
    orderArray.push(selectedItem)
    renderOrderSummary()
}

function renderOrderSummary() {
    let orderItemsHtml = ''
    let total = 0

    if (orderArray.length > 0) {
        orderArray.forEach(orderItem => {
            total += orderItem.price
            orderItemsHtml += `
                <div class="order-item-row">
                    <p>${orderItem.name}</p>
                    <button>Remove</button>
                    <p>$${orderItem.price}</p>
                </div>
            `
        })

        const fullOrderHtml = `
            <h2>Your order</h2>
            <div>
                ${orderItemsHtml}
            </div>
            <hr />
            <p>Total Price: $${total}</p>
            <button>Complete order</button>
        `

        orderSection.innerHTML = fullOrderHtml
    }
}