 import React from 'react';

export default function ClickButton(props) {
 

    return (

        <div>
            <button 
            style={{
                width: props.width,
                height: props.height,
                background:props.bg_color
            }} 
            type='button'
            onClick={props.onClick}
            disabled={props.isDisabled}
            
            >
                {props.button_name}
            </button>
        </div>
    );
}