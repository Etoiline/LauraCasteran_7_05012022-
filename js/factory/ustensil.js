import { recipes } from '../../data/recipes.js'
import * as ustensilSearch from '../component/ustensil-functions.js'

/*
* La classe ustensil contient quatre sets :
* allUstensils : contient l'ensemble des ustensiles récupérés dans toutes les recettes
*                  cette variable sert à initialiser l'affichage et ne sera jamais modifiée
* currentUstensils : contient les ustensiles en tenant en compte des filtres choisis
*                   cette variable évoluera selon les recherches de l'utilisateur
* selectedUstensils : contient l'ensemble des ustensiles sélectionnés
* displayedUstensils : contient les ustensiles affichés dans le dropdown
*                        selon les recettes affichées
*/

export default class Ustensil {
  constructor () {
    this.allUstensils = new Set()
    this.currentUstensils = new Set()
    this.selectedUstensils = new Set()
    this.displayedUstensils = new Set()
    this.filteredRecipes = []
    this.queryUstensil()
    this.initCurrentUstensil()
    this.initShowUstensil()
  }

  /*
  * récupère et formatte la liste des ustensiles
  * première lettre en majuscule et tri par ordre alphabétique
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
  * initialise la liste currentUstensil et displayedUstensil à la même valeur que allUstensil
  * c'est au premier affichage de la page, aucune recherche n'a encore été effectuée
  */
  initCurrentUstensil () {
    this.allUstensils.forEach(ustensil => {
      this.currentUstensils.add(ustensil)
      this.displayedUstensils.add(ustensil)
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

  /*
  * Affichage des ustensiles dans le dropdown selon les recherches et les recettes restantes
  */
  showUstensil (ustenilList = this.displayedUstensils) {
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
