import React, { useState,useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBBtn, MDBSpinner } from 'mdb-react-ui-kit';
import FileBase from "react-file-base64";
import { toast } from 'react-toastify';
import { useNavigate ,useParams} from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import {useDispatch,useSelector} from "react-redux";
import { createTour, updateTours } from '../redux/feature/tourSlice';

const initialState = {
    title: "",
    description: "",
    tags: [],

}

function AddEditTour() {
    const [tourData, settourData] = useState(initialState);
    const { title, description, tags } = tourData;

    const {id} = useParams();

    const {error,loading,userTour} = useSelector((state)=>({...state.tour}));
    const {user} = useSelector((state)=>({...state.auth}));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    


    useEffect(()=>{

        if(id){
            const singleTour = userTour.find((tour)=>tour._id === id);
            //console.log(singleTour);
            settourData({...singleTour});
        }

    },[id])


    useEffect(()=>{

        error && toast.error(error);

    },[error]);

    const onInputChange = (e) => {
        const {name,value} = e.target;
        settourData({...tourData,[name]:value});


    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        //console.log(tourData);

        if(!title || !description || !tags){
            return toast.warn("please fill all details");
        }

        const updatedTourData = {...tourData,name:user?.result?.name};

        if(!id){
            dispatch(createTour({updatedTourData,navigate,toast}));
        }else{
            //console.log(id,updatedTourData,toast,navigate);
            dispatch(updateTours({id,updatedTourData,toast,navigate}));
        }

        

        handleClear();
       

    }

    const handleAddTag = (tag) => {
        settourData({...tourData,tags:[...tourData.tags,tag]})


    }

    const handleDeleteTag = (deletetag) =>{
        settourData(
            {
            ...tourData,
            tags:tourData.tags.filter((tag)=> tag != deletetag)})

    }

    const handleClear = () =>{

        settourData({title:"",description:"",tags:[]});

    }



    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
            <MDBCard alignment='center'>
                <h5 style={{marginTop:"20px"}}>{id? "Update Tour":"Add Tour"}</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
                        <div className="col-md-12">
                            <input name='title' className="form-control" type="text" placeholder='Enter Title' value={title} onChange={onInputChange} required invalid="true" validation="please provide title" />
                        </div>
                        <div className="col-md-12">
                            <textarea name='description' style={{ height: "100px" }} className="form-control" type="text" placeholder='Enter description' value={description} onChange={onInputChange} required invalid="true" validation="please provide description" />
                        </div>
                        <div className="col-md-12">
                            <ChipInput name="tags" variant='outlined' placeholder='Enter Tag' fullWidth value={tourData.tags} onAdd={(tag) => handleAddTag(tag)}  onDelete={(tag) => handleDeleteTag(tag)} />
                        </div>
                        <div className="d-flex justify-content-start">
                            <FileBase type="file" multiple={false} onDone={(({ base64 }) => settourData({ ...tourData, imageFile: base64 }))} />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }}>
                                {id?"Update":"submit"}
                            </MDBBtn>
                            <MDBBtn style={{ width: "100%" }} className='mt-2' color='danger' onClick={handleClear}>
                                Clear
                            </MDBBtn>
                        </div>

                    </MDBValidation>
                </MDBCardBody>


            </MDBCard>
        </div>
    )
}

export default AddEditTour
