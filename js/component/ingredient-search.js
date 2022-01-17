import {ingredientsClass} from "../index.js"

export function listener() {
  const searchInput = document.getElementsByClassName('ingredient-search__input')[0]
  searchInput.addEventListener('input', () => {
    if (searchInput.value.length >= 3) {
      ingredientsClass.currentIngredients.clear()
      ingredientsClass.allIngredients.forEach(ingredient => {
        if (ingredient.toLowerCase().match(searchInput.value.toLowerCase())){
          ingredientsClass.currentIngredients.add(ingredient)
        }
      })
      
    }  
    else {
      ingredientsClass.initCurrentIngredients()
    } 
    console.log('tab',ingredientsClass.currentIngredients)   
  })
  
}
