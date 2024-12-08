import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

function Spinner() {
  return (
    <MDBSpinner
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '3rem',
        height: '3rem',
        marginTop: '100px',
        display: 'block',
      }}
    >
      <span className='visually-hidden'>Loading....</span>
    </MDBSpinner>
  );
}

export default Spinner;
