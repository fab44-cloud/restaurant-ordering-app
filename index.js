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

// Functions
function handleAddItemToCart(itemId) {
    const selectedItem = menuArray.find(item => item.id === itemId)
    orderArray.push(selectedItem)
    renderOrderSummary()
}

function removeItemFromCart(itemId) {
    orderArray = orderArray.filter(item => item.id !== itemId)
    renderOrderSummary()
}

// Event listeners
menuSection.addEventListener('click', function(e) {
    const plusBtn = e.target.closest('.plus-btn')

    if (plusBtn) {
        const foodId = parseInt(plusBtn.dataset.id)
        console.log(`Button with data-id: ${foodId} was clicked`)
        handleAddItemToCart(foodId)
    }
})

orderSection.addEventListener('click', function(e) {
    const removeBtn = e.target.closest('.remove-btn')
    if (removeBtn) {
        const foodId = parseInt(removeBtn.dataset.id)
        removeItemFromCart(foodId)
    }
})


function renderOrderSummary() {
    orderSection.innerHTML = '';

    if (orderArray.length === 0) {
        orderSection.style.display = 'none';
        return;
    } else {
        orderSection.style.display = 'block';
    }

    const orderTitleEl = document.createElement("h3");
    const orderItemsContainer = document.createElement("div");

    orderItemsContainer.classList.add("order-items-list");

    orderTitleEl.textContent = "Your order";

    orderSection.appendChild(orderTitleEl);
    orderSection.appendChild(orderItemsContainer);

    orderArray.forEach(orderItem => {

        const itemRowEl = document.createElement("div");
        const itemNameEl = document.createElement("p");
        const removeBtnEl = document.createElement("button");
        const itemPriceEl = document.createElement("p");

        itemRowEl.classList.add("order-item-row");

        itemNameEl.textContent = `${orderItem.name}`;

        removeBtnEl.classList.add("remove-btn");
        removeBtnEl.setAttribute("data-id", `${orderItem.id}`)
        removeBtnEl.textContent = "Remove";

        itemPriceEl.textContent = `$${orderItem.price.toFixed(2)}`

        orderItemsContainer.appendChild(itemRowEl);
        itemRowEl.appendChild(itemNameEl);
        itemRowEl.appendChild(removeBtnEl);
        itemRowEl.appendChild(itemPriceEl);
    })

    const total = orderArray.reduce((sum, currentValue) => sum + currentValue.price, 0);

    const totalDiv = document.createElement("div");
    const horizontalLine = document.createElement("hr");
    const orderBtn = document.createElement("button");

    totalDiv.textContent = `Total price: $${total.toFixed(2)}`

    orderBtn.classList.add("order-btn");
    orderBtn.textContent = "Complete order";

    orderSection.appendChild(horizontalLine);
    orderSection.appendChild(totalDiv);
    orderSection.appendChild(orderBtn);
}


