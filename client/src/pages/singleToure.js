import React, { useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getSingleTours } from '../redux/feature/tourSlice';

function SingleTour() {
    const dispatch = useDispatch();

    const { tour, loading, error } = useSelector((state) => ({ ...state.tour }));
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getSingleTours(id));
        }
    }, [id, dispatch]);

    // Handle loading and error states
    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if there's an issue fetching the tour
    }

    return (
        <MDBContainer className='mt-5'>
            <MDBCard className="mb-2 pt-5">
                {/* Image Section */}
                {tour?.imageFile && (
                    <MDBCardImage
                        position="top"
                        style={{ width: "100%", maxHeight: "600px" }}
                        src={tour?.imageFile}
                        alt="Tour Image"
                    />
                )}

                <MDBCardBody>
                    {/* Title Section */}
                    <h3>{tour?.title}</h3>
                    <div className="text-start tourName">
                        Created By: {tour?.name || 'Unknown'}
                    </div>

                    {/* Tags Section */}
                    <div style={{ float: "left" }}>
                        <span className="text-start">
                            {tour?.tags?.length > 0 ? (
                                tour.tags.map((item, index) => (
                                    <span key={index}>#{item} </span>
                                ))
                            ) : (
                                <span>No tags available</span>
                            )}
                        </span>
                    </div>

                    <br />

                    {/* Date and Description Section */}
                    <MDBCardText className="text-start mt-2">
                        <MDBIcon
                            icon="calendar-alt"
                            style={{ float: "left", margin: "5px" }}
                        />
                        <small className="text-muted">
                            {moment(tour?.createdAt).fromNow()}
                        </small>
                    </MDBCardText>

                    {/* Description Section */}
                    <MDBCardText className="load mb-0 text-start">
                        {tour?.description}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default SingleTour;
