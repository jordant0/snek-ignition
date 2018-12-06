import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addAnimal: ['id', 'name'],
  updateAnimal: ['id', 'newName']
})

export const DatabaseTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  animals: {
    0: {
      id: 0,
      name: 'Test'
    }
  },
  test: 'Test text'
})

/* ------------- Selectors ------------- */

export const DatabaseSelectors = {
  getAnimals: state => state.animals
}

/* ------------- Reducers ------------- */

// Add a new animal
export const performAddAnimal = (state, { id, name }) => {
  let newAnimals = Object.assign({}, state.animals)
  newAnimals[id] = { id: id, name: name }
  return {
    ...state,
    animals: newAnimals
  }
}

// Update animal
export const performUpdateAnimal = (state, { id, newName }) => {
  return {
    ...state,
    id: {
      ...state.id,
      name: newName,
    }
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_ANIMAL]: performAddAnimal,
  [Types.UPDATE_ANIMAL]: performUpdateAnimal
})
