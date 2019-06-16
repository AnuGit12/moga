import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, InputGroup, InputGroupAddon, Input, Form, Table } from 'reactstrap';
import './style.css'
import TableData from './table.jsx';
import Papa from 'papaparse';


import SliderContext from './context/sliderContext';

import * as _ from 'lodash';


class Panel extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      processing: false,
      csvfile: undefined,
      input: '',
      output: '',
      constraint: '',
      ymax_arr: [],
      selected_slider_data: [],
      selected_dots: []
    };

    this.data = [];
    this.updateData = this.updateData.bind(this);
  }


  //Submit button function
  handlesubmit = (event) => {
    event.preventDefault()
    var input = parseInt(this.state.input)
    var output = parseInt(this.state.output)
    var constraint = parseInt(this.state.constraint)
    var length = this.context.key.length
    var ymax_arr = []
    var totalVal = input + output + constraint
    if (totalVal == length) {
      alert("value matched")
      let arr_final = []
      for (let i = 1; i <= input; i++) {
        arr_final.push("X" + i)
      }
      for (let i = 1; i <= output; i++) {
        arr_final.push("Y" + i)
        ymax_arr.push("Y" + i)
      }
      for (let i = 1; i <= constraint; i++) {
        arr_final.push("C" + i)
      }

      this.context.updateData({ ymax_arr })
      this.context.updateState({ key: arr_final });

      this.setState({
        processing: true
      }, () => {
        var temp_data = [];

        setTimeout(() => {
          // TODO: fix me!!!
          _.forEach(arr_final, (a, j) => {
            var x1, x2, Xrange, x1_1, x1_2, x1_3, x1_4, x1_5

            _.map(this.data, d => {
              x1 = _.floor(Number(_.min(d)), 3);   //getting min value of slider
              x2 = _.floor(Number(_.max(d)), 3);   //getting max value of slider
              Xrange = _.floor((x2 - x1), 3);
              x1_1 = x1 + 0.1 * Xrange;  //setting slider handle points values
              x1_2 = x1 + 0.3 * Xrange;  //setting slider handle points values
              x1_3 = x1 + 0.5 * Xrange;  //setting slider handle points values
              x1_4 = x1 + 0.7 * Xrange;  //setting slider handle points values
              x1_5 = x1 + 0.9 * Xrange;  //setting slider handle points values
            });

            temp_data.push({
              [a]: {
                "min": x1,
                "max": x2,
                "point1": x1_1,
                "point2": x1_2,
                "point3": x1_3,
                "point4": x1_4,
                "point5": x1_5
              }
            });
          });

          // _.forEach(arr_final, (a, j) => {
          //   temp_data.push({
          //     [a]: {
          //       // "min": x1,
          //       // "max": x2,
          //       // "point1": x1_1,
          //       // "point2": x1_2,
          //       // "point3": x1_3,
          //       // "point4": x1_4,
          //       // "point5": x1_5
          //     }
          //   });
          // });

          // _.forEach(this.data, d => {
          //   var min = _.floor(Number(_.min(d)), 3);   //getting min value of slider
          //   var max = _.floor(Number(_.max(d)), 3);   //getting max value of slider
          //   var Xrange = _.floor((max - min), 3);
          //   var point1 = min + 0.1 * Xrange;  //setting slider handle points values
          //   var point2 = min + 0.3 * Xrange;  //setting slider handle points values
          //   var point3 = min + 0.5 * Xrange;  //setting slider handle points values
          //   var point4 = min + 0.7 * Xrange;  //setting slider handle points values
          //   var point5 = min + 0.9 * Xrange;  //setting slider handle points values
            
          //   _.forEach(arr_final, key => {
          //     temp_data[i][key] = {
          //       min, max, point1, point2, point3, point4, point5
          //     }
          //   })
          // });
          this.setState({ processing: false });
          this.context.updateState({ sliderData: temp_data });
        }, 0);
      })
    } else {
      alert("value did not match")
    }
  }

  handleChange = event => {
    this.csvfile = event.target.files[0];
  };

  //parsing csv file
  importCSV = () => {
    this.setState({ processing: true });

    const { csvfile } = this;

    Papa.parse(csvfile, {
      complete: this.updateData,
      header: false
    });
  };

  updateData(result) {
    var data = result.data,
      len = parseInt(data[0].length),
      arr = [];

    for (var i = 1; i <= len; i++) {
      arr.push(i)
    };

    this.data = data;
    this.context.updateData({ data });
    this.context.updateState({ key: arr });

    this.setState({
      processing: false
    })
  }

  render() {
    var contentMarkup = null;
    console.log(this.props, 'propsss');
    var contentMarkup;

    if (this.state.processing) {
      contentMarkup = (
        <div className="spinner tblscrl">
          <div className="lds-roller">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
        </div>
      )
    }
    else if (this.data.length) {
      contentMarkup = (
        <div className="tblscrl">
          <Table bordered>
            <thead style={{ backgroundColor: '#80bfff', borderColor: '#333' }}>
              <tr>
                <th>#</th>
                {this.context.key.map((item) => <th>{item}</th>)}
              </tr>
            </thead>
            <TableData data={this.data} selected_dots={this.context.selected_dots} />
          </Table>
        </div>
      )
    }

    return (
      <Row>
        <Col md="12">
          <Card body outline color="primary">
            <div className="App">
              <div>
                <h4>Import moga file</h4>
                <Row style={{ marginBottom: '15px' }}>
                  <input className="csv-input"
                    type="file"
                    ref={input => {
                      this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                    style={{ marginLeft: '15px' }}
                  />
                  <p />
                  <Button outline color="primary" onClick={this.importCSV} style={{ marginLeft: '15px' }} size="sm">Submit</Button>{' '}
                  <Button outline color="success" style={{ marginLeft: '15px' }} size="sm">Save File</Button>{' '}
                  <Button outline color="danger" style={{ marginLeft: '15px' }} size="sm">Open Saved Data</Button>
                </Row>
                <Form >
                  <Row>
                    <InputGroup size="sm" style={{ width: '25%', marginLeft: '15px' }}>
                      <InputGroupAddon addonType="prepend">No of Input</InputGroupAddon>
                      <Input name="input" onChange={e => this.setState({ input: e.target.value })} />
                    </InputGroup>
                    <InputGroup size="sm" style={{ width: '25%', marginLeft: '15px' }}>
                      <InputGroupAddon addonType="prepend">No of Output</InputGroupAddon>
                      <Input name="output" onChange={e => this.setState({ output: e.target.value })} />
                    </InputGroup>
                    <InputGroup size="sm" style={{ width: '25%', marginLeft: '15px' }}>
                      <InputGroupAddon addonType="prepend">No of Constraints</InputGroupAddon>
                      <Input name="constraints" onChange={e => this.setState({ constraint: e.target.value })} />
                    </InputGroup>
                    <Button onClick={e => this.handlesubmit(e)} outline type="submit" color="success" style={{ marginLeft: '15px' }} size="sm">Validate</Button>
                  </Row>
                </Form>
              </div>
              {contentMarkup}
            </div>
          </Card>
        </Col>
      </Row>
    )
  };
};

Panel.contextType = SliderContext;

export default Panel;