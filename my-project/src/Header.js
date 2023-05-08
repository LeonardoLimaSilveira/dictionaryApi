import React from 'react'
import Switch from '@mui/material/Switch'
import { Select, Space } from 'antd'
import Moon from './components/images/Moon'
import { GlobalContext } from './useContext'
import Book from './components/images/Book'

const Header = () => {
  const { theme, setTheme, setFont } = React.useContext(GlobalContext)

  React.useEffect(() => {
    if (theme) {
      return document
        .querySelector('body')
        .classList.add(`dark`, `bg-[#050505]`)
    } else {
      return document
        .querySelector('body')
        .classList.remove(`dark`, `bg-[#050505]`)
    }
  }, [theme])

  return (
    <div className="flex items-center justify-between h-16 xsm:max-w-[90%] xsm:mx-auto">
      <div className="  ">
        <Book color={theme ? '#5b5a5a' : '#000'} className="w-12 h-w-12 " />
      </div>
      <div className="flex items-center">
        <div>
          <Space wrap className=" ">
            <Select
              className="dark:text-white dark:bg-[#ffffff]  dark:rounded-xl "
              defaultValue="Serif"
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
