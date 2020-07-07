import React from 'react';
import { Button } from 'react-bootstrap';

const Btn = (props) => {
    let styles = {
        fontFamily: 'Inter',
        boxShadow: 'none',
        borderRadius: '0.25rem',
        fontStyle: 'normal'
    };
    if (props.buttonType === 'outline'){
        styles.backgroundColor = '#ffffff';
        styles.color = '#1A73E8';
    } else {
        styles.backgroundColor = '#1A73E8';
        styles.color = '#ffffff';
    }
    const Props = {...props};
    Props.style = styles;
    return(
        <Button {...Props}>
            {props.children}
        </Button>
    )
}

export default Btn;
