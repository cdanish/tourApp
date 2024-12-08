import React,{useEffect} from 'react';
import {MDBCol,MDBContainer,MDBRow,MDBTypography} from "mdb-react-ui-kit";
import {useDispatch,useSelector} from "react-redux";
import { getTours } from '../redux/feature/tourSlice';
import CardTour from '../component/CardTour';
import Sppinner from '../component/Sppinner';

function Home() {
  const dispatch = useDispatch();
  const {tours,loading} = useSelector((state)=>({...state.tour}));

  useEffect(()=>{
    dispatch(getTours());
    

  },[])
  if(loading){
    return <Sppinner/>
  }

  return (
    <div style={{margin:"auto",padding:"15px",maxWidth:"1000px",alignContent:"center"}}>
      <MDBRow className='mt-5'>

        {tours?.length === 0 && (
          <MDBTypography className='text-center mb-0' tag="h2">
            No Tours found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {tours?.length > 0 && tours.map((item,index)=> 
              
              <CardTour key={index} {...item}/>
              
              )}

            </MDBRow>
          </MDBContainer>
        </MDBCol>

      </MDBRow>
    </div>
  )
}

export default Home
