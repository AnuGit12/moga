import React, { Component } from "react";

import SliderContext from "./sliderContext";

export default class SliderProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderData: [],
      activeSliderName: ''
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState(stateObj) {
    this.setState(stateObj, () => {
        console.log('state updated', this.state);
    });
  };

  render() {
    const { sliderData, activeSliderName, selectedDropdown } = this.state;
    const { updateState } = this;
    console.log(this.props.children, 'in providerrrrr');

    return (
      <SliderContext.Provider value={{ sliderData, activeSliderName, updateState, selectedDropdown }}>
        {this.props.children}
      </SliderContext.Provider>
    );
  }
}
