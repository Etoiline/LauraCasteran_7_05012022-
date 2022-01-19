import { recipes } from '../../data/recipes.js'

export default class Appliance {
  constructor () {
    this.allAppliance = new Set()
    this.currentAppliance = new Set()
    this.queryAppliance()
    this.initCurrentAppliance()
    this.showAppliance()
  }

  queryAppliance () {
    recipes.forEach(recipe => {
      const oneAppliance = recipe.appliance
      this.allAppliance.add(oneAppliance[0].toUpperCase() + oneAppliance.substring(1).toLowerCase())
    })
  }

  initCurrentAppliance () {
    this.allAppliance.forEach(appliance => {
      this.currentAppliance.add(appliance)
    })
  }

  showAppliance () {
    const divApplianceSearch = document.getElementsByClassName('appliance-search')[0]
    const ulApplianceSearch = divApplianceSearch.getElementsByTagName('ul')[0]
    const liApplianceSearch = ulApplianceSearch.firstElementChild
    ulApplianceSearch.innerHTML = ''
    ulApplianceSearch.appendChild(liApplianceSearch)
    this.currentAppliance.forEach(ingredient => {
      const liApplianceSearch = document.createElement('li')
      liApplianceSearch.textContent = ingredient
      ulApplianceSearch.appendChild(liApplianceSearch)
    })
  }
}
