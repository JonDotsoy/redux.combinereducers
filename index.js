const {combineReducers: originalCombineReducers} = require('redux')

function objectGetAllKeys (obj) {
  return [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]
}

function combineReducers (..._reducers) {
  /* Normalize Reducers */
  const reducers = _reducers.map((proposalReducer) => {
    if (typeof (proposalReducer) === 'function') {
      return proposalReducer
    } else {
      return (state, action) => {
        const propertiesProposalReducer = objectGetAllKeys(proposalReducer)

        const beforeState = [{}, ...propertiesProposalReducer].reduce((preState, propertyName) => {
          // console.log(objectGetAllKeys(state))
          preState[propertyName] = proposalReducer[propertyName]
          return preState
        })

        const nextState = originalCombineReducers(proposalReducer)(beforeState, action)

        const upperState = [state, ...propertiesProposalReducer].reduce((preState, propertyName) => {
          preState[propertyName] = nextState[propertyName]
          return preState
        })

        return (nextState === beforeState) ? Object.assign(state, upperState) : Object.assign({}, upperState)
      }
    }
  })

  return function combination (state, action) {
    return Array.prototype.reduce.call([state, ...reducers], function (currentState, reducer) {
      const nextState = reducer(currentState, action, {a: 3})

      // console.log({currentState, nextState})

      return nextState
    })
  }
}

module.exports = {combineReducers}

