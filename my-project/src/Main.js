import React from 'react'
import { ReactComponent as Search } from './components/images/search.svg'
import axios from 'axios'
import playImg from './components/images/pLAY.png'
import { ReactComponent as MediaPause } from './components/images/mediaPause.svg'
import { ReactComponent as Link } from './components/images/link.svg'

const Main = () => {
  const [data, setData] = React.useState()
  const [input, setInput] = React.useState('keyboard')
  const [error, setError] = React.useState(false)
  const [audio, setAudio] = React.useState([])
  const [play, setPlay] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

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
            setLoading(false)
            r.data.map(item => {
              if (item.phonetics.length > 0) {
                return item.phonetics.filter(item =>
                  item.audio.includes(input) ? setAudio(item.audio) : ''
                )
              }
              return true
            })
          })
          .catch(e => {
            setError(true)
          })
      }
    }
    Fetch()
  }, [input])

  return (
    <div className="mt-24">
      <div className="flex items-center justify-between bg-[#f4f4f4] h-16 rounded-3xl">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className="bg-[#f4f4f4] outline-none outline-0  focus:ring-0 border-none ml-6 text-xl font-bold tracking-wider"
        />
        <Search className="w-5 h-5 mr-2" />
      </div>
      {loading && (
        <div className=" w-full flex justify-center mt-5">
          <button
            disabled
            type="button"
            className="text-white bg-[#a545f2] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2  inline-flex items-center  "
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        </div>
      )}
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

          <div>
            {data[0].meanings.map((item, index) => {
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
                          className="before:content-['•'] my-2 before:text-[#a545f2] before:-left-1 before:absolute before:font-bold text-justify max-w-[95%] mx-auto"
                        >
                          <span className="text-[#2b2b2b]">
                            {item.definition}
                          </span>
                          {item.example && item.example.length > 0 && (
                            <p className="mt-2 mb-8 text-[#acacac] text-base">
                              {item.example && `"${item.example}"`}
                            </p>
                          )}
                        </li>
                      )
                    })}
                  </ul>

                  {item.antonyms && item.antonyms.length > 0 && (
                    <div className="my-14 text-lg">
                      <span className="text-[#acacac] mr-7">Antonyms</span>
                      <h2 className="text-[#a545f2] font-bold inline">
                        {item.antonyms.slice(0, 4).map(item => (
                          <span key={index} className="ml-2">
                            {item} |
                          </span>
                        ))}
                      </h2>
                    </div>
                  )}
                  {item.synonyms && item.synonyms.length > 0 && (
                    <div className="my-14 text-lg">
                      <span className="text-[#acacac] mr-7">Synonyms</span>
                      <h2 className="text-[#a545f2] font-bold inline">
                        {item.synonyms.slice(0, 4).map(item => (
                          <span key={index} className="ml-2">
                            {item} |
                          </span>
                        ))}
                      </h2>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="h-[1px] w-[100%] bg-extendLightGray opacity-50 my-4 "></div>
          {data[0].sourceUrls &&
            data[0].sourceUrls.slice(0, 1).map(item => {
              return (
                <div key={item} className="flex items-center ">
                  <span className="text-[#acacac] text-md">Source</span>
                  <a
                    className="flex ml-3 items-center text-base text-[#2b2b2b] underline"
                    href={item}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item}
                    <Link className="h-3 w-3 ml-1" />
                  </a>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default Main
