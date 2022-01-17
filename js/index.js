import { recipes } from "../data/recipes.js"
import Recipe from "./factory/recipe.js"

import Ingredients from "./factory/ingredient.js"
import Appliance from "./factory/appliance.js"
import Ustensil from "./factory/ustensil.js"

import * as ingredientComponent from "./component/ingredient-search.js"

console.table(recipes)

let divRecipes = document.getElementsByClassName('recipes')[0]

recipes.forEach((item, index) => {
  let recipeObject = new Recipe(item)
  divRecipes.appendChild(recipeObject.recipeFactory())
})

// initialisation des dropdowns
export let ingredientsClass = new Ingredients()
export let applianceClass = new Appliance()
export let ustensilsClass = new Ustensil()

// console.log('current', ingredientsClass.currentIngredients, ingredientsClass.allIngredients)
// ingredientsClass.currentIngredients.clear()
// console.log('current', ingredientsClass.currentIngredients, ingredientsClass.allIngredients)

ingredientComponent.listener()
