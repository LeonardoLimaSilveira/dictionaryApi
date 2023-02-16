import React from 'react'
import { ReactComponent as Search } from './components/images/search.svg'
import axios from 'axios'
import playImg from './components/images/pLAY.png'

const Main = () => {
  const [data, setData] = React.useState()
  const [input, setInput] = React.useState('keyboard')
  const [error, setError] = React.useState(false)
  const [audio, setAudio] = React.useState()
  const [play, setPlay] = React.useState(false)

  const x = document.getElementById('audio')

  function handleChange(e) {
    setInput(e.target.value)
  }
  function handleAudio() {
    x.play()
  }
  React.useEffect(() => {
    if (input) {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
        .then(r => {
          setError(false)
          setData(r.data)
          data.map(item => {
            setAudio(item.phonetics)
            return
          })
        })
        .catch(e => {
          setError(true)
        })
    }
  }, [input])

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
          <h1>{data[0].word}</h1>
          <button
            onClick={handleAudio}
            className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#e9d0fa] hover:bg-[#D6b4ea] ease-out duration-300"
          >
            <img src={playImg} alt="" className="w-6 h-6" />
          </button>
          <audio
            id="audio"
            onPlay={() => {
              console.log('começou')
            }}
          >
            <source
              src={audio.map(item => {
                console.log(item.audio !== '')
                return item.audio !== '' ? item.audio.trim(',', '') : ''
              })}
              type="audio/mpeg"
            />
          </audio>
        </div>
      )}
    </div>
  )
}

export default Main