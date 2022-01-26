import { recipes } from '../data/recipes.js'

import Recipe from './factory/recipe.js'
import Ingredients from './factory/ingredient.js'
import Appliance from './factory/appliance.js'
import Ustensil from './factory/ustensil.js'

console.table(recipes)

export const recipesArray = []
const divRecipes = document.getElementsByClassName('recipes')[0]

recipes.forEach((item, index) => {
  const recipeObject = new Recipe(item)
  recipesArray.push(recipeObject)
  divRecipes.appendChild(recipeObject.recipeFactory())
})

// initialisation des dropdowns
export const ingredientsClass = new Ingredients()
export const applianceClass = new Appliance()
export const ustensilsClass = new Ustensil()

// console.log('current', ingredientsClass.currentIngredients, ingredientsClass.allIngredients)
// ingredientsClass.currentIngredients.clear()
// console.log('current', ingredientsClass.currentIngredients, ingredientsClass.allIngredients)

const dropdownIngredients = document.getElementsByClassName('ingredient-search')[0]
dropdownIngredients.addEventListener('show.bs.dropdown', function () {
  dropdownIngredients.setAttribute('class', 'btn-group ingredient-search ingredient-search-onclick')
  ingredientsClass.showIngredients()
})
dropdownIngredients.addEventListener('hide.bs.dropdown', function () {
  dropdownIngredients.setAttribute('class', 'btn-group ingredient-search')
  const searchInput = document.getElementsByClassName('ingredient-search__input')[0]
  searchInput.value = 'Rechercher un ingrédient'
  console.log('fermer dropdown ingredient')
})
