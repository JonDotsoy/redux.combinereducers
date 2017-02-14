const expect = require('expect.js')

describe('combineReducers', function () {
  it('combineReducers from Redux', () => {
    const {combineReducers} = require('redux')

    const reducerOne = (state = {}, action) => state
    const reducerTwo = (state = {}, action) => state

    const reducer = combineReducers({
      reducerOne,
      reducerTwo
    })

    const nextState = reducer({}, {type: '(~˘▾˘)~'})

    expect(nextState).to.have.property('reducerOne')
    expect(nextState).to.have.property('reducerTwo')
  })

  it('combineReducers', () => {

    const {combineReducers} = require('redux')




  })

  it('combineReducers', () => {
    const {combineReducers} = require('..')

    const reducerOne = (state = {}, action) => (state.one = 'one', state)
    const reducerTwo = (state = {}, action) => (state.two = 'two', state)
    const reducerThree = (state = {}, action) => (state.three = 'three', state)
    const reducerFour = (state = {}, action) => (state.four = 'four', state)

    const reducer = combineReducers(
      {
        reducerOne,
        reducerTwo
      }
      ,state => (state.five = 'five', state)
      ,{
        reducerThree,
        reducerFour
      }
    )

    const preState = {}
    const nextState = reducer(preState, {type: '~(˘▾˘~)'})

    console.log(nextState === preState)

    expect(nextState).to.have.property('reducerOne')
    expect(nextState).to.have.property('five')
    expect(nextState).to.have.property('reducerTwo')
  })
})

