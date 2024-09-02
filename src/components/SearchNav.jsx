import { useState } from "react";
import { Button, Col, Fade, Form, ListGroup, Navbar, Row } from "react-bootstrap";
import LocList from "./LocList";


export default function SearchNav( {search, writeSearch} ){
    const [clicked, setClicked] = useState(false)

    function handleClick (){
        setClicked(!clicked)
    }

    return (
        <>
        <Navbar className="bg-primary p-3 mt-3 border border-2 rounded-5 w-50 mx-auto justify-content-center">
        <Form  value={search} onSubmit={(e) => {
            e.preventDefault()
            writeSearch(e.target[0].value)
            
        } }>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Posizione Attuale"
                className=" my-1"
            
              />
            </Col>
            <Col xs="auto">
              <Button className="my-1" variant="success" type="submit">Cerca</Button>
            </Col>
          </Row>
        </Form>
        <Button className="ms-3" variant="info shadow" onClick={() => handleClick()}>Vedi localita famose</Button>
      </Navbar>
      <ListGroup className=" rounded-5 w-50 mx-auto">
       {clicked && <LocList id = "openList"  writeSearch = {writeSearch} /> /*<ListGroup.Item variant="info"> Località </ListGroup.Item>*/  } 
        
      </ListGroup>
      </>
    )

}