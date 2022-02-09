import { recipesArray } from '../index.js'
import { displayFilteredRecipes } from '../component/utils.js'

/*
*
*/

export default class MainSearch {
  constructor () {
    this.filteredRecipes = []
    this.initFilterRecipes()
    this.listener()
  }

  initFilterRecipes () {
    this.filteredRecipes = recipesArray
  }

  /*
  * surveille les entrées de l'utlisateur
  */
  listener () {
    const searchInput = document.getElementById('search')
    // console.log('search input', searchInput)
    searchInput.addEventListener('input', () => {
      this.filteredRecipes = []
      if (searchInput.value.length >= 3) {
        console.log('début de recherche')
        recipesArray.forEach(recipe => {
          if (recipe.name.includes(searchInput.value)) {
            // console.log(recipe.name)
            this.filteredRecipes.push(recipe)
          } else if (recipe.description.includes(searchInput.value)) {
            // console.log(recipe.description)
            this.filteredRecipes.push(recipe)
          } else {
            recipe.ingredientList.forEach(ingredient => {
              if (ingredient.includes(searchInput.value)) {
                this.filteredRecipes.push(recipe)
              }
            })
          }
        })
      } else {
        this.filteredRecipes = recipesArray.slice()
      }
      displayFilteredRecipes()
    })
  }
}
