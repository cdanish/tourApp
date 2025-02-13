import React,{useEffect} from 'react';
import {MDBCard,MDBCardTitle,MDBCardText,MDBCardBody,MDBCardImage,MDBRow,MDBCol,MDBBtn,MDBIcon,MDBCardGroup} from "mdb-react-ui-kit";
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTours, getSingleToursByUser } from '../redux/feature/tourSlice';
import Sppinner from '../component/Sppinner';
import {toast} from "react-toastify"


function DashBoard() {
    const {user} = useSelector((state)=>({...state.auth}));

    

    const {userTour,loading} = useSelector((state)=>({...state.tour}));
   
    const userId = user?.result._id;
   // console.log(userId);

   const dispatch = useDispatch();

   useEffect(()=>{
    if(userId){
        dispatch(getSingleToursByUser(userId));
    }

   },[userId]);

   const excerpt = (str = '') =>{
    if(str.length>40){
        str = str.substring(0,45) +"...";
    }
    return str;
}

if(loading){
    return <Sppinner/>
}

const handleDelete = (id) =>{
    if(window.confirm("Are you sure want to delete this tour")){
        dispatch(deleteTours({id,toast}));
    }
}


  return (
    <div style={{margin:"auto",padding:"120px",maxWidth:"900px",alignContent:"center"}}>
        <h4 className='text-center'>Created By User: {user?.result?.name}</h4>
        <hr style={{maxWidth:"570px"}} />
        {userTour && userTour.map((item)=>(
            <MDBCardGroup  key={item._id}>
                <MDBCard style={{maxWidth:"600px"}} className='mt-2'>
                    <MDBRow className='g-0'>
                        <MDBCol md='4'>
                            <MDBCardImage
                            className='rounded'
                            src={item.imageFile}
                            alt={item.title}
                            fluid
                            />
                        </MDBCol>
                        <MDBCol md='8'>
                            <MDBCardBody>
                                <MDBCardTitle className='text-start'>{item.title}</MDBCardTitle>
                                <MDBCardText className='text-start'>
                                    <small className='text-muted'>{excerpt(item.description)}</small>
                                </MDBCardText>
                                <div style={{marginLeft:"5px",float:"right",marginTop:"-60px"}}>
                                    <MDBBtn className='mt-1' tag='a' color='none'>
                                        <MDBIcon
                                        fas
                                        icon='trash'
                                        style={{color:"#dd4b39"}}
                                        size="lg"
                                        onClick ={()=>handleDelete(item._id)}
                                        />
                                    </MDBBtn>
                                 <Link to={`/editTour/${item._id}`}>
                                        <MDBIcon
                                        fas
                                        icon='edit'
                                        style={{color:"blue",marginLeft:"10px"}}
                                        size="lg"
                                        />
                                </Link>

                                </div>
                            </MDBCardBody>

                        </MDBCol>
                    </MDBRow>

                </MDBCard>
            </MDBCardGroup>
        ))}
    </div>
  )
}

export default DashBoard
