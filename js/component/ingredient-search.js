import { ingredientsClass } from '../index.js'

/*
* cliquer sur un ingrédient dans la liste afin de le sélectionner
* l'ajouter dans la liste des filtres actifs
* le supprimer de la liste des tags (on ne peut pas sélectionner deux fois le même)
*/
export function selectIngredient () {
  console.log('select ingr')
  const ingredientsItems = document.querySelectorAll('li.ingredient-item')
  const divSelectedTag = document.getElementsByClassName('search-tags__ingredients')[0]
  ingredientsItems.forEach(ingredientsItem => {
    ingredientsItem.addEventListener('click', () => {
      console.log('clic tag ingredients', ingredientsItem)
      const spanTag = document.createElement('span')
      spanTag.setAttribute('class', 'd-flex')
      const pTag = document.createElement('p')
      pTag.textContent = ingredientsItem.textContent
      spanTag.appendChild(pTag)
      // const buttonTag = document.createElement('button')
      // buttonTag.setAttribute('type', 'button')
      // buttonTag.setAttribute('class', 'btn-close')
      // buttonTag.setAttribute('id', 'btn-close-perso')
      // buttonTag.setAttribute('aria-label', 'Close')
      const buttonTag = document.createElement('i')
      buttonTag.setAttribute('class', 'fas fa-times btn-close-perso')
      spanTag.appendChild(buttonTag)
      divSelectedTag.appendChild(spanTag)
      console.log('current', ingredientsClass.currentIngredients, ingredientsItem)
      ingredientsClass.currentIngredients.delete(ingredientsItem.textContent)
      console.log('liste', ingredientsClass.currentIngredients)
      ingredientsClass.showIngredients()
      closeBtn()
    })
  })
}

let cpt = 0
/*
* permet à l'utilisateur de rechercher un ingrédient
* met à jour la liste à chaque caractère tapé
*/
export function listener () {
  const searchInput = document.getElementsByClassName('ingredient-search__input')[0]
  // console.log('search input', searchInput)
  const ingredientSearch = new Set()
  searchInput.addEventListener('input', () => {
    cpt += 1
    console.log('listener', cpt)
    ingredientSearch.clear()
    const ingredientsItems = document.querySelectorAll('li.ingredient-item')
    ingredientsItems.forEach(ingredientItem => ingredientItem.remove())
    ingredientsClass.currentIngredients.forEach(ingredient => {
      if (ingredient.toLowerCase().match(searchInput.value.toLowerCase())) {
        // ingredientsClass.currentIngredients.add(ingredient)
        ingredientSearch.add(ingredient)
      }
    })
    ingredientsClass.showIngredients(ingredientSearch)
    // console.log('tab', ingredientsClass.currentIngredients)
    selectIngredient()
  })
  //  selectIngredient()
}

export function closeBtn () {
  const closeButtons = document.querySelectorAll('.btn-close-perso')
  // console.log('ok', closeButtons)
  closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      // supprimer l'élément de la liste des filtres
      // et le rajouter dans la liste des tags
      // console.log('close', closeButton.parentNode.firstChild.textContent)
      // console.log('close2', ingredientsClass.currentIngredients)
      ingredientsClass.currentIngredients.add(closeButton.parentNode.firstChild.textContent)
      ingredientsClass.currentIngredients = new Set(Array.from(ingredientsClass.currentIngredients).sort())
      ingredientsClass.showIngredients()
      console.log('parent', closeButton.parentNode.parentNode, 'child', closeButton.parentNode)
      closeButton.parentNode.parentNode.removeChild(closeButton.parentNode)
    })
  })
}
