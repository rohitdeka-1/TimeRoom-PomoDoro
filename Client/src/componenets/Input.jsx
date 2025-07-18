import React from 'react'

const Input = ({value, placeholder, type = "text"}) => {
  return (

        <form className='w-full'>
            <input className='rounded-lg p-4 w-full placeholder-gray-200' value={value} placeholder={placeholder} type={type} />
        </form>

  )
}

export default Input