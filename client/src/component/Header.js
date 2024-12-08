import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../redux/feature/authSlice';

function Header() {
    const [show, setShow] = useState(false);
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
    };

    return (
        <MDBNavbar fixed="top" expand="lg" className="bg-primary text-white">
            <MDBContainer>
                <MDBNavbarBrand 
                    style={{ color: "#fff", fontWeight: "600", fontSize: "22px", width: "45%" }} 
                    href='/'
                >
                    TourMedia
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    aria-expanded={show}
                    aria-label='Toggle navigation'
                    onClick={() => setShow(!show)}
                    className='text-white'
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        {user?.result?._id && (
                            <div className="text-white text-center mt-2 mb-2 d-flex">
                                <MDBIcon fas icon="user-circle" className="fa-2x mb-0" /> 
                                <p className='mb-0 ms-2'>{user?.result?.name}</p>
                            </div>
                        )}
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/'>
                                <p className="text-white text-decoration-none">Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id ? (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/addtour'>
                                        <p className="text-white text-decoration-none">Add Tour</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/dashboard'>
                                        <p className="text-white text-decoration-none">Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/login' onClick={handleLogout}>
                                        <p className="text-white text-decoration-none">Logout</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/login'>
                                    <p className="text-warning text-decoration-none">Login</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Header;
