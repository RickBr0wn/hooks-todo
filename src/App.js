import React, { useReducer, useContext, useEffect, useRef } from 'react'

// CONST TYPES for Actions
export const UPDATE = 'UPDATE'
export const ADD = 'ADD'
export const DELETE = 'DELETE'
export const COMPLETED = 'COMPLETED'

function appReducer(state, { type, payload }) {
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

const Context = React.createContext()

function useEffectOnce(callback) {
  const didItRun = useRef(false)

  useEffect(() => {
    if (!didItRun.current) {
      callback()
      didItRun.current = true
    }
  })
}

export default function TodosApp() {
  const [state, dispatch] = useReducer(appReducer, [])

  useEffectOnce(() => {
    const raw = localStorage.getItem('data')
    dispatch({ type: UPDATE, payload: raw ? JSON.parse(raw) : [] })
  })

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(state))
  }, [state])

  return (
    <Context.Provider value={dispatch}>
      <div style={{ width: '400px', margin: '0 auto' }}>
        <h1>Todos App</h1>
        <button onClick={() => dispatch({ type: ADD })}>New Todo</button>
        <br />
        <br />
        <TodosList items={state} />
      </div>
    </Context.Provider>
  )
}

function TodosList({ items }) {
  return items.map(item => <TodoItem key={item.id} {...item} />)
}

function TodoItem({ id, completed, text }) {
  const dispatch = useContext(Context)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '200px'
      }}>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => dispatch({ type: COMPLETED, payload: id })}
      />
      <input type='text' defaultValue={text} />
      <button onClick={() => dispatch({ type: DELETE, payload: id })}>
        Delete
      </button>
    </div>
  )
}
