import './App.css';
import  Header  from './Header.js';
import Content from './Content';
import Footer from './Footer';
import {useState,useEffect} from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apirequest from './apirequest';


function App() {
  const API_URL = "http://localhost:3500/items";
  const [items,setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
      useEffect(() => {

      const fetchItems = async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw Error('Did not receive expected data');
          const listItems = await response.json();
          
          setItems(listItems);
          setFetchError(null);
        } catch (err) {
           setFetchError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
  
      setTimeout(() => fetchItems(), 2000);
  
    }, [])
  
    const [search,setSearch]= useState('')

    const [newItem,setnewItem] = useState('')
  
  const handleCheck = async (id)=>{
    const listItems= items.map((item)=>item.id === id ? {...item,checked: !item.checked} : item);
    //item.id === id >> we will check if the id passed is same as to the item id then it will create a new array
    //setItems(listItems)
    setItems(listItems);

    const myItem = listItems.filter((item)=>item.id === id);
    const updateOptions ={
      method :"PATCH",
      headers :{
        'Content-Type':'application/json'
      
      },
      body:JSON.stringify({checked:myItem[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`
    const result = await apirequest(reqUrl,updateOptions)
    if (result) setFetchError(result) 
   }
   const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    const deleteOptions ={method:'DELETE'}
    const reqUrl = `${API_URL}/${id}`
    const result = await apirequest(reqUrl,deleteOptions)
    if (result) setFetchError(result) 
    //setandsaveitems(listItems)
    //localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }
  //const arr = 
    
    const setandsaveitems =(newItems)=>
    {
      setItems(newItems)
      localStorage.setItem('shoppinglist',JSON.stringify(newItems))
    }
    const additem= async (item)=>
    {
      const id = items.length ? items[items.length-1].id+1 :1;
      const mynewitem ={id,checked:false,item};
      const listitems = [...items,mynewitem]
      setItems(listitems)

      const postOptions ={
        method:"POST",
        headers:{
          "Content-type":'application/json'
        },
        body:JSON.stringify(mynewitem)
      }
      const result = await apirequest(API_URL,postOptions);
      if (result) setFetchError(result) ;

    }
      
    
    const handlesubmit=(e)=>{
      e.preventDefault();
      if(!newItem) return;
      additem(newItem)
      setnewItem(' ')
      console.log("submitted")
    }
  return (
    <div className="App">
      <Header title = "Grocery List"></Header>
      <AddItem
      newItem = {newItem}
      setnewItem = {setnewItem}
      handlesubmit ={handlesubmit}/>
      <SearchItem
      setItem = {search}
      setSearch = {setSearch}
      ></SearchItem>
      <br></br>
      <main>
        {isLoading && <p>Loading Items. . . .</p>}
        {fetchError && <p style ={{color:"red"}}> {`Error:${fetchError}`}</p>}
      {!isLoading && <Content
      items ={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
      handleCheck = {handleCheck }
      handleDelete ={handleDelete}
      
      ></Content>}
      </main>
      <br></br>
      <Footer length ={items.length}></Footer>
    </div>
  );
  }

export default App;
