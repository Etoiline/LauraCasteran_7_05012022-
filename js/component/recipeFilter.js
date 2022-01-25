import * as indexJs from '../index.js'

/* Fonction qui parcours les recettes
* et sélectionne celles qui contiennent les ingrédients filtrés */
export function selectRecipeWithFilterIngredient () {
  console.log('appel selectrecipe')
  const recipesToDisplay = []
  indexJs.recipesArray.forEach(recipe => {
    let recipeToDisplayBool = true
    indexJs.ingredientsClass.selectedIngredients.forEach(ingredient => {
      const result = recipe.ingredients.includes(ingredient)
      if (!result) {
        recipeToDisplayBool = false
      }
    })
    if (recipeToDisplayBool==true) {
      recipesToDisplay.push(recipe)
    }
  })
  return recipesToDisplay
}
