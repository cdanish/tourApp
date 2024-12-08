import React from 'react'
import { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBFooter } from "mdb-react-ui-kit";
import { Link,useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {toast} from "react-toastify"; 
 import { register } from '../redux/feature/authSlice';

const initialState = {
    firstname:"",
    lastname:"",
    email: "",
    password: "",
    confirmPassword:"",

}

function Register() {



    const [formValue, setFromValue] = useState(initialState);
    const { email, password,firstname,lastname,confirmPassword } = formValue;
    const{loading,error} = useSelector((state)=>({...state.auth}));

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(()=>{

        error && toast.error(error);
       // console.log(error);
    
    },[error]);


    const handleSubmit = (e) => {
        e.preventDefault();
       // console.log(formValue);
       if(password !== confirmPassword){
            return toast.error("password is not matching with confirm matching");
       }

       if(email&&password&& firstname&& lastname&& confirmPassword){
            dispatch(register({formValue,navigate,toast}));
       }

    }

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFromValue({ ...formValue, [name]: value })

    }

    
    

    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x mt-2" />

                <h5>Sign Up</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                    <div className="col-md-6">
                            <MDBInput
                                label="Frist Name"
                                type='text'
                                name='firstname'
                                value={firstname}
                                onChange={onInputChange}
                                required
                                invalid={firstname === '' ? 'true' : 'false'}
                                validation="please provide your email"
                            />
                        </div>
                        <div className="col-md-6">
                            <MDBInput
                                label="Last Name"
                                type='text'
                                name='lastname'
                                value={lastname}
                                onChange={onInputChange}
                                required
                                invalid={lastname === '' ? 'true' : 'false'}
                                validation="please provide your lastname"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Email"
                                type='email'
                                name='email'
                                value={email}
                                onChange={onInputChange}
                                required
                                invalid={email === '' ? 'true' : 'false'}
                                validation="please provide your email"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Password"
                                type='password'
                                name='password'
                                value={password}
                                onChange={onInputChange}
                                required
                                invalid={password === '' ? 'true' : 'false'}
                                validation="please provide your password"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="confirm Password"
                                type='password'
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={onInputChange}
                                required
                                invalid={confirmPassword === '' ? 'true' : 'false'}
                                validation="please provide your password"
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }} className='mt-2'>
                                Register
                                {loading && (
                                    <MDBSpinner
                                    size='sm'
                                    role="status"
                                    tag={"span"}
                                    className='me-2'
                                    />
                                )}
                            </MDBBtn>
                        </div>

                    </MDBValidation>
                </MDBCardBody>
                <MDBFooter>
                    <Link to={"/login"}>
                        <p>Already have account please SignIn</p>
                    </Link>
                </MDBFooter>

            </MDBCard>
        </div>
    )
}

export default Register
