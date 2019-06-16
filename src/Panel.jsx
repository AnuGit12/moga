import React from 'react';
import { Card, Button, CardTitle,FormGroup, Label, CardText, Modal, ModalHeader, ModalBody, ModalFooter,Row, Col, InputGroup, InputGroupAddon, Input, Form, Table } from 'reactstrap';
import './style.css';
import { Api } from './utils/api';
import TableData from './table.jsx';
import Papa from 'papaparse';
import Graph from './graph.jsx';
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
      selected_dots: [],
      modal: false
      
    };

    this.key = [];
    this.data = [];
    // this.selected_dropdown= {'1':'','2':''}
    this.updateData = this.updateData.bind(this);
    this.toggle = this.toggle.bind(this);
    this.saveState = this.saveState.bind(this);

  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }





// getting dropdown values from graph panel
  getDropdownValue=(value)=>{
    console.log("dropdon value",value)
  }

  handleChangeModal=(e)=>{
    this.state_name = e.target.value
  }


  //Save State button function

saveState = () =>{
  this.setState(prevState => ({
    modal: !prevState.modal
  }));
  var saved_state_name = this.state_name
  var tableData=this.data
  console.log("tableData", tableData)
  var slidersData=this.context.sliderData
  console.log("slider data", slidersData)
  var dropdownData=this.context.selectedDropdown
  console.log("dropdown values",dropdownData)
  var input = this.state.input
  var output = this.state.output
  var constraint = this.state.constraint

  console.log("INPUT VALUES",input, output, constraint)
  var other_data = {'state_name':saved_state_name,'input':input,'output':output,'constraint':constraint,"dropdown":dropdownData}

  var promises = [Api.setTableData(tableData),Api.setSliderData(slidersData),Api.setOtherData(other_data)]
  // Promise.all(promises)
  // .then((response) => {

  // })
  // .catch((error) => {

  // })
}




  handlesubmit = (event) => {
    event.preventDefault()
    var input = parseInt(this.state.input)
    var output = parseInt(this.state.output)
    var constraint = parseInt(this.state.constraint)
    var length = this.key.length
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
      this.key = arr_final;

      this.setState({
        ymax_arr: ymax_arr,
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

          debugger;

          this.setState({ processing: false });
          this.context.updateState({ sliderData: temp_data });
        }, 0);
      })
    } else {
      alert("value did not match")
    }
  }


  // setting selecting dot's id by lasso seelctor in state to use in rowFunction
  getSelectedDot = (mySelectedArray) => {
    this.setState({
      selected_dots: mySelectedArray
    })
  }


  //setting clicked dot's id in state to use in rowFunction
  getRowFromClickOnGraphDot = (rowId) => {
    this.setState({ selected_dots: [...this.state.selected_dots, rowId.row_id] })
  }


  //getting selected slider values
  setValueFromSlider = (sliderName, value) => {
    var slider_data = this.context.sliderData;
    var slider_val = slider_data.find(val => val[sliderName])
    let selected_slider_data = Object.assign({}, this.state.selected_slider_data);

    if (value) {
      slider_val[sliderName]['point1'] = value[0]
      slider_val[sliderName]['point2'] = value[1]
      slider_val[sliderName]['point3'] = value[2]
      slider_val[sliderName]['point4'] = value[3]
      slider_val[sliderName]['point5'] = value[4]

      selected_slider_data.name = sliderName
      selected_slider_data.point1 = value[0]
      selected_slider_data.point2 = value[1]
      selected_slider_data.point3 = value[2]
      selected_slider_data.point4 = value[3]
      selected_slider_data.point5 = value[4]
    }
    this.setState({ slider_data, selected_slider_data })
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
    this.key = arr;

    this.setState({
      processing: false
    })
  }



  render() {
    var selectedSliderIndex = (this.key).indexOf(this.context.activeSliderName),
      contentMarkup = null;

    let props = {
      data: this.data,
      length: this.key,
      setValueFromSlider: this.setValueFromSlider,
      selected_slider_data: this.state.selected_slider_data,
      active_slider_table_data: {},
      ymax_arr: this.state.ymax_arr,
      getRowFromClickOnGraphDot: this.getRowFromClickOnGraphDot,
      getSelectedDot: this.getSelectedDot,
      getDropdownValue:this.getDropdownValue
    }

    if (selectedSliderIndex != -1) {
      props.active_slider_table_data = this.data[selectedSliderIndex]
    }

    var contentMarkup;

    if (this.state.processing) {
      contentMarkup = (
        <div class="spinner tblscrl">
          <div class="lds-roller">
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
                {this.key.map((item) => <th>{item}</th>)}
              </tr>
            </thead>
            <TableData data={this.data} selected_dots={this.state.selected_dots} />
          </Table>
        </div>
      )
    }

    return (
      <div>
        <React.Fragment>
          <Row>
            <Col xs="12">
              <Row>
                <Col xs="6">
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
                          <Button outline color="success" style={{ marginLeft: '15px' }} onClick={this.toggle} size="sm">Save File</Button>{' '}
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
                <Col xs="6">
                  <Graph  {...props} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          <FormGroup row>
          <Label for="exampleEmail" sm={4}>File name :</Label>
          <Col sm={8}>
            <Input type="text" name="text" id="save-state" placeholder="File name" onChange={this.handleChangeModal}/>
          </Col>
        </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveState}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </React.Fragment>
      </div>

    )
  };
};

Panel.contextType = SliderContext;

export default Panel;