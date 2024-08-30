
import { Container, Row, Col, Badge } from "react-bootstrap";

export default function TopWeather( { todayPos } ) {
    return (
    <Row>
        <Col className="text-center">
        <Badge className="p-3 opacity-75 border border-2 rounded-5 shadow" bg = 'primary'>
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
        </Col>
    </Row>
    )
}