import React from 'react';
import { Card, Row, Col } from 'reactstrap';
import './style.css'
import GraphMOga from './scatterGraph/graph.jsx'
import SliderRange from './slider/slider.js';
import SliderContext from './context/sliderContext';

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props, '@@!#$!$!$', SliderContext)
    return (
      <SliderContext.Consumer>
        {context => {
          return (
            <Card body outline color="primary">
              <h4>Graph will be shown here</h4>
              <Row>
                <div className="graphpanel">
                  <GraphMOga propsData={this.props} slider_data={context.sliderData} />
                  {context.sliderData.map((item,i) => {
                    return <SliderRange propsData={item} setValueFromSlider={this.props.setValueFromSlider} key={i} />
                  })}
                </div>
              </Row>
            </Card>
          )
        }}
      </SliderContext.Consumer>
    )
  }
}
export default Graph;