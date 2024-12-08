import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function LoadingTourRedirect() {
    const [count,setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(()=>{

        const inverval = setInterval(() => {
            setCount((currentCount)=> --currentCount);
        }, 1000);

        count === 0 && navigate("/login");
        return ()=> clearInterval(inverval);

    },[count,navigate]);
  return (
    <div style={{marginTop:"100px",marginLeft:"auto",marginRight:"auto",textAlign:"center"}}>
      <h5>redirecting you in {count}Seconds</h5>
    </div>
  )
}

export default LoadingTourRedirect
