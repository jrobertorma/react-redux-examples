import {createSlice} from '@reduxjs/toolkit';

// the 'data type' of this slice's state
export interface CounterState {
  value: number
}

// initial state of CounterState data type
const initialState: CounterState = {
  value: 0
}

// creating the slice, it requires a name, an initial state and a set of reducers that define how state change requests will be handled
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number) => (dispatch: any) => {
  setTimeout( () => {
      dispatch(incrementByAmount(amount))
    },1000 );
}

// exporting action creators, createSlice automatically generates action creators with the same names as the reducer functions we wrote.
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// exporting reducers, build automatically by reduxToolkit createSlice() method
export default counterSlice.reducer;
