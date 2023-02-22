import React from 'react'
import Switch from '@mui/material/Switch'
import { Select, Space } from 'antd'
import book from './components/images/book.png'
import Moon from './components/images/Moon'
import { GlobalContext } from './useContext'

const Header = () => {
  const { theme, setTheme, setFont } = React.useContext(GlobalContext)

  React.useEffect(() => {
    if (theme) {
      return document.querySelector('body').classList.add(`dark`, `bg-black`)
    } else {
      return document.querySelector('body').classList.remove(`dark`, `bg-black`)
    }
  }, [theme])

  return (
    <div className="flex items-center justify-between h-16">
      <div>
        <img src={book} alt="book" className="w-10 h-10" />
      </div>
      <div className="flex items-center">
        <div>
          <Space wrap className=" ">
            <Select
              className="dark:text-white dark:bg-[#ffffff]  dark:rounded-xl "
              defaultValue="serif"
              style={{ width: 120 }}
              onChange={e => {
                window.localStorage.setItem('font', `${e}`)
                setFont(JSON.stringify(localStorage.getItem('font')))
              }}
              bordered={false}
              options={[
                { value: 'font-serif', label: 'Serif' },
                { value: 'font-sans', label: 'Sans' },
                { value: 'font-mono', label: 'Mono' }
              ]}
            />
          </Space>
        </div>
        <div className="flex items-center">
          <Switch
            className="ml-3 mr-2"
            onClick={() => {
              window.localStorage.setItem('theme', !theme)
              setTheme(JSON.parse(localStorage.getItem('theme')))
            }}
          ></Switch>
          <Moon color={!theme ? '#00000' : '#a545f2 '} className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

export default Header
