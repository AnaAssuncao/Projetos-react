import {useState, useRef} from "react"
import "./slider.css"

const Slider = () =>{
    const [size, setSize] = useState(700)
    const [margin,setMargin] = useState(0)
    const [clickedTheBar, setClickedTheBar] = useState({isClicked: false, clickedOn: null})
    const divRef = useRef()

    const handleMoveMargin = (displacement,end) => {
        if(displacement<end){
            if(displacement<=2){
                setClickedTheBar({isClicked: false, clickedOn: "margin"})
                setSize(end)
                setMargin(0)
            }
            else{
                setSize(size -displacement+margin)
                setMargin(displacement)
            }
        }
        else{
            setSize(displacement-margin)
        }
    }

    const handleMoveSize = (displacement) => {
        if(displacement>margin){
            if(displacement>=696){
                setClickedTheBar({isClicked: false, clickedOn: "size"})
                setSize(700-margin)
            }
            else{
                setSize(displacement-margin)
            }
        }
        else{
            setSize(size -displacement+margin)
            setMargin(displacement)
        }
    }

    const move = (eixoX) => {
        const halfTheBar = size/2 + margin
        if(eixoX<halfTheBar){
            setClickedTheBar({isClicked: true, clickedOn: "margin"})
            setSize(size-eixoX+margin)
            setMargin(eixoX)
        }
        else{
            setClickedTheBar({isClicked: true, clickedOn: "size"})
            setSize(eixoX-margin)
            setMargin(margin)
        }
    }

    const mouseDown = (event) => { 
        const displacement =  event.pageX -divRef.current.offsetLeft
        move(displacement)
        event.preventDefault()
    }

    const mouseMove = (event) => {
        const displacement = event.pageX-divRef.current.offsetLeft
         if(clickedTheBar.isClicked){
            const end = size + margin
            if(clickedTheBar.clickedOn==="margin"){
                handleMoveMargin(displacement,end)
            }
            else{
                handleMoveSize(displacement)
            }
        }
    }

    const mouseUp = () => {
        setClickedTheBar({isClicked: false, clickedOn: "size"})
    }

    return (
        <div className="slider__box">
            <div className="slider__container"
                onMouseDown={mouseDown} 
                onMouseMove={mouseMove} 
                onMouseUp={mouseUp}
                ref={divRef}>

                    <div className="slider"
                        style={{
                            width: size + "px", 
                            marginLeft: margin + "px"
                            }}
                        >
                        <div  className="slider__ball"/>
                        <div className="slider__ball"/>
                    </div>
            </div>
            <span className="slider__text">
                {(margin/700*100).toFixed(2)}%  -  {((margin+size)/700*100).toFixed(2)}% 
            </span>
        </div>
    )
}

export default Slider