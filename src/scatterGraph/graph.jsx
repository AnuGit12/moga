//import * as d3 from 'd3';
import React, { useState,useContext } from 'react';
import './style.css'
import {  Row, Col,Button, ButtonGroup} from 'reactstrap';
import { DropdownToggle, DropdownMenu, DropdownItem , UncontrolledButtonDropdown,Label} from 'reactstrap';
import SliderContext from '../context/sliderContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faSearchPlus, faSearchMinus, faMousePointer, faArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

class GraphMOga extends React.Component {
    constructor(props){
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        data: [
         
        ],
        dropdownOpen: false,
        selectValue1: ' ',
        selectValue2: ' ',
        yValue:[],
        xValue:[],
        sValue:[],
        
        slider_col:[]


      }
      const dur = Math.floor(Math.random() * 500 + 1000)
      this.transition = d3.transition().duration(dur).ease(d3.easeCubicInOut);

    }
    

    setData = () =>{
      const { xValue, yValue } = this.state;
      var index_of_slider = (this.props.propsData.length).indexOf(this.context.activeSliderName)
      var slider_col = []
      this.props.propsData.data.map((item, key) =>
        slider_col.push(item[index_of_slider])
       )
      let temp_data= xValue.map((x, i) => ({ x, y: yValue[i]}))
      this.setState({
        data: temp_data,
      })
  }
   
    toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    };

    handleChange1 =(e) =>{
      let x=[]
        var len1 = this.props.propsData.length.indexOf(e.currentTarget.textContent)
        this.props.propsData.data.map((item, key) =>
            x.push(item[len1])
        )
        this.setState({
          selectValue1:e.currentTarget.textContent,
          xValue:x
      }, () => {
        }); 
        this.context.updateState({ selectedDropdown: {1: e.currentTarget.textContent, 2: this.state.selectValue2 } });
        // this.props.propsData.getDropdownValue(e.currentTarget.textContent)
        
      };
    
    handleChange2 =(e) =>{
      let y=[]
      var len2 = this.props.propsData.length.indexOf(e.currentTarget.textContent)
      this.props.propsData.data.map((item, key) =>
        y.push(item[len2])
        )
       this.setState({
        selectValue2:e.currentTarget.textContent,
        yValue:y
    }, () => {
        this.setData()
      }); 
      // this.props.propsData.getDropdownValue(e.currentTarget.textContent)
      this.context.updateState({ selectedDropdown: {1: this.state.selectValue1, 2: e.currentTarget.textContent } });


 
  };


 //////////////////////////////////////////////////////////////////  To calculate Ymax /////////////////////////////////////////////////////////////

  YmaxCall =()=>{
    console.log("data++", this.state.data)
    var csvData = this.props.propsData.data
    var ySlider =  this.props.propsData.ymax_arr
    var ymaxData =[]
    

    for (var j=0;j<this.props.propsData.ymax_arr.length; j++){
      var k, yhandle1, yhandle2 , current_value
      var addition_term
      var multiplication_term

         var ydata = []
          var len2 = this.props.propsData.length.indexOf( this.props.propsData.ymax_arr[j])
          this.props.propsData.data.map((item, key) =>{
            current_value = item[len2]
            
            var slider_val = this.context.sliderData.find(val => val[ySlider[j]]);
            var yslider_p1 = slider_val[ySlider[j]].point1
            var yslider_p2 = slider_val[ySlider[j]].point2
            var yslider_p3 = slider_val[ySlider[j]].point3
            var yslider_p4 = slider_val[ySlider[j]].point4
            var yslider_p5 = slider_val[ySlider[j]].point5
            var ymin = slider_val[ySlider[j]].min
            var ymax = slider_val[ySlider[j]].max
            if (item[len2]<yslider_p1){
              k=1
              yhandle1= ymin
              yhandle2 = yslider_p1
              
            }else if(item[len2]>yslider_p1 && item[len2]<yslider_p2){
              k=2
              yhandle1= yslider_p1
              yhandle2 = yslider_p2
            }else if(item[len2]>yslider_p2 && item[len2]<yslider_p3){
              k=3
              yhandle1= yslider_p2
              yhandle2 = yslider_p3
            }else if(item[len2]>yslider_p3 && item[len2]<yslider_p4){
              k=4
              yhandle1= yslider_p3
              yhandle2 = yslider_p4
            }else if(item[len2]>yslider_p4 && item[len2]<yslider_p5){
              k=5
              yhandle1= yslider_p4
              yhandle2 = yslider_p5
            }else if(item[len2]>yslider_p5){
              k=6
              yhandle1= yslider_p5
              yhandle2 = ymax
            }
            
            if(k==1){
              addition_term=0
              multiplication_term=0.1
            }else if(k==2){
              addition_term=0.1
              multiplication_term=0.2
            }else if(k==3){
              addition_term=0.3
              multiplication_term=0.2
            }else if(k==4){
              addition_term=0.5
              multiplication_term=0.2
            }else if(k==5){
              addition_term=0.7
              multiplication_term=0.2
            }else if(k==6){
              addition_term=0.9
              multiplication_term=0.1
            }

            var y_max_value = addition_term + multiplication_term*((current_value - yhandle1)/(yhandle2-yhandle1))
            ydata.push(y_max_value)
          }
        )
      
      ymaxData = ymaxData.slice()
      ymaxData.push(ydata)
  }
         ymaxData.map((item,key)=>{
            var data_y1=[]
                for(var j=0; j<this.props.propsData.ymax_arr.length;j++){
                  data_y1.push(ymaxData[key][j])
                }
          })
        }

    
      //   downloadGraphImage=()=>{
      // const node = document.getElementById('my-chart');
      // console.log("PP",node)

      //     domtoimage.toPng(node)
      //     .then(function (dataUrl) {
      //         var img = new Image();
      //         img.src = dataUrl;
      //         document.body.appendChild(img);
      //     this.saveJpg()

      //     })
      //     .catch(function (error) {
      //         console.error('oops, something went wrong!', error);
      //     });
      //   }

        downloadGraphImage=()=>{
      console.log("PP+",document.getElementById('my-chart'))
    //   domtoimage.toBlob(document.getElementById('my-chart'))
    // .then(function (blob) {
    //     saveAs(blob, 'my-node.png');
    // });

    domtoimage.toBlob(document.getElementById('my-chart'))
    .then(function (blob) {
        window.saveAs(blob, 'my-node.png');
    });

    //       domtoimage.toJpeg(document.getElementById('my-chart'), { quality: 0.95 })
    // .then(function (dataUrl) {
    //     var link = document.createElement('a');
    //     link.download = 'my-image-name.jpeg';
    //     link.href = dataUrl;
    //     link.click();
    // });
        }
    componentDidUpdate() {
        var mySelectedArray = [];

        var graphData = this.state.data;
        var selectDot = (d) =>{
          this.props.propsData.getSelectedDot(d)

        }
        var clickDot = (d) =>{
         this.props.propsData.getRowFromClickOnGraphDot(d)
      }


        var index_of_slider = (this.props.propsData.length).indexOf(this.context.activeSliderName)
        var graphdatanew = graphData.map((obj,i)=> ({ ...obj, 'row_id': i }))
         if(this.props.propsData.data){
          graphdatanew.map((val,i) => val.slider_col = this.props.propsData.data[i][index_of_slider])

        }
         var slider_val =this.context.sliderData.find(val => val[this.context.activeSliderName]);
         debugger;
        if (slider_val) {
          var point1= Object.values(slider_val)[0].point1
          var point2= Object.values(slider_val)[0].point2
          var point3= Object.values(slider_val)[0].point3
          var point4= Object.values(slider_val)[0].point4
          var point5= Object.values(slider_val)[0].point5
        }
        
        var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("background", "red")
        .style("opacity", 0);

        const height = 400,
        width = 500,
        margins = {top: 20, right: 100, bottom: 50, left: 50};
        const xscale1 = Math.min.apply(Math,this.state.xValue.map(Number))
        const xscale2 = Math.max.apply(Math,this.state.xValue.map(Number))
        const yscale1 = Math.min.apply(Math,this.state.yValue.map(Number))
        const yscale2 = Math.max.apply(Math,this.state.yValue.map(Number))

        const chart = d3.select('.chart')
          .attr('width', width + margins.left + margins.right)
          .attr('height', height + margins.top + margins.bottom)
          
          .append('g')
          .attr('transform','translate(' + margins.left + ',' + margins.top + ')');
          var yScale = d3.scaleLinear()
          .rangeRound([0,height])
          .domain([yscale2,yscale1]);
          var xScale = d3.scaleLinear()
          .rangeRound([0,width])
          .domain([xscale1,xscale2]);
          
        var r = 5;
        const dots = chart.selectAll('dot')
          .data(this.state.xValue.length && this.state.yValue.length ? graphdatanew : [], null, 2)
          .enter().append('circle')
          .attr('r', r)
          .attr("id", function(d){return d["row_id"]})
          .attr('cx', d => {return xScale(d.x); })
          .attr('cy', d => {return yScale(d.y)})
          .on("click", function(d){
            d['row_id']= d3.select(this).attr("id")
            clickDot(d)
          })
         
          .style('fill', (d) => {
            if (d.slider_col>point1 && d.slider_col<point2 ){
             return '#0BAF17';
           }else if(d.slider_col>point2 && d.slider_col<point3){
             return '#276FDA'
           }else if(d.slider_col>point3 && d.slider_col<point4){
             return '#FFA620'
           }else if(d.slider_col>point4 && d.slider_col<point5){
             return '#FF0000'
           }else{
             return 'black'
           }

          });

        dots.on("mouseover", d => {
          tooltip.transition()
             .duration(500)
            .style("opacity", .9);
          tooltip.html(" x "+d.x+ "  y "+d.y)
             .style("left", (d3.event.pageX + 10) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.transition()
             .duration(50)
             .style("opacity", 0);
        });
        
        
        chart.selectAll('text')
          .data(graphData, null, 2)
          .enter().append('text')
          .attr('transform', 'translate(10,5)');
        
        chart.append('g')
          .attr('transform','translate(0,' + height + ')')
          .call(d3.axisBottom(xScale));
        
        chart.append('g')
          .call(d3.axisLeft(yScale));
        
        chart.append('text')
          .style('font-size', '14px')
          .style('text-anchor', 'middle')
          .attr('x', width / 2)
          .attr('y', height + 50)
          .text('X Axis')
        
        chart.append('text')
          .style('font-size', '14px')
          .style('text-anchor', 'middle')
          .attr('x', height / -2)
          .attr('y', -30)
          .attr('transform', 'rotate(-90)')
          .text('Y Axis')

          chart.selectAll('circle')
          .data(graphData)
          .exit()
          .remove()
          var lasso_start = function() {
            lasso.items()
                .attr("r",5) // reset size
                .classed("not_possible",true)
                .classed("selected",false);
        };
        var lasso_draw = function() {
        
            // Style the possible dots
            lasso.possibleItems()
                .classed("not_possible",false)
                .classed("possible",true);
    
            // Style the not possible dot
            lasso.notPossibleItems()
                .classed("not_possible",true)
                .classed("possible",false);
        };

        var lasso_end = function() {
            // Reset the color of all dots
            
            lasso.items()
                .classed("not_possible",false)
                .classed("possible",false);
    
            // Style the selected dots
            lasso.selectedItems()
                .classed("selected",true)
                .attr("r",9);
    
            // Reset the style of the not selected dots
            lasso.notSelectedItems()
                .attr("r",5);
            var selected = lasso.selectedItems().data();
            for(var dot=0; dot<lasso.selectedItems()._groups[0].length; dot++){
                mySelectedArray.push(lasso.selectedItems()._groups[0][dot].id)
            }
            selectDot(mySelectedArray)
        };
        

        var lasso = d3.lasso()
        .closePathSelect(true)
        .closePathDistance(100)
        .items(dots)
        .targetArea(chart)
        .on("start",lasso_start)
        .on("draw",lasso_draw)
        .on("end",lasso_end);
        
          chart.call(lasso);

          
  
    }


    
    render() {
     const sliderDataYmax =[]
     Object.entries(this.context.sliderData).map(([name, info]) =>
        (
          sliderDataYmax.push(Object.keys(this.context.sliderData[name]))
         )
      )

      if (this.context.sliderData.length) debugger;
      const buttonNames = _.flatten(_.map(this.context.sliderData, x => {
        return _.keys(x);
      }))
      
      return (
        <SliderContext.Consumer>
          {context => {
            return (
              <div className="container">
                  <Row>
                      <Col sm="6">
                          <Label for="exampleEmail">Select X-Axis Value</Label>
                          <UncontrolledButtonDropdown style={{marginLeft:'40px'}}>
                              <DropdownToggle caret size="sm">
                                  {this.state.selectValue1}
                              </DropdownToggle>
                              <DropdownMenu>
                                {
                                  (this.props.propsData.length || []).map(option => (
                                        <div key={option.id}>
                                        <DropdownItem onClick={this.handleChange1}>{option}</DropdownItem>
                                        </div>
                                    ))
                                }
                              </DropdownMenu>
                          </UncontrolledButtonDropdown>
                        </Col>
                      <Col sm="6">
                          <Label for="exampleEmail">Select Y-Axis Value</Label>
                          <UncontrolledButtonDropdown style={{marginLeft:'100px'}}>
                              <DropdownToggle caret size="sm">
                              {this.state.selectValue2}
                        
                              </DropdownToggle>
                              <DropdownMenu>
                              {
                                
                              (this.props.propsData.length || []).map(option => (
                                      <div key={option.id}>
                                      <DropdownItem onClick={this.handleChange2}>{option}</DropdownItem>
                                      </div>
                                  ))
                              }
                              </DropdownMenu>
                          </UncontrolledButtonDropdown>
                          </Col> 
                  </Row>
                  <Row>
                  
                      <ButtonGroup>
                        <Button onClick={this.downloadGraphImage}><FontAwesomeIcon icon={faCamera} /></Button>
                        <Button><FontAwesomeIcon icon={faSearchPlus} /></Button>
                        <Button><FontAwesomeIcon icon={faSearchMinus} /></Button>
                        <Button><FontAwesomeIcon icon={faMousePointer} /></Button>
                        <Button><FontAwesomeIcon icon={faArrowsAlt} /></Button>
                        


                      </ButtonGroup>
                  </Row>
              <Row >
                <div id='my-chart'>
                  <svg className='chart'> </svg>

                </div>
              </Row>
              <Row>
                <Label for="exampleEmail">Color Variables</Label>
                <ButtonGroup>
                  {
                    _.map(buttonNames, name => 
                      <Button onClick={() => this.context.updateState({activeSliderName: name})}>
                        {name}
                      </Button>
                    )
                  }
                  <Button onClick={this.YmaxCall}>Ymax</Button>
                </ButtonGroup>
              </Row>
                
              </div>
            )
          }}
        </SliderContext.Consumer>
      );
    }
  }
  GraphMOga.contextType = SliderContext;


export default GraphMOga;