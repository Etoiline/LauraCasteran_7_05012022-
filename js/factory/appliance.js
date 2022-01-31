import { recipes } from '../../data/recipes.js'
import * as applianceSearch from '../component/appliance-functions.js'
/*
* La classe appliance contient trois sets :
* allAppliance : contient l'ensemble des appareils récupérés dans toutes les recettes
*                  cette variable sert à initialiser l'affichage et ne sera jamais modifiée
* currentAppliance : contient les appareils en tenant en compte des filtres choisis
*                   cette variable évoluera selon les recherches de l'utilisateur
* selectedAppliance : contient l'ensemble des appareils sélectionnés
*/

export default class Appliance {
  constructor () {
    this.allAppliance = new Set()
    this.currentAppliance = new Set()
    this.selectedAppliance = new Set()
    this.displayedAppliance = new Set()
    this.filteredRecipes = []
    this.queryAppliance()
    this.initCurrentAppliance()
    this.initShowAppliance()
  }

  /*
  * récupère et formatte la liste des appareils
  */
  queryAppliance () {
    recipes.forEach(recipe => {
      const oneAppliance = recipe.appliance
      this.allAppliance.add(oneAppliance[0].toUpperCase() + oneAppliance.substring(1).toLowerCase())
    })
    this.allAppliance = Array.from(this.allAppliance).sort()
  }

  /*
  * initialise la liste currentAppliance à la même valeur que allAppliance
  * c'est au premier affichage de la page, aucune recherche n'a encore été effectuée
  */
  initCurrentAppliance () {
    this.allAppliance.forEach(appliance => {
      this.currentAppliance.add(appliance)
      this.displayedAppliance.add(appliance)
    })
  }

  /*
  * initialise l'affichage des appareils dans le dropdown
  */
  initShowAppliance () {
    const divApplianceSearch = document.getElementsByClassName('appliance-search')[0]
    const ulApplianceSearch = divApplianceSearch.getElementsByTagName('ul')[0]
    const liApplianceSearch = ulApplianceSearch.firstElementChild
    ulApplianceSearch.innerHTML = ''
    ulApplianceSearch.appendChild(liApplianceSearch)
    this.currentAppliance.forEach(appliance => {
      const liAppliance = document.createElement('li')
      liAppliance.setAttribute('class', 'appliance-item')
      liAppliance.textContent = appliance
      ulApplianceSearch.appendChild(liAppliance)
    })
    applianceSearch.listener()
  }

  showAppliance (applianceList = this.displayedAppliance) {
    // effacer le contenu pour le remplacer
    const applianceItemToDelete = document.querySelectorAll('li.appliance-item')
    applianceItemToDelete.forEach(applianceDelete => {
      applianceDelete.remove()
    })
    // console.log('querydelete', ingredientItemToDelete)
    const divApplianceSearch = document.getElementsByClassName('appliance-search')[0]
    const ulApplianceSearch = divApplianceSearch.getElementsByTagName('ul')[0]
    applianceList.forEach(appliance => {
      const liAppliance = document.createElement('li')
      liAppliance.setAttribute('class', 'appliance-item')
      liAppliance.textContent = appliance
      ulApplianceSearch.appendChild(liAppliance)
    })
    applianceSearch.selectAppliance()
  }
}
