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
    const itemToRemoveIndex = orderArray.findIndex(item => item.id === itemId)

    if (itemToRemoveIndex > -1) {
        orderArray.splice(itemToRemoveIndex, 1)
        console.log(itemToRemoveIndex)
        renderOrderSummary()
    }
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
    let total = 0;

    if (orderArray.length === 0) {
        orderSection.style.display = 'none';
        return;
    } else {
        orderSection.style.display = 'block';
    }

    const h3 = document.createElement("h3");
    h3.textContent = "Your order";

    orderSection.append(h3);

    orderArray.forEach(orderItem => {
        total += orderItem.price;

        const div = document.createElement("div");
        const p = document.createElement("p");
        const button = document.createElement("button");
        const orderPrice = document.createElement("p");

        div.classList.add("order-item-row");

        p.textContent = `${orderItem.name}`;

        button.classList.add("remove-btn");
        button.setAttribute("data-id", `${orderItem.id}`)
        button.textContent = "Remove";

        orderPrice.textContent = `$${orderItem.price}`

        orderSection.appendChild(div);
        div.appendChild(p);
        div.appendChild(button);
        div.appendChild(orderPrice);
    })

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


