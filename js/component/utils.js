import { ingredientsClass, applianceClass, ustensilsClass } from '../index.js'

/**
 * Supprime les recettes et affiche seulement celles filtrées
 */
export function displayFilteredRecipes () {
  const divRecipes = document.getElementsByClassName('recipes')[0]
  divRecipes.innerHTML = ''
  let ingredientApplianceArray = []
  let ingrApplUstArray = []
  ingredientApplianceArray = ingredientsClass.filteredRecipes.filter(recipe => applianceClass.filteredRecipes.includes(recipe))
  if (ingredientApplianceArray.length === 0) {
    divRecipes.innerHTML = '<p> Aucune recette correspondante</p>'
  } else {
    ingrApplUstArray = ingredientApplianceArray.filter(recipe => ustensilsClass.filteredRecipes.includes(recipe))
    if (ingrApplUstArray.length === 0) {
      divRecipes.innerHTML = '<p> Aucune recette correspondante</p>'
    } else {
      ingrApplUstArray.forEach(recipe => {
        divRecipes.appendChild(recipe.recipeFactory())
      })
    }
  }
  updateTags(ingrApplUstArray)
}

/*
* Fonction qui met à jour les listes contenant les tags à afficher
* en tenant compte des recettes affichées et des tags déjà sélectionnés
*/
function updateTags (ingrApplUstArray) {
// 3 sets qui vont contenir les éléments à afficher dans les tags
  let ingredientDisplayed = new Set()
  let applianceDisplayed = new Set()
  let ustensilDisplayed = new Set()
  ingrApplUstArray.forEach(recipe => {
    // ingrédients
    recipe.ingredients.forEach(ingredient => {
      const oneIngredient = ingredient.ingredient
      if (ingredientsClass.selectedIngredients.has(oneIngredient) === false) {
        ingredientDisplayed.add(oneIngredient[0].toUpperCase() + oneIngredient.substring(1).toLowerCase())
      }
    })

    // appliance
    const oneAppliance = recipe.appliance
    if (applianceClass.selectedAppliance.has(oneAppliance) === false) {
      applianceDisplayed.add(oneAppliance[0].toUpperCase() + oneAppliance.substring(1).toLowerCase())
    }

    // ustensil
    recipe.ustensils.forEach(ustensil => {
      if (ustensilsClass.selectedUstensils.has(ustensil[0].toUpperCase() + ustensil.substring(1).toLowerCase()) === false) {
        ustensilDisplayed.add(ustensil[0].toUpperCase() + ustensil.substring(1).toLowerCase())
      }
    })
  })
  ustensilDisplayed = Array.from(ustensilDisplayed).sort()
  applianceDisplayed = Array.from(applianceDisplayed).sort()
  ingredientDisplayed = Array.from(ingredientDisplayed).sort()

  ingredientsClass.displayedIngredients = ingredientDisplayed
  applianceClass.displayedAppliance = applianceDisplayed
  ustensilsClass.displayedUstensils = ustensilDisplayed
}
