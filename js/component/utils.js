import { ingredientsClass, applianceClass, ustensilsClass } from '../index.js'

/**
 * Supprime les recettes et affiche seulement celles filtrées
 */
export function displayFilteredRecipes () {
  const divRecipes = document.getElementsByClassName('recipes')[0]
  divRecipes.innerHTML = ''
  let ingredientApplianceArray = []
  ingredientApplianceArray = ingredientsClass.filteredRecipes.filter(recipe => applianceClass.filteredRecipes.includes(recipe))
  if (ingredientApplianceArray.length === 0) {
    divRecipes.innerHTML = '<p> Aucune recette correspondante</p>'
  } else {
    let ingrApplUstArray = []
    ingrApplUstArray = ingredientApplianceArray.filter(recipe => ustensilsClass.filteredRecipes.includes(recipe))
    if (ingrApplUstArray.length === 0) {
      divRecipes.innerHTML = '<p> Aucune recette correspondante</p>'
    } else {
      ingrApplUstArray.forEach(recipe => {
        divRecipes.appendChild(recipe.recipeFactory())
      })
    }
  }
}
