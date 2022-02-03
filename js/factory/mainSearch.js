import { recipesArray } from '../index.js'
import { displayFilteredRecipes } from '../component/utils.js'

/*
*
*/

export default class MainSearch {
  constructor () {
    this.filteredRecipes = []
    this.listener()
  }

  /*
  * surveille les entrées de l'utlisateur
  */
  listener () {
    const searchInput = document.getElementById('search')
    // console.log('search input', searchInput)
    searchInput.addEventListener('input', () => {
      let recipeSearch = []
      if (searchInput.value.length >= 3) {
        console.log('début de recherche')
        recipesArray.forEach(recipe => {
          if (recipe.name.includes(searchInput.value)) {
            // console.log(recipe.name)
            recipeSearch.push(recipe)
          } else if (recipe.description.includes(searchInput.value)) {
            // console.log(recipe.description)
            recipeSearch.push(recipe)
          } else {
            recipe.ingredientList.forEach(ingredient => {
              if (ingredient.includes(searchInput.value)) {
                recipeSearch.push(recipe)
              }
            })
          }
        })
      } else {
        recipeSearch = recipesArray.slice()
      }
      displayFilteredRecipes(recipeSearch)
    })
  }
}
