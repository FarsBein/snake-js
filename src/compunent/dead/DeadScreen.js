import React from 'react'
import './DeadScreen.css'

export default function DeadScreen({setDead}) {
    return (
        <div className='deadScreen-container'>
            <p>Game Over</p>
            <div>
                <button onClick={()=>setDead(false)}>
                    Play
                </button>   
            </div>
            <p>Double tab on Play button</p>
        </div>
    )
}
