import { UPDATE, ADD, DELETE, COMPLETED } from './Constants'

export default function appReducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      return payload
    }
    case ADD: {
      return [
        ...state,
        {
          id: Date.now(),
          text: '',
          completed: false
        }
      ]
    }
    case DELETE: {
      return state.filter(item => item.id !== payload)
    }
    case COMPLETED: {
      return state.map(item => {
        if (item.id === payload) {
          return {
            ...item,
            completed: !item.completed
          }
        }
        return item
      })
    }
    default: {
      return state
    }
  }
}
