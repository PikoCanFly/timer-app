import React, { useState, useEffect, useRef } from 'react'
import alarmAudio from "../assets/audio/sound.mp3"
import InputField from './InputField'

const Timer = ({isOverlayMode}) => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(1) // Default to 1 minute
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  // const [isOverlayMode, setIsOverlayMode] = useState(false)
  const audio = new Audio(alarmAudio)
  useEffect(() => {
    let intervalId

    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else {
          if (minutes === 0 && hours === 0) {
            audio.play()

            clearInterval(intervalId)
            setIsActive(false)
          } else {
            if (minutes === 0) {
              setHours((hours) => hours - 1)
              setMinutes(59)
            } else {
              setMinutes((minutes) => minutes - 1)
            }
            setSeconds(59)
          }
        }
      }, 1000)
    } else {
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [isActive, hours, minutes, seconds])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const editTimer = () => {
    setIsActive(false)
    setIsEditing(true)
  }

  const saveTimer = () => {
    setIsEditing(false)
  }

  // const resetTimer = () => {
  //   setHours(0)
  //   setMinutes(1) // Reset to default 1 minute
  //   setSeconds(0)
  //   setIsActive(false)
  // }

  const pauseTimer = () => {
    setIsActive(false)
  }

  // const toggleOverlayMode = () => {
  //   setIsOverlayMode(!isOverlayMode);
  // };

  return (
    <div>
      {isEditing ? (
        <div className='flex justify-center items-center pl-10'>
        <div id="input-fields" className="z-10 text-stone-300 text-justify">
          <InputField
            label="Hours"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
          />
          <InputField
            label="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
          />
          <InputField
            label="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
          />
          {/* save */}

          <div className='flex justify-center items-center '>
          </div>

          <button
            onClick={saveTimer}
            className=" text-xl radius-5 rounded-lg bg-blue-500 p-1 text-stone-200 mt-2 font-bold py-2 ml-2 px-20  "
          >
            &#10004;{' '}
          </button>
        </div>
        </div>
      ) : (
        <div className="text-green-600">
          <h1 className="text-green-500 text-6xl">{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>

          <div
            id="timer-buttons"
            className={!isOverlayMode?"bg-black items-center justify-center flex bg-opacity-10 rounded-md":"hidden"}
          >
            {isActive ? (
              <>
                {/* stop */}
                <button
                  onClick={toggleTimer}
                  className="drop-shado-xl text-5xl border-red-500 p-2 text-red-500 m-2 font-bold hover:scale-110"
                >
                  &#9724;
                </button>
                {/* pause */}
                <button
                  onClick={pauseTimer}
                  className="text-4xl border-yellow-500 p-2 text-amber-600 m-2 font-bold  hover:scale-110"
                >
                  ||
                </button>
              </>
            ) : (
              // start
              <button
                onClick={toggleTimer}
                className="text-5xl border-green-500 p-2 text-green-500 m-2 font-bold hover:scale-110"
              >
                &#9658;
              </button>
            )}
            {/* edit */}
            <button
              onClick={editTimer}
              className="text-4xl  border-yellow-500 p-2 text-yellow-500 m-2 font-bold hover:scale-110"
            >
              &#9998;
            </button>
            {/* reset */}

            {/* <button onClick={resetTimer} className='text-5xl border-blue-500 p-2 text-blue-500 m-2 font-bold'>&#10227;
          </button> */}
          </div>
      
        </div>
      )}
    </div>
  )
}

export default Timer
