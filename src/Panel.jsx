import React from 'react';
import { Card, Button, CardTitle, CardText, Table, Row, Col, InputGroup, InputGroupAddon, Input, Form } from 'reactstrap';
import './style.css'
import Papa from 'papaparse';
import Graph from './graph.jsx'
import SliderContext from './context/sliderContext';


class Panel extends React.Component {
  constructor(){
      super();
      this.state={
          csvfile:undefined,
          data:null,
          length:[],
          key:[],
          value:[],
          
          new_col_name:[],
          input:'',
          output:'',
          constraint:'',
          mapping:{},
          graph_v1:[],
          graph_v2:[],
          slider_data:[],
          ymax_arr:[],
          selected_slider_data:[],
          row_id:'',
          selected_dots:[]
       };
      this.updateData = this.updateData.bind(this);
  }


  //Submit button function
  handlesubmit = (event) =>{
    event.preventDefault()
    var input = parseInt(this.state.input)
    var output = parseInt(this.state.output)
    var constraint = parseInt(this.state.constraint)
    var length = this.state.length.length
    var ymax_arr = []
    var totalVal = input + output + constraint
    if (totalVal == length) {
      alert("value matched")
      let arr_final = []
      for(let i = 1; i <= input; i++){
        arr_final.push("X"+i)
      }
      for(let i = 1; i <= output; i++){
        arr_final.push("Y"+i)
        ymax_arr.push("Y"+i)
      }
      for(let i = 1; i <= constraint; i++){
        arr_final.push("C"+i)
      }
      this.setState({
        length:arr_final,
        value:arr_final,
        ymax_arr:ymax_arr
      })
      var temp_arr = []
      var temp_data=[]
      for (let j=0 ; j<arr_final.length; j++){
        var x1, x2,Xrange, x1_1,x1_2,x1_3,x1_4,x1_5,keyVal
        keyVal = arr_final[j]
        this.state.data.map(function(d) {
          temp_arr.push(d[j])
         x1 = parseFloat((Math.min.apply(Math,temp_arr.map(Number))).toFixed(3));   //getting min value of slider
         x2 = parseFloat((Math.max.apply(Math,temp_arr.map(Number))).toFixed(3));   //getting max value of slider
         Xrange = parseFloat((x2-x1).toFixed(3)) 
         x1_1 = parseFloat(x1 + 0.1*Xrange)                                         //setting slider handle points values
         x1_2 = parseFloat(x1 + 0.3*Xrange)                                         //setting slider handle points values
         x1_3 = parseFloat(x1 + 0.5*Xrange)                                         //setting slider handle points values
         x1_4 = parseFloat(x1 + 0.7*Xrange)                                         //setting slider handle points values
         x1_5 = parseFloat(x1 + 0.9*Xrange)                                         //setting slider handle points values
        
      })
      temp_data.push({
        [keyVal] : {
          "min":x1,
          "max":x2,
          "point1":x1_1,
          "point2":x1_2,
          "point3":x1_3,
          "point4":x1_4,
          "point5":x1_5
        }
      })    
    }

      this.context.updateState({ sliderData: temp_data });        
    } else {
      alert("value did not match")
    }
    }

// function to get value of x and y value to plot graph
  graph_data = (x,y) =>{
    let graph_v1 =[]
    let graph_v2 =[]
    this.state.data.map(function(d) {
      console.log(d)
      graph_v1.push(d[x])
    })
  this.state.data.map(function(d) {
    console.log(d)
    graph_v2.push(d[y])
  })
 this.setState({
  graph_v1:graph_v1,
  graph_v2:graph_v2
 })
  }

//setting color to table's row after clicking on any dot or selecting with lasso selector
  rowFunction = (i) =>{
     var selected_dots_array = this.state.selected_dots
    var isExist = selected_dots_array.indexOf(i.toString())
    if (isExist=== -1){
      return 'white'
    }else{
       return "yellow"
    }
  }


  // setting selecting dot's id by lasso seelctor in state to use in rowFunction
  getSelectedDot = (mySelectedArray) => {
    this.setState({
      selected_dots:mySelectedArray
    })
  }


  //setting clicked dot's id in state to use in rowFunction
  getRowFromClickOnGraphDot = (rowId) => {
    this.setState({ selected_dots: [...this.state.selected_dots, rowId.row_id] })
  }


  //getting selected slider values
  setValueFromSlider = (sliderName, value) => {
    var slider_data = this.context.sliderData;
    var slider_val =slider_data.find(val => val[sliderName])
    let selected_slider_data = Object.assign({}, this.state.selected_slider_data);
    
    if (value){
      slider_val[sliderName]['point1'] = value[0]
      slider_val[sliderName]['point2'] = value[1]
      slider_val[sliderName]['point3'] = value[2]
      slider_val[sliderName]['point4'] = value[3]
      slider_val[sliderName]['point5'] = value[4]

      selected_slider_data.name=sliderName
      selected_slider_data.point1=value[0]
      selected_slider_data.point2=value[1]
      selected_slider_data.point3=value[2]
      selected_slider_data.point4=value[3]
      selected_slider_data.point5=value[4]  
      }
      this.setState({ slider_data,selected_slider_data})
    }

