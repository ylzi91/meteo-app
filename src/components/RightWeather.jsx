
import { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";

export default function RightWeather( { todayPos, aniDet } ) {
    
    return (


        <Badge className={`p-3 ms-3 start-58 position-absolute border border-2 rounded-5 shadow ${ aniDet ? 'left-entrace' : 'left-exit' }`} bg = 'primary' >
            <h1 className=" fs-4">
                Temperatura percepita
            </h1>
            <h2>
                {Math.floor(todayPos.main.feels_like)}°
            </h2>
            <h4>
                Umidità {todayPos.main.humidity}%
            </h4>
            <Container fluid>
                <Row>
                    <Col><p>Visibilità: {todayPos.visibility.toString().slice(0,3)}%</p></Col>
                    <Col><p>Vento: {todayPos.wind.speed}km/h</p></Col>
                </Row>
            </Container>
        </Badge>

        
    )
}