import React from 'react'
import Switch from '@mui/material/Switch'
import { Select, Space } from 'antd'
import book from './components/images/book.png'
import { BsMoon } from 'react-icons/bs'

const Header = () => {
  return (
    <div className="flex items-center justify-between h-16">
      <div>
        <img src={book} alt="book" className="w-10 h-10" />
      </div>
      <div className="flex items-center">
        <div>
          <Space wrap>
            <Select
              defaultValue="serif"
              style={{ width: 120 }}
              bordered={false}
              options={[
                { value: 'serif', label: 'Serif' },
                { value: 'sans', label: 'Sans' },
                { value: 'times', label: 'Times' }
              ]}
            />
          </Space>
        </div>
        <div className="flex items-center">
          <Switch className="ml-3 mr-2"></Switch>
          <BsMoon />
        </div>
      </div>
    </div>
  )
}

export default Header
