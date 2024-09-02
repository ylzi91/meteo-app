


import { useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";

export default function ListHour( {selectH, selectBorder, showDetail, todayPosFiveDay, showHiddenDetail } ) {
  

    
    return (
        <Container fluid className="my-5">
        <Badge className="p-3 opacity-75 border border-2 rounded-5 w-100 mx-auto shadow" bg = 'primary'>
            <h4 className=" text-light text-start mb-4 border-bottom pb-2">Previsioni per le prossime ore</h4>
            <Row>
        {todayPosFiveDay.map((e, index) => {
            return (
                <Col className= {`text-center me-2 pointer p-1 ${ selectH?.dt === e.dt ? selectBorder: ''} shadow zoom border rounded-3`} onClick={()=>{
                    showHiddenDetail(showDetail ? false : true , e)

                    }}>
            <p >
                {e.dt_txt.split(" ")[1].split(':', 1)}
            </p>
            <img src={`http://openweathermap.org/img/w/${e.weather[0].icon}.png`} alt="" />
            <p>{Math.floor(e.main.temp)}°</p>
                </Col>
            )
        } )}
        
    </Row>
        </Badge>
    </Container>
    )
}