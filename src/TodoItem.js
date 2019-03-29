import React, { useContext, createContext } from 'react'
import { COMPLETED, DELETE } from './Constants'

export const Context = createContext()

export default function TodoItem({ id, completed, text }) {
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
