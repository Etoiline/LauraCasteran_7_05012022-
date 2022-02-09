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
  * et recherche à partir de 3 caractères
  */
  listener () {
    const searchInput = document.getElementById('search')
    // console.log('search input', searchInput)
    searchInput.addEventListener('input', () => {
      this.filteredRecipes = []
      if (searchInput.value.length >= 3) {
        console.log('début de recherche')
        let i = 0
        for (i = 0; i < recipesArray.length; i++) {
          if (recipesArray[i].name.includes(searchInput.value)) {
            // console.log(recipe.name)
            this.filteredRecipes.push(recipesArray[i])
          } else if (recipesArray[i].description.includes(searchInput.value)) {
            // console.log(recipe.description)
            this.filteredRecipes.push(recipesArray[i])
          } else {
            let j = 0
            for (j = 0; j < recipesArray[i].ingredientList.length; j++) {
              if (recipesArray[i].ingredientList[j].includes(searchInput.value)) {
                this.filteredRecipes.push(recipesArray[i])
                break
              }
            }
          }
        }
      } else {
        this.filteredRecipes = recipesArray.slice()
      }
      displayFilteredRecipes()
    })
  }
}
