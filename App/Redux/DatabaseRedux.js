import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reset: null,
  addAnimal: ['animalData'],
  updateAnimal: ['id', 'newName'],
  removeAnimal: ['id']
})

export const DatabaseTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  animals: {
    0: {
      id: 0,
      name: 'Test',
      type: 'Unknown',
      species: null,
      birthdate: {
        day: 1,
        month: 0,
        year: 1960,
      },
    }
  },
  nextAnimalId: 1,
  test: 'Test text',
  events: [],
})

/* ------------- Selectors ------------- */

export const DatabaseSelectors = {
  getAnimals: state => state.animals
}

/* ------------- Reducers ------------- */

// Add a new animal
export const performReset = (state) => {
  return Object.assign({}, INITIAL_STATE)
}

// Add a new animal
export const performAddAnimal = (state, { animalData }) => {
  let newList = Object.assign({}, state.animals),
      id = state.nextAnimalId,
      newAnimal;

  newAnimal = {
    id: id,
    name: animalData.name,
    type: animalData.type,
    species: animalData.species,
  }

  if(animalData.date) {
    newAnimal.birthdate = {
      day: animalData.date.getDate(),
      month: animalData.date.getMonth(),
      year: animalData.date.getYear() + 1900
    }
  }
  else {
    newAnimal.birthdate = {}
  }

  newList[id] = newAnimal;

  return {
    ...state,
    nextAnimalId: id + 1,
    animals: newList
  }
}

// Update animal
export const performUpdateAnimal = (state, { id, newName }) => {
  let newList = Object.assign({}, state.animals)
  state.animals[id] = { id: id, name: newName }
  return {
    ...state,
    animals: newList
  }
}

// Remove animal
export const performRemoveAnimal = (state, { id }) => {
  let newList = Object.assign({}, state.animals)
  delete newList[id]
  return {
    ...state,
    animals: newList
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET]: performReset,
  [Types.ADD_ANIMAL]: performAddAnimal,
  [Types.UPDATE_ANIMAL]: performUpdateAnimal,
  [Types.REMOVE_ANIMAL]: performRemoveAnimal,
})
