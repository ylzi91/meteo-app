import { Button, Col, Form, Navbar, Row } from "react-bootstrap";


export default function SearchNav( {search, writeSearch} ){
    return (
        <Navbar className="bg-primary p-3 mt-3 border border-2 rounded-5 w-25 mx-auto justify-content-center">
        <Form inline value={search} onSubmit={(e) => {
            e.preventDefault()
            console.log(e)
            writeSearch(e.target[0].value)
            
        } }>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Cerca località"
                className=" mb-2"
            
              />
            </Col>
            <Col xs="auto">
              <Button variant="success" type="submit">Cerca</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
    )

}