import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

export default function LocList( {writeSearch} ) {

  const [allCity, setAllCity] = useState([])  
  const apiKey = "367452c59bda6872606aae942e5fe385";
  const arrayUrlsCity = [
    `https://api.openweathermap.org/data/2.5/weather/?q=Roma&lang=it&units=metric&appid=${apiKey}`,
    `https://api.openweathermap.org/data/2.5/weather/?q=Milano&lang=it&units=metric&appid=${apiKey}`,
    `https://api.openweathermap.org/data/2.5/weather/?q=Napoli&lang=it&units=metric&appid=${apiKey}`,
    `https://api.openweathermap.org/data/2.5/weather/?q=Genova&lang=it&units=metric&appid=${apiKey}`,
  ];
  async function takeArray() {
    try {
      const responses = await Promise.all(
        arrayUrlsCity.map((url) => fetch(url))
      );
      const myCity = await Promise.all(
        responses.map((response) => response.json())
      );
      setAllCity(myCity)
      console.log(myCity);
    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
    }
  }
  useEffect(() => {
    takeArray();
  }, []);

  return (
    <>
      {allCity.map((city) => {
        return (
          <ListGroup.Item variant="info" onClick={() => writeSearch(city.name)}>
            <Container fluid>
              <Row className=" align-items-center">
                <Col>
                <img src= {`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt="" />
                </Col>
                <Col>
                <h4> {city.name} </h4>
                </Col>
                <Col>
                <h4> {Math.floor(city.main.temp)}° </h4>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        );
      })}
    </>
  );
}
