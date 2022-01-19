import { recipes } from '../../data/recipes.js'

export default class Ustensil {
  constructor () {
    this.allUstensils = new Set()
    this.currentUstensils = new Set()
    this.queryUstensil()
    this.initCurrentUstensil()
    this.showUstensil()
  }

  queryUstensil () {
    recipes.forEach(recipe => {
      recipe.ustensils.forEach(ustensil =>
        this.allUstensils.add(ustensil)
      )
    })
  }

  initCurrentUstensil () {
    this.allUstensils.forEach(ustensil => {
      this.currentUstensils.add(ustensil)
    })
  }

  showUstensil () {
    const divUstensilSearch = document.getElementsByClassName('ustensil-search')[0]
    const ulUstensilSearch = divUstensilSearch.getElementsByTagName('ul')[0]
    const liUstensilSearch = ulUstensilSearch.firstElementChild
    ulUstensilSearch.innerHTML = ''
    ulUstensilSearch.appendChild(liUstensilSearch)
    this.currentUstensils.forEach(ingredient => {
      const liUstensilSearch = document.createElement('li')
      liUstensilSearch.textContent = ingredient
      ulUstensilSearch.appendChild(liUstensilSearch)
    })
  }
}
