/*
Team 09
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
*/

import React from 'react';
import { NavBar } from './NavBar';
import { BtnBar } from './ToggleBar'; 
import { MapNavBar } from './MapNavBar';
import DataVisualization from './DataVisualization';
import { GlobalProvider } from '../context/GlobalState';
import { Row, Container, Card, CardDeck} from "react-bootstrap";
import styled from 'styled-components';

const Styles = styled.div`

  #nav {
      display: block;
  }

  h1 {
      text-align: center;
  }

`;

class LocationGraph extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
            <Styles>
                <Container fluid >
                    <Container>
                        <Row></Row>
                        <h1> COVID-19 Over Time</h1>
                        <h2> Time Sensitive Overview</h2>
                       <CardDeck>                      
                        <Card>
                            <Card.Body>
                            <Card.Title>Total Number of Confirmed Cases</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                            <Card.Title>Date of Highest Confirmed Cases</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                            <Card.Title>Total Number of Recovered Cases</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card> 
                            <Card.Body>
                            <Card.Title>Date of Most Recoveries</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card> 
                            <Card.Body>
                            <Card.Title>Avg Number of Daily Tweets</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </CardDeck> 
                        {/* <TweetsPerDay />
                        <CasesPerDay /> */}
                    </Container>
                </Container>
            </Styles>

        )
    }
}
export default LocationGraph