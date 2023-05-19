import React, {useState} from 'react';
import type { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, incrementAsync } from './features/counter/counterSlice';

export function ReduxCounter () {
  const count = useSelector((state: RootState) => state.counterReducer.value)
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
      <div>
        <div className="row outer-row">
            <div className="col col-md-8 offset-md-2 col-xs-12">
                <h1>Redux counter test</h1>
            </div>
        </div>
        <div className="row outer-row">
          <div className="col col-md-8 offset-md-2 col-xs-12">
              <button
                  aria-label="Increment value"
                  onClick={() => dispatch(increment())}
              >
                  +
              </button>
              <span>{count}</span>
              <button
                  aria-label="Decrement value"
                  onClick={() => dispatch(decrement())}
              >
                  -
              </button>
            <input
              aria-label="Set increment amount"
              value={incrementAmount}
              onChange={e => setIncrementAmount(e.target.value)}
            />
            <button
              onClick={() =>
                dispatch(incrementByAmount(Number(incrementAmount) || 0))
              }
            >
              Add Amount
            </button>

          </div>
        </div>
        <div>
          <button
            onClick={
              () => {
                // @ts-ignore
                dispatch(incrementAsync(Number(incrementAmount) || 0))
              }
            }
          >
            Add Async
          </button>
        </div>
      </div>
  );
}
