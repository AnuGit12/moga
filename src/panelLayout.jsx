import React from "react";

import Panel from "./Panel.jsx";

import { GoldenLayoutComponent } from "./golden-layout/golden-layout";
import SliderContext from "./context/sliderContext.js";
import SliderProvider from "./context/sliderProvider.jsx";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInitialState = () => {
    return { value: this.props.value || "bla" };
  };

  setValue = e => {
    this.setState({ value: e.target.value });
  };

  setContainerTitle = () => {
    this.props.glContainer.setTitle(this.state.value);
  };

  render() {
    console.log(this.context, "in component layout");
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.setValue} />
        <button onClick={this.setContainerTitle}>set title</button>
        <div>{this.props.value}</div>
      </div>
    );
  }
}

MyComponent.contextType = SliderContext;

class PanelLayout extends React.Component {
  render() {
    console.log(this.context, "in panel layout");
    return (
      <SliderProvider>
        <GoldenLayoutComponent
          htmlAttrs={{ style: { height: "100vh", width: "100%" } }}
          config={{
            content: [
              {
                type: "row",
                content: [
                  {
                    title: "A react component",
                    type: "react-component",
                    component: "leftPanel"
                  },
                  {
                    type: "column",
                    content: [
                      {
                        title: "Another react component",
                        type: "react-component",
                        component: "testItem",
                        props: { value: "I'm on the right" }
                      },
                      {
                        title: "Another react component",
                        type: "react-component",
                        component: "testItem",
                        props: { value: "I'm on the right" }
                      },
                      {
                        title: "Another react component",
                        type: "react-component",
                        component: "testItem",
                        props: { value: "I'm on the right" }
                      }
                    ]
                  }
                ]
              }
            ]
          }}
          registerComponents={myLayout => {
            myLayout.registerComponent("testItem", MyComponent);
            myLayout.registerComponent("leftPanel", Panel);
          }}
        />
      </SliderProvider>
    );
  }
}

PanelLayout.contextType = SliderContext;

export default PanelLayout;