  handleChange = event =>{
      this.setState({
          csvfile:event.target.files[0]
      });
  };

  //parsing csv file
  importCSV = () =>{
      const { csvfile } = this.state;
      Papa.parse(csvfile, {
          complete: this.updateData,
          header: false
      });
  };

  updateData(result){
      var data = result.data;
      var len = parseInt(data[0].length)
      let arr = []
      for(let i = 0; i <= len-1; i++){
        arr.push(i)
      }
      this.setState({
        data:data,
        length:arr,
        key:arr

      })
    }


  
  render () {
    var selectedSliderIndex = (this.state.length).indexOf(this.context.activeSliderName)
    let props = {
        data:this.state.data,
        length:this.state.length,
        slider_data:this.state.slider_data,
        setValueFromSlider: this.setValueFromSlider,
        selected_slider_data:this.state.selected_slider_data,
        active_slider_table_data: {},
        ymax_arr:this.state.ymax_arr,
        getRowFromClickOnGraphDot:this.getRowFromClickOnGraphDot,
        getSelectedDot:this.getSelectedDot
      }

      if (selectedSliderIndex != -1) {
        props.active_slider_table_data = this.state.data[selectedSliderIndex]
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
                                        <h4>Import moga file</h4>
                                        <Row style={{marginBottom:'15px'}}>
                                          <input className="csv-input"
                                          type ="file"
                                          ref = {input => {this.filesInput =input;
                                          }}
                                          name = "file"
                                          placeholder = {null}
                                          onChange= {this.handleChange}
                                          style={{marginLeft:'15px'}}
                                          />
                                          <p />
                                          <Button outline color="primary" onClick={this.importCSV} style={{marginLeft:'15px'}} size="sm">Submit</Button>{' '}
                                          <Button outline color="success" style={{marginLeft:'15px'}} size="sm">Save File</Button>{' '}
                                          <Button outline color="danger" style={{marginLeft:'15px'}} size="sm">Open Saved Data</Button>
                                        </Row>
           
                                        <Form >
                                            <Row>
                                                <InputGroup size="sm" style={{width:'25%',marginLeft:'15px'}}>
                                                    <InputGroupAddon addonType="prepend">No of Input</InputGroupAddon>
                                                    <Input name="input" onChange= {e =>this.setState({input:e.target.value})}/>
                                                </InputGroup>
                                                <InputGroup size="sm" style={{width:'25%', marginLeft:'15px'}}>
                                                    <InputGroupAddon addonType="prepend">No of Output</InputGroupAddon>
                                                    <Input name="output" onChange= {e =>this.setState({output:e.target.value})}/>
                                                </InputGroup>
                                                <InputGroup size="sm" style={{width:'25%', marginLeft:'15px'}}>
                                                    <InputGroupAddon addonType="prepend">No of Constraints</InputGroupAddon>
                                                    <Input name="constraints" onChange= {e =>this.setState({constraint:e.target.value})}/>
                                                </InputGroup>
                                              <Button onClick ={e =>this.handlesubmit(e)} outline type="submit" color="success" style={{marginLeft:'15px'}} size="sm">Validate</Button>
                                            </Row>
                                        </Form>
            
                                  <div className="tblscrl">
                                    <Table  bordered style={{marginTop:'15px',padding:'0.15rem'}}>
                                        <thead style={{ backgroundColor: '#80bfff', borderColor: '#333', display: 'block' }}>
                                          <tr style={{height:'50px',width:'40px !important'}}>
                                            <th>#</th>
                                            {this.state.length.map((item)=><th>{item}</th>)}
                                          </tr>
                                        </thead>
                                        <tbody style={{display: 'block'}}>
                                          {
                                            !!this.state.data && this.state.data.map((numList,i) =>(
                                              <tr  key={i} style={{backgroundColor: this.rowFunction(i)}}>
                                                <td  style={{ backgroundColor: '#80bfff', width:'10px',fontSize:'12px', height:'7px' }} >{i}</td>
                                                {
                                                    numList.map((num,j)=>
                                                    <td style={{ width:'10px',padding:'2px', fontSize:'12px',height:'7px'}} key={j}>{num}</td>
                                                  )
                                                }
                                              </tr>
                                            ))
                                          }
                                        </tbody>
                                    </Table>
                                  </div>
                                 </div>
                               </Card>
                            </Col>
                            <Col xs="6">
                              <Graph  {...props} />
                           </Col>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
    </div>
    
    )};
};

Panel.contextType = SliderContext;

export default Panel;