import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  var url = "https://jsonplaceholder.typicode.com/users";
  // useEffect(()=>{
  //   var url = "https://jsonplaceholder.typicode.com/users";
  //   var fetchdata = fetch(url);
  //   var res = fetchdata.then((response)=>{
  //       return response.json();
  //   }).then((data) =>{
  //       setData(data);
  //       console.log(data);
  //   })
  // },[])

  useEffect(()=>{
    async function fetchdata() {
      try {
        var res = await fetch(url);
        if(!res.ok){
          throw new Error("api error");
        }
        var data = await res.json();

        console.log(data);
        setData(data);

      } catch (error) {
        setError(error.message);
      }finally{
        setTimeout(()=>{
          setLoading(false);
        },1000)
      }
    }
    fetchdata();

  },[])

  if(error){
    return(
      <div>
        {error}
      </div>
    )
  }

  return (
    <>
      {loading? (
        <p>loading.....</p> 
      ) : (
        data.map((item)=>{
          return <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.email}</p>
          </div>
        })
      )}
    </>
  )
}

export default App

