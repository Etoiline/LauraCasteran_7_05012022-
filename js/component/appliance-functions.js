import { applianceClass, recipesArray } from '../index.js'
import { displayFilteredRecipes } from './utils.js'

/*
* cliquer sur un appareil dans la liste afin de le sélectionner
* l'ajouter dans la liste des filtres actifs
* le supprimer de la liste des tags (on ne peut pas sélectionner deux fois le même)
*/
export function selectAppliance () {
  // console.log('select appliance')
  const applianceItems = document.querySelectorAll('li.appliance-item')
  const divSelectedTag = document.getElementsByClassName('search-tags__appliance')[0]
  applianceItems.forEach(applianceItem => {
    applianceItem.addEventListener('click', () => {
      // console.log('clic tag appareil', applianceItem)
      applianceClass.selectedAppliance.add(applianceItem.textContent)
      const spanTag = document.createElement('span')
      spanTag.setAttribute('class', 'd-flex')
      const pTag = document.createElement('p')
      pTag.textContent = applianceItem.textContent
      spanTag.appendChild(pTag)
      // const buttonTag = document.createElement('button')
      // buttonTag.setAttribute('type', 'button')
      // buttonTag.setAttribute('class', 'btn-close')
      // buttonTag.setAttribute('id', 'btn-close-perso')
      // buttonTag.setAttribute('aria-label', 'Close')
      const buttonTag = document.createElement('i')
      buttonTag.setAttribute('class', 'fas fa-times btn-close-perso')
      buttonTag.addEventListener('click', closeEvent)
      spanTag.appendChild(buttonTag)
      divSelectedTag.appendChild(spanTag)
      // console.log('current', ingredientsClass.currentIngredients, ingredientsItem)
      applianceClass.currentAppliance.delete(applianceItem.textContent)
      // console.log('liste', ingredientsClass.currentIngredients)
      applianceClass.showAppliance()
      // closeBtn()
      selectRecipeWithFilterAppliance()
    })
  })
}

let cpt = 0
/*
* permet à l'utilisateur de rechercher un appareil
* met à jour la liste à chaque caractère tapé
*/
export function listener () {
  const searchInput = document.getElementsByClassName('appliance-search__input')[0]
  // console.log('search input', searchInput)
  const applianceSearch = new Set()
  searchInput.addEventListener('input', () => {
    cpt += 1
    console.log('listener', cpt)
    applianceSearch.clear()
    const applianceItems = document.querySelectorAll('li.appliance-item')
    applianceItems.forEach(applianceItem => applianceItem.remove())
    applianceClass.currentAppliance.forEach(appliance => {
      if (appliance.toLowerCase().match(searchInput.value.toLowerCase())) {
        // ingredientsClass.currentIngredients.add(ingredient)
        applianceSearch.add(appliance)
      }
    })
    applianceClass.showAppliance(applianceSearch)
    // console.log('tab', ingredientsClass.currentIngredients)
    // selectIngredient()
  })
  //  selectIngredient()
}

function closeEvent (event) {
// supprimer l'élément de la liste des filtres et des éléments sélectionnés
  // et le rajouter dans la liste des tags
  const closeButton = event.target
  applianceClass.currentAppliance.add(closeButton.parentNode.firstChild.textContent)
  applianceClass.currentAppliance = new Set(Array.from(applianceClass.currentAppliance).sort())
  applianceClass.showAppliance()
  // console.log('tab', ingredientsClass.selectedIngredients)
  applianceClass.selectedAppliance.delete(closeButton.parentNode.firstChild.textContent)
  // console.log('parent', closeButton.parentNode.parentNode, 'child', closeButton.parentNode)
  closeButton.parentNode.parentNode.removeChild(closeButton.parentNode)
  selectRecipeWithFilterAppliance()
}

/* Fonction qui parcourt les recettes
* et sélectionne celles qui contiennent les appareils filtrés */
function selectRecipeWithFilterAppliance () {
  // console.log('appel selectrecipe')
  const recipesToDisplay = []
  applianceClass.filteredRecipes.splice(0, applianceClass.filteredRecipes.length)
  recipesArray.forEach(recipe => {
    let recipeToDisplayBool = true
    applianceClass.selectedAppliance.forEach(appliance => {
      const result = recipe.appliance.includes(appliance)
      if (!result) {
        recipeToDisplayBool = false
      }
    })
    if (recipeToDisplayBool === true) {
      recipesToDisplay.push(recipe)
      applianceClass.filteredRecipes.push(recipe)
    }
  })
  displayFilteredRecipes()
}

/**
 * Supprime les recettes et affiche seulement celles filtrées
 */
// function displayFilteredRecipes (recipesToDisplay) {
//   const divRecipes = document.getElementsByClassName('recipes')[0]
//   divRecipes.innerHTML = ''
//   if (recipesToDisplay.length === 0) {
//     divRecipes.innerHTML = '<p> Aucune recette correspondante</p>'
//   } else {
//     recipesToDisplay.forEach(recipe => {
//       divRecipes.appendChild(recipe.recipeFactory())
//     })
//   }
// }
