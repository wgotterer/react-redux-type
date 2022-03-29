import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDateStart, start, stop } from '../../redux/recorder';
import './Recorder.css';
import cx from 'classnames';
import { addZero } from '../../lib/utils';



const Recorder = () => {
  // dispatch sends info to the store regarding which action we want to use
  const dispatch = useDispatch();

  //   useSelector allows us to grab ahold of the particular slice of state in the store
  const dateStart = useSelector(selectDateStart);

  const started = dateStart !== '';

  let interval = useRef<number>(0);
  const [, setCount] = useState<number>(0);

  const handleClick = () => {
      if(started){
        window.clearInterval(interval.current)
        dispatch(stop())
      }else {
        dispatch(start());
        interval.current = window.setInterval(() => {
          setCount((count) => count + 1);
        }, 1000);
      }
  
  };

  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);



// timestamp from Date.now is in millisecs so divide by 1000 to get seconds
  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;

    const hours = seconds ? Math.floor(seconds / 60 / 60) : 0

    seconds -= hours * 60 * 60

    const minutes = seconds ? Math.floor(seconds / 60) : 0

    seconds -= minutes * 60

  return (
    //   using the cx package allows for conditionally rendering classNames in a nice way.
    // the first argument is the default and the second is an
    // object that displays the classname is the condition in the value is true
    <div className={cx('recorder', { 'recorder-started': started })}>
      <button onClick={handleClick} className="recorder-record">
        <span></span>
      </button>
      <div className="recorder-counter">{addZero(hours)}:{addZero(minutes)}:{addZero(seconds)} </div>
    </div>
  );
};

export default Recorder;
