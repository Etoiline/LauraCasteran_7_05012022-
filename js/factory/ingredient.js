import { recipes } from "../../data/recipes.js";

export default class Ingredients {
  constructor () {
    this.allIngredients = new Set()
    this.currentIngredients = new Set()
    this.queryIngredients()
    this.initCurrentIngredients()
    this.showIngredients()
  }

  queryIngredients() {
    recipes.forEach(recipe => { 
      recipe.ingredients.forEach(ingredient => {
        let oneIngredient = ingredient.ingredient
        this.allIngredients.add(oneIngredient[0].toUpperCase() + oneIngredient.substring(1).toLowerCase())
      })
    })
  }

  initCurrentIngredients() {
    this.allIngredients.forEach(ingredient => { 
        this.currentIngredients.add(ingredient)
      })
  }

  showIngredients(){
    let divIngredientSearch = document.getElementsByClassName('ingredient-search')[0]
    let ulIngredientSearch = divIngredientSearch.getElementsByTagName('ul')[0]
    let liIngredientSearch = ulIngredientSearch.firstElementChild
    ulIngredientSearch.innerHTML=''
    ulIngredientSearch.appendChild(liIngredientSearch)
    this.currentIngredients.forEach(ingredient => {
      let liIngredient = document.createElement('li')
      liIngredient.textContent = ingredient
      ulIngredientSearch.appendChild(liIngredient)
    })
  }


}
