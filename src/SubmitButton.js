import React from 'react';

export const SubmitButton = (props) => {
    const {
        onClick,
        text
    } = props;

    return <button onClick={onClick} style={{ backgroundColor: 'blue', color: 'white' }}>{text}</button>
}