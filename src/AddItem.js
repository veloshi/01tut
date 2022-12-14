import React from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItem = ({item,setnewItem,handlesubmit}) => {
  return (
    <form className='addForm' onSubmit={handlesubmit}>
        <label htmlFor='AddItem'>Add Item</label>
        <input autoFocus 
        id ='addItem'
        type ='text'
        placeholder='Add Item'
        value ={item}
        onChange = {(e)=>setnewItem(e.target.value)}
        required></input>
        <button type = 'submit'
        aria-label='Add Item'><FaPlus/></button>
    </form>
  )
}

export default AddItem