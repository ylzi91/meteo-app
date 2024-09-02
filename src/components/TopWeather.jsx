
import { useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import RightWeather from "./RightWeather";

export default function TopWeather( { todayPos, handlerViewDetail } ) {

    const [viewDetail, setViewDetail] = useState(false)
    const [aniDet, setAniDet] = useState (false)
    function handlerViewDetail () {
        if(viewDetail && aniDet){
            setAniDet(false)
            setTimeout(() => {
                setViewDetail(false)
            },400)
        }
        else {
            setViewDetail(true)
            setAniDet(true)
        }
        
    
      }
    return (
    <Row className= " align-items-center">
        <Col className="d-flex justify-content-center align-items-center">
        <Badge className="p-3 zoom position-relative opacity-75 border border-2 rounded-5 shadow pointer " bg = 'primary' onClick={() => {handlerViewDetail()}}>
            <h1 className=" fs-4">
                {todayPos.name}
            </h1>
            <h2 className=" fs-1">
                {Math.floor(todayPos.main.temp)}°
            </h2>
            <h4>
                {todayPos.weather[0].description}
            </h4>
            <Container fluid>
                <Row>
                    <Col><p>Min: {Math.floor(todayPos.main.temp_min)}°</p></Col>
                    <Col><p>Max: {Math.floor(todayPos.main.temp_max)}°</p></Col>
                </Row>
            </Container>
        </Badge>
        {viewDetail && <RightWeather aniDet = {aniDet} todayPos= {todayPos} />} 
        </Col>
    </Row>
    )
}