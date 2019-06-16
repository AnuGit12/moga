import React, { Component } from "react";
import { render } from "react-dom";
import { Card, Button, CardTitle, CardText, Label, Row, Col, InputGroup, FormGroup, Input, Form } from 'reactstrap';

import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import SliderContext from '../context/sliderContext';
import { SliderRail, Handle, Track, Tick } from "./slider-component.js"; // example render components - source below
import './style.css'
const sliderStyle = {
  position: "relative",
  width: "100%"
};


var x1 = -0.4689
var x2 = -0.152
var x3 = 0.163
var x4 = 0.479
var x5 = 0.7959
var xmax = 0.954
var xmin = -0.627


class SliderRange extends Component {
  constructor() {
    super();
    this.state = {
      slider_arr: [xmin, x1, x2, x3, x4, x5, xmax],
      temp_point_val: [],
      checked: "",
    };
    this.handleChange = this.handleChange.bind(this);



  }

  handleChange = (e) => {
    e = e.map(function (each_element) {
      return Number(each_element.toFixed(5));
    });
    var new_slider_data = e;
    this.context.setValueFromSlider(Object.keys(this.props.propsData)[0], new_slider_data);

  }

  updateInputValue(evt) {
    console.log("i am fried=====================" + evt.target.value)
    const Tempslider_arrr = this.state.slider_arr.slice()
    Tempslider_arrr[1] = evt.target.value
    this.setState({
      inputValue: Tempslider_arrr
    });
  }

  handleChangeSlide(e) {
    let isChecked = e.target.checked;

    // do whatever you want with isChecked value
    console.log("from checkbox", e.target.value)
    console.log(isChecked)
    console.log(this.props.propsData)
    this.setState({
      checked: e.target.value,
    })
    this.context.updateState({ activeSliderName: Object.keys(this.props.propsData)[0] })
    // this.props.selectedSliderData(e.target.value)
  }


  getcolor(id) {
    console.log("inside get color dfunction", id)
    if (id == '$$-0-$$-1') {
      return "first"
    } else if (id == "$$-1-$$-2") {
      return "second"
    } else if (id == "$$-2-$$-3") {
      return "third"
    } else if (id == "$$-3-$$-4") {
      return "four"
    } else {
      return "five"
    }
  }

  render() {
    const { propsData } = this.props;
    let selectedClass;
    let count = 0;
    var i;
    const domain = [Object.values(propsData)[0].min, Object.values(propsData)[0].max];
    const defaultValues = [Object.values(propsData)[0].point1, Object.values(propsData)[0].point2, Object.values(propsData)[0].point3, Object.values(propsData)[0].point4, Object.values(propsData)[0].point5];

    return (
      <SliderContext.Consumer>
        {context => (
            <div style={{ margin: "5%", height: 120, width: "85%" }}>
              <Row>
                <h5>{Object.keys(propsData)[0]}</h5>
  
                <InputGroup size="sm" style={{ width: '65px', marginLeft: '120px', marginBottom: '5px' }}>
                  <Input name="input1" value={Object.values(propsData)[0].point1} onChange={evt => this.updateInputValue(evt)} />
                </InputGroup>
                <InputGroup size="sm" style={{ width: '65px', marginLeft: '10px', marginBottom: '5px' }}>
                  <Input name="input2" value={Object.values(propsData)[0].point2} />
                </InputGroup>
                <InputGroup size="sm" style={{ width: '65px', marginLeft: '10px', marginBottom: '5px' }}>
                  <Input name="input3" value={Object.values(propsData)[0].point3} />
                </InputGroup>
                <InputGroup size="sm" style={{ width: '65px', marginLeft: '10px', marginBottom: '5px' }}>
                  <Input name="input4" value={Object.values(propsData)[0].point4} />
                </InputGroup>
                <InputGroup size="sm" style={{ width: '65px', marginLeft: '10px', marginBottom: '5px' }}>
                  <Input name="input5" value={Object.values(propsData)[0].point5} />
                </InputGroup>
              </Row>
              <div>
                <Row>
  
                  <Col sm='1' className="chkBtn">
                    <FormGroup check>
                      <Label check>
                        <Input type="radio"
                          name="checkbox"
                          value={Object.keys(propsData)[0]}
                          onChange={e => this.handleChangeSlide(e)}
                          onClick={this.handleChangeSlide.bind(this)} />
                      </Label>
                    </FormGroup>
  
                  </Col>
                  <Col sm='11' style={{ marginLeft: "50px" }}>
                    <Row style={{ opacity: context.activeSliderName != Object.keys(propsData)[0] ? '0.3' : '1.0' }}>
                      <Col sm='1'>
                        <InputGroup size="sm" style={{ width: '65px', marginLeft: '5px' }}>
                          <Input name="input" value={Object.values(propsData)[0].min} />
                        </InputGroup>
                      </Col>
                      <Col sm='9' style={{ marginLeft: '40px', width: '100%' }}>
                        <Slider
                          mode={2}
                          step={.01}
                          // domain={[Object.values(propsData)[0].point1.min, Object.values(propsData)[0].point1.max]}
                          domain={domain}
                          rootStyle={sliderStyle}
                          onUpdate={this.onUpdate}
                          onChange={this.handleChange}
                          values={defaultValues}
                          disabled={context.activeSliderName != Object.keys(propsData)[0]}
                        >
                          <Rail>
                            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
                          </Rail>
                          <Handles>
                            {({ handles, getHandleProps }) => (
                              <div className="slider-handles">
                                {handles.map(handle => (
                                  <Handle
                                    key={handle.id}
                                    handle={handle}
                                    domain={domain}
                                    getHandleProps={getHandleProps}
                                  />
                                ))}
                              </div>
                            )}
                          </Handles>
                          <Tracks left={false} right={false}>
                            {({ tracks, getTrackProps }) => (
                              <div className="slider-tracks">
                                {tracks.map(({ id, source, target }) => (
                                  <div className={this.getcolor(id)}>
  
                                    <Track
                                      key={id}
                                      source={source}
                                      target={target}
  
  
                                      getTrackProps={getTrackProps}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </Tracks>
  
                          <Ticks count={10}>
                            {({ ticks }) => (
                              <div className="slider-ticks">
                                {ticks.map(tick => (
                                  <Tick key={tick.id} tick={tick} count={ticks.length} />
  
                                ))}
                              </div>
                            )}
                          </Ticks>
                        </Slider>
                      </Col>
                      <Col sm='1'>
                        <InputGroup size="sm" style={{ width: '65px' }}>
                          <Input name="input" value={Object.values(propsData)[0].max} />
                        </InputGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
          )}
      </SliderContext.Consumer>
    );
  }
}

SliderRange.contextType = SliderContext;


export default SliderRange