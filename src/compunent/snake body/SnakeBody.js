import React, { useState, useEffect, useReducer, useRef } from 'react'
import Food from '../food/Food'
import './snakeBody.css'
export default function SnakeBody({grid,setGrid,setDead}) {
    const [snake,setSnake] = useState({
        body:[[0,0]],
        head: [0,1]
    })
    const [food,setFood] = useState([7,7])
    const [score,setScore] = useState(snake.body.length)
    
    const direction = useRef('right');


    const randomFood=()=>{
        const max = 9

        let x = Math.floor((Math.random()*max))
        let y = Math.floor((Math.random()*max))

        if(isSnakeBody([x,y])){
            console.log('in the body')
            return randomFood()
        }else{
            return [x,y]
        }

    }

    const isFoodEaten = (coor) => {
        if(coor[0] === food[0] && coor[1] === food[1]){
            setFood(randomFood())
            return true
        }
        return false
    }

    const isSnakeHead=(coor)=>{
        if(snake.head[0]=== coor[0] && snake.head[1]=== coor[1])
            return true
        return false
    }

    const isSnakeBody = (coor) => {
        for(let i=0; i< snake.body.length; i++){
            if(snake.body[i][0]=== coor[0] && snake.body[i][1]=== coor[1]){
                return true
            }
        }
        return false
    }

    const setDirections = (event) => {

        // eslint-disable-next-line default-case
        switch(event.keyCode){
            case 39:
                direction.current = 'right'
                break
            case 37:
                direction.current = 'left'
                break
            case 38:
                direction.current = 'up'
                break     
            case 40:
                direction.current = 'down'
                break     
        }
    }

    const checkNewCoor = (newCoor) => {
        if(isFoodEaten(newCoor)){
            setScore(score+1)

            setSnake({
                body:[...snake.body,snake.head],
                head:newCoor
            })
        }else{
            setSnake({
                body:[...snake.body.splice(1),snake.head],
                head:newCoor
            })
        }
        
        if(isSnakeBody(newCoor)){
            console.log('newCoor:',newCoor,'snakeBody:',snake.body)
            return setDead(true)
        }
        if(newCoor[0] > 9 || newCoor[0]<0 || newCoor[1] > 9 || newCoor[1]<0)
            return setDead(true)
    }

    const incrementVelocity = async (d) =>{
        let newCoor;

        // eslint-disable-next-line default-case
        switch(d){
            case 'right':
                newCoor = [snake.head[0],snake.head[1]+1]
                break
            case 'left':
                newCoor = [snake.head[0],snake.head[1]-1]
                break;
            case 'up':
                newCoor = [snake.head[0]-1,snake.head[1]]
                break;     
            case 'down':
                newCoor = [snake.head[0]+1,snake.head[1]]
                break;       

        }
        checkNewCoor(newCoor)
        direction.current = d

    }

    
    useEffect(() => {
        setTimeout(()=>{
            incrementVelocity(direction.current)
        },500-(score*10))
        
    }, [snake])
    
    return (
        <div>
            <div>
              score:{score}  
            </div>
            
            <div onKeyDown={(e)=>setDirections(e)} tabIndex="0" className='grid'>
                {
                    grid ?
                        grid.map(row=>(
                            row.map(coor => 
                                (
                                    !isSnakeBody(coor) && !isSnakeHead(coor) ?
                                        food[0] === coor[0] && food[1] === coor[1] ? 
                                            <Food />
                                            :
                                            <div className='empty'></div>
                                        :
                                    <div className='body'></div>
                                ))
                        ))
                    :
                    'Error: No Grid'
                }
            </div>   
      
        </div>

    )

    
}


