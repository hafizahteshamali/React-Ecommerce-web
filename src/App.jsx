import axios from "axios"
import { useEffect, useState } from "react";
import "./Responsive.css";
import Cards from "./Component/Common/Cards/Cards";
import { IoSearch } from "react-icons/io5";
import "./App.css";
import { RiH5 } from "react-icons/ri";

const App = () => {
  const [isloader, setIsloader] = useState(false);
  const [products, setProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [inputs, setInputs] = useState('');
  const [isfound, setisFound] = useState(false);

  const getData = async ()=>{
      setIsloader(true);
    try {
      const data = await axios.get('https://fakestoreapi.com/products')
      const response = data?.data;
      setProducts(response);
      setIsloader(false);
      const categories = [... new Set(response.map((item)=>item.category))]
      setCategory(categories);
      setFilterProduct(response)
    } 
    
    catch (error) {
      setIsloader(false);
      console.log(error);
    }
  }

  const handleCategory = (cat)=>{
    if(cat == "All"){
      setFilterProduct(products);
    }
    else{
      const filterd = products.filter((item)=>{
        return item.category == cat;
      })
      setFilterProduct(filterd);
    }

  }

  const handleSearch = ()=>{
    const searchFilterProduct = filterProduct.filter((item)=>{
      return item.title.toLowerCase().includes(inputs.toLowerCase());
    })
    if(searchFilterProduct.length == 0){
      setisFound(true);
    }
    else{
      setFilterProduct(searchFilterProduct);
    }
  }

  const handleEnterSearch = (e)=>{
    if(e.key == "Enter"){
      handleSearch();
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="content">
      <div className="container">
      <div className="select-option">
      <select onChange={(e)=>handleCategory(e.target.value)}>
        <option value="All">All</option>
            {Category.map((item, index)=>{
              return(
                <option key={index} value={item}>{item}</option>
              )
            })}
          </select>
          <div className="input-wrapper">
          <input onKeyUp={handleEnterSearch} onChange={(e)=>setInputs(e.target.value)} value={inputs} type="text" placeholder="Searching to product..."/>
          <IoSearch onClick={handleSearch}/>
          </div>
      </div>
            <div>{isfound && <p className="error">Data not Found..!</p>}</div>
        {isloader ? <div className="loader"></div> :
        <div className="card-wrapper">
        {filterProduct.map((item)=>{
          return(
            <Cards key={item.id} data={item}/>
          )
        })}  
      </div>}
          
      </div>      
    </div>
  )
}

export default App
