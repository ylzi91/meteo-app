import { useState } from "react";
import { Button, Col, Form, ListGroup, Navbar, Row } from "react-bootstrap";
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
            console.log(e)
            writeSearch(e.target[0].value)
            
        } }>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Cerca località"
                className=" my-1"
            
              />
            </Col>
            <Col xs="auto">
              <Button className="my-1" variant="success" type="submit">Cerca</Button>
            </Col>
          </Row>
        </Form>
        <Button className="ms-3" variant="info shadow" onClick={() => handleClick()} type="submit">Vedi localita famose</Button>
      </Navbar>
      <ListGroup className=" w-50 mx-auto">
       {clicked && <LocList /> /*<ListGroup.Item variant="info"> Località </ListGroup.Item>*/  } 
        
      </ListGroup>
      </>
    )

}