import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';

import Plot from './Axis/Plot';
import { AxisBasic } from './Axis/AxisBasic.tsx';

function Insidegraph({check}) {
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row style={{ height: '100%' }}>
        <Col sm={9} style={{background:'#D4D4D4'}}>
        
           {/* <Row style={{height:'70%'}}><InsideGra/></Row>
            <Row style={{height:'30%'}}>hello</Row> */}
            <Row style={{ height: '39%'}}>
              <Col md={2}>

              </Col>
              <Col style={{}} md={10}>
                <div style={{background:'white',marginTop:'10px',marginRight:'2px', height:'100%',width:'100%'}}>
                  {check?(<AxisBasic width={300} height={300} />):(<div></div>)}
                  
                </div>
                
              </Col>
            </Row>

            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
            
    
        </Col>
        <Col sm={3}>
          <Row>
            Distance Stress to Zero point
          </Row>

          <Row >
           <span style={{ width: '100px',
                    background:'#D4D4D4',
                    paddingLeft:'10px',
                    paddingTop:'15px',
                    paddingRight:'10px',
                    color:'black',
                    marginTop:'30px',
                    marginRight:'5px',
                    textAlign:'center',
                    }}>NaN</span>
          </Row>

          <Row>Points</Row>

          <Row>
          <span style={{ width: '100px',
                    background:'#D4D4D4',
                    paddingLeft:'10px',
                    paddingTop:'15px',
                    paddingRight:'10px',
                    color:'black',
                    marginTop:'10px',
                    marginRight:'5px',
                    textAlign:'center',
                    }}>all</span>
          </Row>

          <Row>Filter</Row>

          <Row>
          <span style={{ width: '100px',
                    background:'#D4D4D4',
                    paddingLeft:'10px',
                    paddingTop:'15px',
                    paddingRight:'10px',
                    color:'black',
                    marginTop:'10px',
                    marginRight:'5px',
                    textAlign:'center',
                    }}>1</span>
          </Row>
          </Col>
      </Row>
    </Container>
  )
}
export default Insidegraph;