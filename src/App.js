import React, { useReducer, useEffect, useRef } from 'react'
import appReducer from './appReducer'
import { UPDATE, ADD } from './Constants'
import { Context } from './TodoItem'
import TodosList from './TodoList'
import {
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button
} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { createMuiTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 3}px`
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  }
})

function useEffectOnce(callback) {
  const didItRun = useRef(false)

  useEffect(() => {
    if (!didItRun.current) {
      callback()
      didItRun.current = true
    }
  })
}

function TodosApp(props) {
  const { classes } = props
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
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography variant='h3' align='center'>
            Todo App
          </Typography>
          <div>
            <TextField
              id='outlined-dense'
              label='Enter new Todo Item'
              className={classNames(classes.textField, classes.dense)}
              margin='dense'
              variant='outlined'
            />

          </div>
          <button onClick={() => dispatch({ type: ADD })}>New Todo</button>
          <br />
          <br />
          <TodosList items={state} />
        </Paper>
      </main>
    </Context.Provider>
  )
}

export default withStyles(styles)(TodosApp)
