import React, {useState} from 'react'


export default function Question(props) {
    return (
        <div>
            <p>Question 1 out of 5</p>
            <h3>{props.question}</h3>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}