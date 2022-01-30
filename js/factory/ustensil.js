import { recipes } from '../../data/recipes.js'
import * as ustensilSearch from '../component/ustensil-functions.js'

export default class Ustensil {
  constructor () {
    this.allUstensils = new Set()
    this.currentUstensils = new Set()
    this.selectedUstensils = new Set()
    this.filteredRecipes = []
    this.queryUstensil()
    this.initCurrentUstensil()
    this.initShowUstensil()
  }

  /*
  * récupère et formatte la liste des ustensiles
  */
  queryUstensil () {
    recipes.forEach(recipe => {
      recipe.ustensils.forEach(ustensil => {
        this.allUstensils.add(ustensil[0].toUpperCase() + ustensil.substring(1).toLowerCase())
      })
    })
    this.allUstensils = Array.from(this.allUstensils).sort()
  }

  /*
  * initialise la liste currentUstensil à la même valeur que allUstensil
  * c'est au premier affichage de la page, aucune recherche n'a encore été effectuée
  */
  initCurrentUstensil () {
    this.allUstensils.forEach(ustensil => {
      this.currentUstensils.add(ustensil)
    })
  }

  /*
  * initialise l'affichage des ustensiles dans le dropdown
  */
  initShowUstensil () {
    const divUstensilSearch = document.getElementsByClassName('ustensil-search')[0]
    const ulUstensilSearch = divUstensilSearch.getElementsByTagName('ul')[0]
    const liUstensilSearch = ulUstensilSearch.firstElementChild
    ulUstensilSearch.innerHTML = ''
    ulUstensilSearch.appendChild(liUstensilSearch)
    this.currentUstensils.forEach(ustensil => {
      const liUstensil = document.createElement('li')
      liUstensil.setAttribute('class', 'ustensil-item')
      liUstensil.textContent = ustensil
      ulUstensilSearch.appendChild(liUstensil)
    })
    ustensilSearch.listener()
  }

  showUstensil (ustenilList = this.currentUstensils) {
    // effacer le contenu pour le remplacer
    const ustensilItemToDelete = document.querySelectorAll('li.ustensil-item')
    ustensilItemToDelete.forEach(ustensilDelete => {
      ustensilDelete.remove()
    })
    const divUstensilSearch = document.getElementsByClassName('ustensil-search')[0]
    const ulUstensilSearch = divUstensilSearch.getElementsByTagName('ul')[0]
    ustenilList.forEach(ustensil => {
      const liUstensil = document.createElement('li')
      liUstensil.setAttribute('class', 'ustensil-item')
      liUstensil.textContent = ustensil
      ulUstensilSearch.appendChild(liUstensil)
    })
    ustensilSearch.selectUstensil()
  }
}
