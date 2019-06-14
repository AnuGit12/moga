import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Panel from './Panel.jsx'

import { Row, Col} from 'reactstrap';
import Header from './navbar.jsx';
import SliderProvider from './context/sliderProvider.jsx';
import 'font-awesome/css/font-awesome.min.css';


class App extends React.Component {


    render() {
        
        return (
            <Row>
                <Col xs="12">
                    <Row>
                        <Col xs="12">
                            <Header />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <SliderProvider>
                                <Panel />
                            </SliderProvider>
                            {/* <Lasso /> */}

                        </Col>
                        
                    </Row>
                </Col>
            </Row>           
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));