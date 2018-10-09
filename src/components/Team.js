import React, { Component } from 'react';
import '../css/Full.css'
import Sofia from '../images/sofia2.png';
import Enrique from '../images/enrique2.png';
import AJ from '../images/aj2.png';
import Kait from '../images/kait2.png';
import Ryan from '../images/ryan2.png';
import { Container, Row, Col } from 'reactstrap';



class Team extends Component {

  render() {
    return (
                <div>
                    <h1 className="blktext text-center">Support and Development Team</h1>
                <Container>
                    <Row>
                        <Col className="team">
                            <img src={Sofia}/>
                            <h2 className="blktext text-center">Sofia Espejel</h2>
                            <p className="blktext text-center"><a href="https://github.com/sofiab0t">GitHub</a></p>
                            <p className="blktext text-center"><a href="https://www.linkedin.com/in/sofia-espejel-939011142/">LinkedIn</a></p>
                        </Col>
                        <Col className="team">
                            <img src={Enrique}/>
                            <h2 className="blktext text-center">Enrique Vega</h2>
                            <p className="blktext text-center"><a href="https://github.com/Enrique-Vega">GitHub</a></p>
                            <p className="blktext text-center"><a href="https://www.linkedin.com/in/enrique-vega-418095159/">LinkedIn</a></p>
                        </Col>
                        <Col className="team">
                            <img src={AJ}/>
                            <h2 className="blktext text-center">AJ Magracia</h2>
                            <p className="blktext text-center"><a href="https://github.com/ajmagracia">GitHub</a></p>
                            <p className="blktext text-center"><a href="https://www.linkedin.com/in/aj-magracia/">LinkedIn</a></p>
                        </Col>
                        <Col className="team">
                            <img src={Ryan}/>
                            <h2 className="blktext text-center">Ryan Higgins</h2>
                            <p className="blktext text-center"><a href="https://github.com/rhiggins32">GitHub</a></p>
                            <p className="blktext text-center"><a href="https://www.linkedin.com/in/ryan-higgins123/">LinkedIn</a></p>
                        </Col>
                        <Col className="team">
                            <img src={Kait}/>
                            <h2 className="blktext text-center">Kait Sewell</h2>
                            <p className="blktext text-center"><a href="https://github.com/K8Sewell">GitHub</a></p>
                            <p className="blktext text-center"><a href="https://www.linkedin.com/in/kait-sewell/">LinkedIn</a></p>
                        </Col>
                    </Row>
                </Container>
            </div>
    );
  }
}

export default Team;