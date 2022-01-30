import { recipes } from '../../data/recipes.js'
import * as ingredientSearch from '../component/ingredient-functions.js'
/*
* La classe ingrédients contient quatre sets :
* allIngredients : contient l'ensemble des ingrédients récupérés dans toutes les recettes
*                  cette variable sert à initialiser l'affichage et ne sera jamais modifiée
* currentIngredients : contient les ingredients en tenant en compte des filtres choisis
*                   cette variable évoluera selon les recherches de l'utilisateur
* selectedIngredients : contient l'ensemble des ingrédients sélectionnés
*/

export default class Ingredients {
  constructor () {
    this.allIngredients = new Set()
    this.currentIngredients = new Set()
    this.selectedIngredients = new Set()
    this.filteredRecipes = []
    this.queryIngredients()
    this.initCurrentIngredients()
    this.initShowIngredients()
  }

  /*
  * récupère et formatte la liste des ingrédients
  * première lettre en majuscule et tri par ordre alphabétique
  */
  queryIngredients () {
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const oneIngredient = ingredient.ingredient
        this.allIngredients.add(oneIngredient[0].toUpperCase() + oneIngredient.substring(1).toLowerCase())
      })
    })
    this.allIngredients = Array.from(this.allIngredients).sort()
  }

  /*
  * initialise la liste currentIngredients à la même valeur que allIngredients
  * c'est au premier affichage de la page, aucune recherche n'a encore été effectuée
  */
  initCurrentIngredients () {
    this.allIngredients.forEach(ingredient => {
      this.currentIngredients.add(ingredient)
    })
  }

  /*
  * initialise l'affichage des ingrédients dans le dropdown
  */
  initShowIngredients () {
    const divIngredientSearch = document.getElementsByClassName('ingredient-search')[0]
    const ulIngredientSearch = divIngredientSearch.getElementsByTagName('ul')[0]
    const liIngredientSearch = ulIngredientSearch.firstElementChild
    ulIngredientSearch.innerHTML = ''
    ulIngredientSearch.appendChild(liIngredientSearch)
    this.currentIngredients.forEach(ingredient => {
      const liIngredient = document.createElement('li')
      liIngredient.setAttribute('class', 'ingredient-item')
      liIngredient.textContent = ingredient
      ulIngredientSearch.appendChild(liIngredient)
    })
    ingredientSearch.listener()
  }

  /*
  * Affichage des ingrédients dans le dropdown selon les recherches
  */
  showIngredients (ingredientList = this.currentIngredients) {
    // effacer le contenu pour le remplacer
    const ingredientItemToDelete = document.querySelectorAll('li.ingredient-item')
    ingredientItemToDelete.forEach(ingredientDelete => {
      ingredientDelete.remove()
    })
    // console.log('querydelete', ingredientItemToDelete)
    const divIngredientSearch = document.getElementsByClassName('ingredient-search')[0]
    const ulIngredientSearch = divIngredientSearch.getElementsByTagName('ul')[0]
    ingredientList.forEach(ingredient => {
      const liIngredient = document.createElement('li')
      liIngredient.setAttribute('class', 'ingredient-item')
      liIngredient.textContent = ingredient
      ulIngredientSearch.appendChild(liIngredient)
    })
    ingredientSearch.selectIngredient()
  }
}
