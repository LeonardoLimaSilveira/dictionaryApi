import React from 'react'
import { ReactComponent as Search } from './components/images/search.svg'
import axios from 'axios'
import playImg from './components/images/pLAY.png'
import { ReactComponent as MediaPause } from './components/images/mediaPause.svg'

const Main = () => {
  const [data, setData] = React.useState()
  const [input, setInput] = React.useState('keyboard')
  const [error, setError] = React.useState(false)
  const [audio, setAudio] = React.useState([])
  const [play, setPlay] = React.useState(false)

  function handleChange(e) {
    setInput(e.target.value)
  }
  function handleAudio() {
    const wordAudio = document.getElementById('audio')
    if (play && wordAudio) {
      wordAudio.pause()
      setPlay(false)
    } else {
      async function tocar() {
        if (audio && wordAudio) {
          wordAudio.setAttribute('src', audio)
          await wordAudio.play()
          setPlay(true)
        }
      }
      tocar()
    }
    return
  }

  function handlePlay(e) {
    setPlay(true)
  }

  function stopped() {
    setPlay(false)
  }

  React.useEffect(() => {
    async function Fetch() {
      if (input) {
        axios
          .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
          .then(r => {
            setError(false)
            setData(r.data)
            console.log(data)
            r.data.map(item => {
              if (item.phonetics.length > 0) {
                return item.phonetics.filter(item =>
                  item.audio.includes(input) ? setAudio(item.audio) : ''
                )
              }
              return
            })
          })
          .catch(e => {
            setError(true)
          })
      }
    }
    Fetch()
  }, [, input])

  return (
    <div className="mt-24">
      <div className="flex items-center justify-between bg-[#f4f4f4] h-16 rounded-3xl">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className="bg-[#f4f4f4] outline-none border-none ml-6 text-xl font-bold tracking-wider"
        />
        <Search className="w-5 h-5 mr-2" />
      </div>
      {error && (
        <h1 className="text-red-700 ">
          Can't find the word, make sure if you type it correctly
        </h1>
      )}
      {!error && data && (
        <div>
          <div className="flex justify-between items my-6 py-8">
            <div>
              <h1 className="font-bold text-7xl">{data[0].word}</h1>
              <p className="mt-4 text-lg text-extendPurple">
                {data[0].phonetic}
              </p>
            </div>
            <button
              onClick={handleAudio}
              className="w-[60px] h-[60px] my-auto rounded-full flex items-center justify-center bg-[#e9d0fa] hover:bg-[#D6b4ea] ease-out duration-300"
            >
              {play ? (
                <MediaPause className="w-7 h-7" />
              ) : (
                <img src={playImg} alt="" className="w-7 h-7" />
              )}
            </button>
            <audio id="audio" src={audio} onPlay={handlePlay} onEnded={stopped}>
              <source src={audio} type="audio/mpeg" />
            </audio>
          </div>
          <div className="grid grid-cols-12 items-center">
            <span className="font-bold text-lg col-auto">noun</span>
            <div className="h-[2px] w-[100%] bg-extendLightGray col-span-11 "></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Main
