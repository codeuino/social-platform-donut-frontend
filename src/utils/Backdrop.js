import React from 'react';
import './Backdrop.scss';

const Backdrop = (props) => {
    return(
        props.show ? <div className="backdrop"></div> : null
    );
}

export default Backdrop;
