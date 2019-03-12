import React, { useReducer, useContext, useEffect } from 'react'

function appReducer(state, { type, payload }) {
  switch (type) {
    case 'reset':
      return payload
    case 'add':
      return [
        ...state,
        {
          id: Date.now(),
          text: 'input Todo item',
          completed: false
        }
      ]
    case 'delete':
      return state.filter(item => item.id !== payload)
    case 'completed':
      return state.map(item => {
        if (item.id === payload) {
          return {
            ...item,
            completed: !item.completed
          }
        }
        return item
      })
    default:
      return state
  }
}

const Context = React.createContext()

export default function App() {
  const [state, dispatch] = useReducer(appReducer, [])

  useEffect(() => {
    const raw = localStorage.getItem('data')
    dispatch({ type: 'reset', payload: JSON.parse(raw) })
  }, [])

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(state))
  }, [state])

  return (
    <Context.Provider value={dispatch}>
      <div style={{ width: '1020px' }}>
        <h1>TODO LIST</h1>
        <h4>Using React Hooks & React Context API</h4>
        <button onClick={() => dispatch({ type: 'add' })}>NEW TODO</button>
        <br />
        <br />
        <TodoList items={state} />
      </div>
    </Context.Provider>
  )
}

function TodoList({ items }) {
  return items && items.map(item => <TodoItem id={item.id} {...item} />)
}

function TodoItem({ id, completed, text }) {
  const dispatch = useContext(Context)
  return (
    <div
      key={id}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'fit-content'
      }}>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => dispatch({ type: 'completed', payload: id })}
      />
      <input type='text' defaultValue={text} />
      <button onClick={() => dispatch({ type: 'delete', payload: id })}>
        DELETE
      </button>
    </div>
  )
}
