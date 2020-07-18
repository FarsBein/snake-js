import React, { useState, useEffect } from 'react'
import './box.css'
import SnakeBody from '../snake body/SnakeBody'
import DeadScreen from '../dead/DeadScreen'
const boxSymbol = '■'

export default function Box() {
    const [grid,setGrid] = useState(undefined)
    const [dead,setDead] = useState(false)

    
    const buildGrid = () => {
        let tempGrid = []
        for(let i=0; i<10; i++){
            let tempCol  = []
            for(let j=0; j<10; j++){
                tempCol.push([i,j])
            }
            tempGrid.push(tempCol)
        }
        setGrid(tempGrid)
    }

    useEffect(() => {
        buildGrid()
        return () => {
        }
    }, [])


    return (
        <div className='box-container'>
            <div>
                {
                    dead?
                        <DeadScreen />
                    :
                        <SnakeBody grid={grid ? grid : []} setGrid={setGrid} setDead={setDead}/>
                }
            </div>  
            <div>
                <button onClick={()=>setDead(false)}>
                    Play
                </button>   
            </div>          
        </div>

    )
}
