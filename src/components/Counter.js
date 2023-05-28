import classes from './Counter.module.css';
import {useSelector, useDispatch} from 'react-redux'
import {counterActions} from '../store/index'

const Counter = () => {

  const counter=useSelector(state=>state.counter.counter)
  const dispatch=useDispatch();
 const show= useSelector(state=>state.showCounter)

  const incrementHandler=()=>{
    dispatch(counterActions.increment());
  }

  const increaseHandler=()=>{
    dispatch(counterActions.increase(5))
  }
  const decrementHandler=()=>{
    dispatch(counterActions.decrement())
  }
  
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase By 5</button>
        <button onClick={decrementHandler}>Decrment</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
