import menuArray from "./data.js"

const menuContainer = document.querySelector('.menu-container')

const menuString = menuArray.map(food => {
    return `
     <div class="food-section">
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

menuContainer.innerHTML = menuString;

// --- Accessing the dataset ---

// Use event delegation on the menu container
menuContainer.addEventListener('click', function(e) {
    const clickedBtn = e.target.closest('.plus-btn')

    if (clickedBtn) {
        const foodId = clickedBtn.dataset.id
        console.log(`Button with data-id: ${foodId} was clicked`)
    }
})