import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reset: null,
  addAnimal: ['animalData'],
  updateAnimal: ['id', 'animalData'],
  removeAnimal: ['id'],
  addEvent: ['eventData'],
  updateEvent: ['id', 'eventData'],
  removeEvent: ['id'],
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
  events: {
    0: {
      id: 0,
      animalId: 0,
      type: 'Feeding',
      date: {
        day: 1,
        month: 0,
        year: 1960,
      },
      time: {
        hour: 0,
        minute: 0,
      },
      notes: 'Test',
    },
  },
  nextEventId: 1,
})

/* ------------- Selectors ------------- */

export const DatabaseSelectors = {
  getAnimals: state => state.animals
}

/* ------------- Helpers ------------- */

function setAnimalData(id, animalData) {
  let newAnimal = {
    id: id,
    name: animalData.name,
    type: animalData.type,
    species: animalData.species,
  }

  if(animalData.date) {
    newAnimal.birthdate = {
      day: animalData.date.getDate(),
      month: animalData.date.getMonth(),
      year: animalData.date.getYear() + 1900,
    }
  }
  else {
    newAnimal.birthdate = {}
  }

  return newAnimal;
};

function setEventData(id, eventData) {
  let newEvent = {
    id: id,
    animalId: eventData.animalId,
    type: eventData.type,
    notes: eventData.notes,
    time: eventData.time,
  }

  if(eventData.date) {
    newEvent.date = {
      day: eventData.date.getDate(),
      month: eventData.date.getMonth(),
      year: eventData.date.getYear() + 1900,
    }
  }
  else {
    newEvent.date = {}
  }

  return newEvent;
};

/* ------------- Reducers ------------- */

// Add a new animal
export const performReset = (state) => {
  return Object.assign({}, INITIAL_STATE)
}

// Add a new animal
export const performAddAnimal = (state, { animalData }) => {
  let newList = Object.assign({}, state.animals),
      id = state.nextAnimalId,
      newAnimal = setAnimalData(id, animalData);

  newList[id] = newAnimal;

  return {
    ...state,
    nextAnimalId: id + 1,
    animals: newList
  }
}

// Update animal
export const performUpdateAnimal = (state, { id, animalData }) => {
  let newList = Object.assign({}, state.animals),
      newAnimal = setAnimalData(id, animalData);

  newList[id] = newAnimal;
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

// Add new event
export const performAddEvent = (state, { eventData }) => {
  let newList = Object.assign({}, state.events),
      id = state.nextEventId,
      newEvent = setEventData(id, eventData);

  newList[id] = newEvent;

  return {
    ...state,
    nextEventId: id + 1,
    events: newList
  }
}

// Update event
export const performUpdateEvent = (state, { id, eventData }) => {
  let newList = Object.assign({}, state.events),
      newEvent = setEventData(id, eventData);

  newList[id] = newEvent;
  return {
    ...state,
    events: newList
  }
}

// Remove event
export const performRemoveEvent = (state, { id }) => {
  let newList = Object.assign({}, state.events)
  delete newList[id]
  return {
    ...state,
    events: newList
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET]: performReset,
  [Types.ADD_ANIMAL]: performAddAnimal,
  [Types.UPDATE_ANIMAL]: performUpdateAnimal,
  [Types.REMOVE_ANIMAL]: performRemoveAnimal,
  [Types.ADD_EVENT]: performAddEvent,
  [Types.UPDATE_EVENT]: performUpdateEvent,
  [Types.REMOVE_EVENT]: performRemoveEvent,
})
