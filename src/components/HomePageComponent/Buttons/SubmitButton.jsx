 import React from 'react';

export default function Button(props) {
 

    return (

        <div>
            <button 
            style={{
                width: props.width,
                height: props.height,
            }} 
            type="submit" 
            onClick={props.onClick}
            
            >
                {props.button_name}
            </button>
        </div>
    );
}