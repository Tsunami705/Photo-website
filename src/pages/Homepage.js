import React,{useState,useEffect} from 'react'
import Search from "../components/Search";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Pictures from "../components/Pictures";

const Homepage = () => {
    const [input,setInput]=useState("");
    let [currentSearch,setCurrentSearch]=useState("");
    const auth="QPBws4958djIl8mKYT6yXCUecKYO4fIydiUa8M8HnSDbSZcxY4zf97jC";
    const initialURL="https://api.pexels.com/v1/curated?page=1&per_page=15";
    const searchURL=`https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;
    let [data,setData]=useState(null);
    let [page,setPage]=useState(2);

    //fetch data from pexels api
    const search=async(url)=>{
        setPage(2);
        const dataFetch =await fetch(url,{
            method:"GET",
            headers:{
                Accept:"application/json",
                Authorization:auth,
            }
        });

        let parseData=await dataFetch.json();
        setData(parseData.photos);
    };

    // Load more picture
    const morepicture=async ()=>{
        let newURL;
        if(input===""){
            newURL=`https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
        }else{
            newURL=`https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
        };
        setPage(page+1);
        const dataFetch =await fetch(newURL,{
            method:"GET",
            headers:{
                Accept:"application/json",
                Authorization:auth,
            }
        });

        let parseData=await dataFetch.json();
        setData(data.concat(parseData.photos));
    };

    //fetch data when the page Loads up
    useEffect(()=>{
        search(initialURL);
    },[]);


    useEffect(()=>{
        if(currentSearch===""){
            search(initialURL);
        }else{
            search(searchURL);
        }
    },[currentSearch]);


    return (
    <div style={{minHeight: "100vh"}}>
        <Search search={()=>{
            //JS Closure
            setCurrentSearch(input);}} setInput={setInput}/>
        <div className="pictures">
            {data && data.map(d=>{
                return <Pictures data={d}/>
            })
            //若data为null则不继续执行
        }
        </div>

        <div className="morePicture">
            <button onClick={morepicture}>Load More</button>
        </div>
    </div>
  )
}

export default Homepage;
