import menuArray from "./data.js"

const menuContainer = document.querySelector('.menu-container')

const menuString = menuArray.map(food => {
    return `
     <section class="main-section">
        <span class="food-emoji">${food.emoji}</span>
        <div class="food-description">
          <h2 class="main-heading">Pizza</h2>
          <p class="ingredients">${food.ingredients}</p>
          <p>$${food.price}</p>
        </div>
        <div class="ellipse">
          <i class="fa-regular fa-plus"></i>
        </div>
      </section>
      <hr />
    `
}).join('')

menuContainer.innerHTML = menuString;