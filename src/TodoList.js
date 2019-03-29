import React from 'react'
import TodoItem from './TodoItem'

export default function TodosList({ items }) {
  return items.map(item => <TodoItem key={item.id} {...item} />)
}
