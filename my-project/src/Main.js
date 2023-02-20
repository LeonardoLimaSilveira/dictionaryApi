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
  const [partOfSpeech, setPartOfSpeech] = React.useState([])

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
            {data[0].phonetics.length > 0 && (
              <div>
                {' '}
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
                <audio
                  id="audio"
                  src={audio}
                  onPlay={handlePlay}
                  onEnded={stopped}
                >
                  <source src={audio} type="audio/mpeg" />
                </audio>{' '}
              </div>
            )}
          </div>

          <div className="">
            <ul>
              {data[0].meanings.map((item, index) => {
                console.log(item, index)

                return (
                  <div key={index} className="my-10 text-lg">
                    <div className="grid grid-cols-12 items-center">
                      <span className="font-bold text-xl col-auto italic">
                        {item.partOfSpeech}
                      </span>
                      <div className="h-[1px] w-[100%] bg-extendLightGray opacity-50 col-span-11 "></div>
                      <h2 className="text-[#acacac] mt-6">Meaning</h2>
                    </div>
                    <ul className="max-w-[95%] mx-auto my-4 text-extendGrayText relative ">
                      {item.definitions.slice(0, 4).map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="before:content-['\2022'] my-2 before:text-[#a545f2] before:-left-1 before:absolute before:font-bold text-justify max-w-[95%] mx-auto"
                          >
                            <span className="text-[#2b2b2b]">
                              {item.definition}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )

                // if (item.partOfSpeech.includes('noun')) {
                //   return item.definitions.slice(0, 4).map((item, index) => {
                //     return (
                //       <li
                //         key={index}
                //         className="before:content-['\2022'] my-2 before:text-[#a545f2] before:-left-1 before:absolute before:font-bold text-justify max-w-[95%] mx-auto"
                //       >
                // <span className="text-[#2b2b2b]">
                //   {item.definition}
                // </span>
                //       </li>
                //     )
                //   })
                // }
              })}
            </ul>
            <div className="my-14 text-lg">
              <span className="text-[#acacac] mr-7">
                {data[0].meanings[0].synonyms.length > 0 && 'Synonyms'}
              </span>
              <h2 className="text-[#a545f2] font-bold inline">
                {data[0].meanings.map((item, index) => {
                  if (item.partOfSpeech.includes('noun')) {
                    return item.synonyms.slice(0, 4).map(item => (
                      <span key={index} className="ml-2">
                        {item} |
                      </span>
                    ))
                  }
                })}
              </h2>
            </div>
            <div className="grid grid-cols-12 items-center mt-5">
              <span className="font-bold text-xl col-auto italic">verb</span>
              <div className="h-[1px] w-[100%] bg-extendLightGray opacity-50 col-span-11 "></div>
            </div>
            <div className="my-10">
              <h2 className="text-[#acacac]">Meaning</h2>
              <ul className="max-w-[95%] mx-auto my-4 text-extendGrayText relative ">
                {data[0].meanings.map(item => {
                  if (item.partOfSpeech.includes('verb')) {
                    return item.definitions.slice(0, 2).map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="before:content-['\2022'] my-2 before:text-[#a545f2] before:-left-1 before:absolute before:font-bold text-justify max-w-[95%] mx-auto"
                        >
                          <span className="text-[#2b2b2b]">
                            {item.definition}
                          </span>
                          <p className="mt-2 mb-8 text-[#acacac] text-base">
                            {item.example && `"${item.example}"`}
                          </p>
                        </li>
                      )
                    })
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Main
