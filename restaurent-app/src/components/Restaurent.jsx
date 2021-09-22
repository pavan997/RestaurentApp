import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Restaurent.css";


function Restaurant()
{
    const [text, setText] = useState("");
    const [todolist, setTodolist] = useState([]);
    const [sort,setSort] = useState([]);
    const [initial,setChangedInitial] = useState(true);
    const [formData,setFormData]=useState({})
   
    useEffect(() => {
        getRestaurant();
    }, [])
   console.log("todolist", todolist);


  
    
    
    function getRestaurant(){
        fetch("http://localhost:8000/Restaurant")
            .then((data) => data.json())
            .then((data) => {
                setTodolist(data);
                console.log(data);
            })
    }

    const handleChange = (e)  => {
        console.log(e.target, "e.target");
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
       console.log(formData)
    }
  

    function sortin(){
        let temp = JSON.parse(JSON.stringify(todolist))
        let results = temp.sort((a,b) => (b.rating-a.rating)).map(el => el)
        setSort(results);
          console.log("sorted", results);
    }
    function oneStar(){   
        let temp =JSON.parse(JSON.stringify(todolist))
        let result = temp.filter(e => e.rating > 1)
        let resultSort = result.sort((a,b) =>(a.rating-b.rating)).map(el => el)
        setSort(resultSort);
        setChangedInitial(false)
        console.log(result);
    }
      function twoStar(){   
        let temp =JSON.parse(JSON.stringify(todolist))
        let result = temp.filter(e => e.rating > 2)
        let resultSort = result.sort((a,b) =>(a.rating-b.rating)).map(el => el)
        setSort(resultSort);
        setChangedInitial(false)
        console.log(result);
    }
      function threeStar(){
        let temp =JSON.parse(JSON.stringify(todolist))
        let result = temp.filter(e => e.rating > 3)
        let resultSort = result.sort((a,b) =>(a.rating-b.rating)).map(el => el)
        setSort(resultSort);
        setChangedInitial(false)
        console.log(result);
    }

    function fourStar(){
        let temp =JSON.parse(JSON.stringify(todolist))
        let result = temp.filter(e => e.rating > 4)
        let resultSort = result.sort((a,b) =>(a.rating-b.rating)).map(el => el)
        setSort(resultSort);
        setChangedInitial(false)
        console.log(result);
    }

     function lh(){
        let temp =JSON.parse(JSON.stringify(todolist))
        let results = temp.sort((a,b) => ((2*a.oneprice)-(2*b.oneprice))).map(el => el)
        setSort(results);
        setChangedInitial(false)
          console.log("sorted", results);
    }

     function hl(){   
        let temp = JSON.parse(JSON.stringify(todolist))
        let results = temp.sort((a,b) => ((2*b.oneprice)-(2*a.oneprice))).map(el => el)
        // setTodolist(results);
        setSort(results)
        setChangedInitial(false)
          console.log("sorted", results);
    }

    function cash(){
        let temp = JSON.parse(JSON.stringify(todolist))
        let output = temp.filter((e)=>(e.cash==true && e.card==false && e.all==false))
        setSort(output)
        setChangedInitial(false)
    }
    function online(){
        let temp = JSON.parse(JSON.stringify(todolist))
        let output = temp.filter((e)=>(e.cash==false && e.card==true && e.all==false))
        setSort(output)
        setChangedInitial(false)
    }
    function all(){
        let temp = JSON.parse(JSON.stringify(todolist))
        let output = temp.filter((e)=>(e.all==true))
        setSort(output)
        setChangedInitial(false)
    }


    return <>
        <form onSubmit={(e) => {
            e.preventDefault();
            const data = formData;

            // console.log(JSON.stringify(data), "data stirngified")
            
            fetch("http://localhost:8000/Restaurant", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
               // axios.post("http://localhost:8000/Restaurant",data)
                .then(() => {
                getRestaurant();
            }).catch((err) => {
                console.log("err",err)
            });
          //  setTodolist([...todolist, formData]);
        }}>
           
        <label>Name:</label>
        <input type="text" name="name" placeholder="Enter name" onChange={handleChange} />
        
        <label>Image: </label>
        <input type="text"  name="image" placeholder="Enter image address" onChange={handleChange} />
            
        <label>Specials: </label>
        <input type="text" name="specials" placeholder="Enter Speicals" onChange={handleChange} />
            
        <label>Price per Person: </label>
        <input type="text" name="oneprice" placeholder="Enter Price per person" onChange={handleChange} />
            
        <label>Minimum Price: </label>
        <input type="text" name="mprice" placeholder="Enter Minimum price" onChange={handleChange} />
            
        <label>Delivery Time: </label>
        <input type="text" name="time" placeholder="Enter Delivery Time" onChange={handleChange} />
            
        <label>Ratings: </label>
        <input type="text" name="rating" placeholder="Enter Ratings" onChange={handleChange} />
            
        <label>Votes: </label>
        <input type="text" name="votes" placeholder="Enter Votes" onChange={handleChange} />
            
        <label>Reviews:</label>
        <input type="text" name="treviews" placeholder="Enter Reviews" onChange={handleChange}/>
        <label>payment-cash: </label>
        <input type='text' name='cash'  placeholder='Enter payment type' onchange={handleChange}/>
        <label>payment-card: </label>
        <input type='text' name='card'  placeholder='Enter payment type' onchange={handleChange}/>
        <label>payment-all: </label>
        <input type='text' name='all'  placeholder='Enter payment type' onchange={handleChange}/>

        <input sytle={{justifyContent:'center'}} type="submit" value="submit"/>
        </form>
        <div style={{display:'flex',marginTop:'20px',justifyContent:'space-around'}}>
            <div>
            <h2>Sort By Ratings</h2>
            <button onClick={sortin}>Sort by Ratings</button>
            <button onClick={oneStar}>1 star</button>
            <button onClick={twoStar}>2 star</button>
            <button onClick={threeStar}>3 star</button>
            <button onClick={fourStar}>4 star</button>
            </div>
            

            <div>
            <h2>Sort By Pricing per two Heads</h2>
            <button onClick={lh}>low to high</button>
            <button onClick={hl}>high to low</button>
            </div>
            <div>
            <h2>Restaurant Payments</h2>
            <button onClick={cash}>Cash</button>
            <button onClick={online}>Card</button>
            <button onClick={all}>All</button>
            </div>
        </div>
        <div className='main'>
        { initial? todolist.map(e =>
                <div className="parent" key={e.id}>
                    
                    <div className='parent1'>
                    
                    <img className="image" src={e.image} alt="jjdnj" />

                    <div className="fchild">
                        <div className="name" >{e.name}</div>
                        <div className="special"> {e.specials} </div>
                        <div className="oneprice"> Cost ₹{e.oneprice} for one </div>
                        <div className="mprice"> Min ₹{e.mprice} . Upto {e.time}mins </div>
                        <div>{e.all?'All payments accepted':e.card?'online payments only':'cash only'}</div>
                        </div>
                    
                    <div className="schild">
                        <div className="rating"> {e.rating}</div>
                        <div className="votes"> {e.votes} votes </div>
                        <div className="reviews"> {e.treviews} reviews</div>
                    </div>
                    
                    </div>
                

                    <div className="border1">
                        <button className="bton" >Order Online{' >'} </button> 
                    </div> 
                </div>   
            ): sort.map(e =>
                <div className="parent" key={e.id}>
                    
                    <div className='parent1'>
                    
                    <img className="image" src={e.image} alt="jjdnj" />

                    <div className="fchild">
                        <div className="name" >{e.name}</div>
                        <div className="special"> {e.specials} </div>
                        <div className="oneprice"> Cost ₹{e.oneprice} for one </div>
                        <div className="mprice"> Min ₹{e.mprice} . Upto {e.time}mins </div>
                        <div>{e.all?'All payments accepted':e.card?'online payments only':'cash only'}</div>
                        </div>
                    
                    <div className="schild">
                        <div className="rating"> {e.rating}</div>
                        <div className="votes"> {e.votes} votes </div>
                        <div className="reviews"> {e.treviews} reviews</div>
                    </div>
                    
                    </div>
                

                    <div className="border1">
                        <button className="bton" >Order Online{' >'} </button> 
                    </div> 
                </div>   
            )}
            
        </div>
    </>
}

export default Restaurant;