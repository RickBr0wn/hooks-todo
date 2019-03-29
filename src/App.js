import React, { useReducer, useEffect, useRef } from 'react'
import appReducer from './appReducer'
import { UPDATE, ADD } from './Constants'
import { Context } from './TodoItem'
import TodosList from './TodoList'

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
