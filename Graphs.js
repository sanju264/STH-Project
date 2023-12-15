import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Insidegraph from './Insidegraph';
import Graphheading from './Graphheading';
// import Dygraph  from 'dygraphs';

function Graphs() {
  return (
    <Container fluid style={{ height: '100vh',overflow: 'hidden' }}>
      <Row style={{ height: '50%' }}>


        <Col>
          <Card border="light" style={{height:'100%',width:'100%'}}>

            {/* <Card.Header>Header</Card.Header> */}
            {/* <Graphheading/> */}
            <Card.Body>
              <Row style={{height:'50%'}}>
                <Insidegraph check={true}/>
              </Row>

            </Card.Body>
            
          </Card>
        </Col>

        <Col>
          <Card border="light" style={{height:'100%',width:'100%'}}>
            {/* <Card.Header>Header</Card.Header> */}
          
            <Card.Body>
              <Row style={{height:'50%'}}>
                <Insidegraph  check={true}/>
              </Row>

            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card border="light" style={{height:'100%',width:'100%'}}>
            {/* <Card.Header>Header</Card.Header> */}
            <Card.Body>
              <Row style={{height:'50%'}}>
                <Insidegraph  check={true}/>
              </Row>

            </Card.Body>
          </Card>
        </Col>

      </Row>
      <Row>

        <Col>
          <Card border="light" style={{height:'100%',width:'100%'}}>
            {/* <Card.Header>Header</Card.Header> */}
            <Card.Body>
              <Row style={{height:'50%'}}>
                <Insidegraph  check={true}/>
              </Row>

            </Card.Body>
          </Card>
        </Col>

        <Col >
          <Card border="light" >
            {/* <Card.Header>Header</Card.Header> */}
            <Card.Body>
              <Row style={{height:'50%'}}>
                <Insidegraph  check={true}/>
              </Row>

            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card border="light" >
            {/* <Card.Header>Header</Card.Header> */}
            <Card.Body>
              <Row style={{height:'50%'}}>
                <Insidegraph  check={true}/>
              </Row>

            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Container>
  );
}

export default Graphs;