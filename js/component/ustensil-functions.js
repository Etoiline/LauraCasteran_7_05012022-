import { ustensilsClass, recipesArray } from '../index.js'
import { displayFilteredRecipes } from './utils.js'

/*
* cliquer sur un ustensile dans la liste afin de le sélectionner
* l'ajouter dans la liste des filtres actifs
* le supprimer de la liste des tags (on ne peut pas sélectionner deux fois le même)
*/
export function selectUstensil () {
  // console.log('select appliance')
  const ustensilItems = document.querySelectorAll('li.ustensil-item')
  const divSelectedTag = document.getElementsByClassName('search-tags__ustensil')[0]
  ustensilItems.forEach(ustensilItem => {
    ustensilItem.addEventListener('click', () => {
      // console.log('clic tag appareil', applianceItem)
      ustensilsClass.selectedUstensils.add(ustensilItem.textContent)
      const spanTag = document.createElement('span')
      spanTag.setAttribute('class', 'd-flex')
      const pTag = document.createElement('p')
      pTag.textContent = ustensilItem.textContent
      spanTag.appendChild(pTag)
      const buttonTag = document.createElement('i')
      buttonTag.setAttribute('class', 'fas fa-times btn-close-perso')
      buttonTag.addEventListener('click', closeEvent)
      spanTag.appendChild(buttonTag)
      divSelectedTag.appendChild(spanTag)
      // console.log('current', ingredientsClass.currentIngredients, ingredientsItem)
      ustensilsClass.currentUstensils.delete(ustensilItem.textContent)
      // console.log('liste', ingredientsClass.currentIngredients)
      ustensilsClass.showUstensil()
      // closeBtn()
      selectRecipeWithFilterUstensil()
    })
  })
}

let cpt = 0
/*
* permet à l'utilisateur de rechercher un ustensile
* met à jour la liste à chaque caractère tapé
*/
export function listener () {
  const searchInput = document.getElementsByClassName('ustensil-search__input')[0]
  // console.log('search input', searchInput)
  const ustensilSearch = new Set()
  searchInput.addEventListener('input', () => {
    cpt += 1
    console.log('listener', cpt)
    ustensilSearch.clear()
    const ustensilItems = document.querySelectorAll('li.ustensil-item')
    ustensilItems.forEach(ustensilItem => ustensilItem.remove())
    ustensilsClass.currentUstensils.forEach(ustensil => {
      if (ustensil.toLowerCase().match(searchInput.value.toLowerCase())) {
        // ingredientsClass.currentIngredients.add(ingredient)
        ustensilSearch.add(ustensil)
      }
    })
    ustensilsClass.showUstensil(ustensilSearch)
    // console.log('tab', ingredientsClass.currentIngredients)
  })
}

function closeEvent (event) {
// supprimer l'élément de la liste des filtres et des éléments sélectionnés
  // et le rajouter dans la liste des tags
  const closeButton = event.target
  ustensilsClass.currentUstensils.add(closeButton.parentNode.firstChild.textContent)
  ustensilsClass.currentUstensils = new Set(Array.from(ustensilsClass.currentUstensils).sort())
  ustensilsClass.showUstensil()
  // console.log('tab', ingredientsClass.selectedIngredients)
  ustensilsClass.selectedUstensils.delete(closeButton.parentNode.firstChild.textContent)
  // console.log('parent', closeButton.parentNode.parentNode, 'child', closeButton.parentNode)
  closeButton.parentNode.parentNode.removeChild(closeButton.parentNode)
  selectRecipeWithFilterUstensil()
}

/* Fonction qui parcourt les recettes
* et sélectionne celles qui contiennent les appareils filtrés */
function selectRecipeWithFilterUstensil () {
  // console.log('appel selectrecipe')
  const recipesToDisplay = []
  ustensilsClass.filteredRecipes.splice(0, ustensilsClass.filteredRecipes.length)
  recipesArray.forEach(recipe => {
    let recipeToDisplayBool = true
    ustensilsClass.selectedUstensils.forEach(ustensil => {
      const result = recipe.ustensils.includes(ustensil.toLowerCase())
      if (!result) {
        recipeToDisplayBool = false
      }
    })
    if (recipeToDisplayBool === true) {
      recipesToDisplay.push(recipe)
      ustensilsClass.filteredRecipes.push(recipe)
    }
  })
  displayFilteredRecipes()
}
