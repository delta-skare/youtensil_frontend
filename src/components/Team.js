import React, { Component } from 'react';
import '../css/Full.css'
import Sofia from '../images/sofia2.png';
import Enrique from '../images/enrique2.png';
import AJ from '../images/aj2.png';
import Kait from '../images/kait2.png';
import Ryan from '../images/ryan2.png';
import GitHub from '../images/github2.png'
import LinkedIn from '../images/linkedin2.png'
import { Container, Row, Col } from 'reactstrap';



class Team extends Component {

  render() {
    return (
        <div>
            <h1 className="text-center ">Support and Development Team</h1>
                <Container fluid>
                    <Row className="team-row">
                        <Col className="team" sm="2.4">
                            <img src={Sofia} alt="Sofia"/>
                            <h2 className="text-center">Sofia Espejel</h2>
                            <a href="https://github.com/sofiab0t"><img src={GitHub} className="icon" alt="Sofia's GitHub"/></a>
                            <a href="https://www.linkedin.com/in/sofia-espejel-939011142/"><img src={LinkedIn} className="icon" alt="Sofia's LinkedIn"/></a>
                        </Col>
                        <Col className="team" sm="2.4">
                            <img src={Enrique} alt="Enrique"/>
                            <h2 className="text-center">Enrique Vega</h2>
                            <a href="https://github.com/Enrique-Vega"><img src={GitHub} className="icon" alt="Enrique's GitHub"/></a>
                            <a href="https://www.linkedin.com/in/enrique-vega-418095159/"><img src={LinkedIn} className="icon" alt="Enrique's Github"/></a>
                        </Col>
                        <Col className="team" sm="2.4">
                            <img src={AJ} alt="AJ"/>
                            <h2 className="text-center">AJ Magracia</h2>
                            <a href="https://github.com/ajmagracia"><img src={GitHub} className="icon" alt="AJ's GitHub"/></a>
                            <a href="https://www.linkedin.com/in/aj-magracia/"><img src={LinkedIn} className="icon" alt="AJ's LinkedIn"/></a>
                        </Col>
                        <Col className="team" sm="2.4">
                            <img src={Ryan} alt="Ryan"/>
                            <h2 className="text-center">Ryan Higgins</h2>
                            <a href="https://github.com/rhiggins32"><img src={GitHub} className="icon" alt="Ryan's GitHub"/></a>
                            <a href="https://www.linkedin.com/in/ryan-higgins123/"><img src={LinkedIn} className="icon" alt="Ryan's LinkedIn"/></a>
                        </Col>
                        <Col className="team" sm="2.4">
                            <img src={Kait} alt="Kait"/>
                            <h2 className="text-center">Kait Sewell</h2>
                            <a href="https://github.com/K8Sewell"><img src={GitHub} className="icon" alt=" Kait's GitHub"/></a>
                            <a href="https://www.linkedin.com/in/kait-sewell/"><img src={LinkedIn} className="icon" alt=" Kait's LinkedIn"/></a>
                        </Col>
                    </Row>
                </Container>
        </div>
    );
  }
}

export default Team;
