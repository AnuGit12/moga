import * as d3 from 'd3';
import React, { useState,useContext } from 'react';
import './style.css'
import {  Row, Col} from 'reactstrap';
import { DropdownToggle, DropdownMenu, DropdownItem , UncontrolledButtonDropdown,Label} from 'reactstrap';
import SliderContext from '../context/sliderContext';


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
      debugger;
      console.log("index_of_slider",index_of_slider)
      var slider_col = []
      this.props.propsData.data.map((item, key) =>
        
        slider_col.push(item[index_of_slider])

       )

      let temp_data= xValue.map((x, i) => ({ x, y: yValue[i]}))

      temp_data.map((val,i) => val.slider_col = slider_col[i])
      console.log(temp_data, '!@#', slider_col)
      this.setState({
        data: temp_data,
        // data:d
      })

      console.log("??@@",this.props.propsData)
      // console.log("data from setdata function"+d)
      console.log("!!",this.state.data)

    }
   
    toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    };

    handleChange1 =(e) =>{
      var t = [{'s':3},{'s':4}]
      console.log("cheking type ", (this.state.data))
      console.log("data from handle one"+JSON.stringify(this.state.data, null, 2))
        let x=[]
        var len1 = this.props.propsData.length.indexOf(e.currentTarget.textContent)
        this.props.propsData.data.map((item, key) =>
            x.push(item[len1])
        )
        console.log("final value of y is", this.state.graph_domain)
        console.log("&&&&&&&&&",this.props.propsData.selected_slider_data)
       
    //   this.setState({
    //     selectValue1:e.currentTarget.textContent,
    //     xValue:x
    // });
      const contextValue = this.context;
      console.log("^^^", this.state.data)
    console.log("yvalye from state" , this.state.yValue)
     
        this.setState({
          selectValue1:e.currentTarget.textContent,
          xValue:x
      }, () => {
        // if(this.state.yValue !=null ){
        //   console.log('$$$$')
        // this.setData()
        // }
        }); 
      
    
    console.log("123321")
    console.log(this.props.propsData.slider_data[0])
    
  };
    
    handleChange2 =(e) =>{
      let y=[]
      console.log("in handle change"+e.currentTarget.textContent)
      
      var len2 = this.props.propsData.length.indexOf(e.currentTarget.textContent)
      console.log(len2)
      console.log("for loop will start"+(this.props.propsData.data).length)
      this.props.propsData.data.map((item, key) =>
        
        y.push(item[len2])

       )
       console.log("final value of y is"+y)
       
       this.setState({
        selectValue2:e.currentTarget.textContent,
        yValue:y
    }, () => {
 
      this.setData()
      
      }); 
 
  };
    
      componentDidUpdate() {
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
          
          
        
        const dots = chart.selectAll('dot')
          .data(this.state.xValue.length && this.state.yValue.length ? this.state.data : [], null, 2)
          .enter().append('circle')
          .attr('r', 5)
          .attr('cx', d => {return xScale(d.x); })
          .attr('cy', d => {return yScale(d.y)})
          .style('fill', () => {
          for (var i=0; i<this.state.data.length; i++){
            var slider_val =this.context.sliderData.find(val => val[this.context.activeSliderName])
            console.log(slider_val, 'slider value!', this.state.data)
            if (slider_val) {
              var point1= Object.values(slider_val)[0].point1
              var point2= Object.values(slider_val)[0].point2
              var point3= Object.values(slider_val)[0].point3
              var point4= Object.values(slider_val)[0].point4
              var point5= Object.values(slider_val)[0].point5
               if (this.state.data[i].slider_col>point1 && this.state.data[i].slider_col<point2 ){
                return 'green';
              }else if(this.state.data[i].slider_col>point2 && this.state.data[i].slider_col<point3){
                return 'blue'
              }else if(this.state.data[i].slider_col>point3 && this.state.data[i].slider_col<point4){
                return 'yellow'
              }else if(this.state.data[i].slider_col>point4 && this.state.data[i].slider_col<point5){
                return 'red'
              }else{
                return 'black'
              } 
            }
            else {
              return 'black';
            }


            }
            


          
          });
        
        
    
        dots.on("mouseover", d => {
          tooltip.transition()
             .duration(50)
             .style("opacity", .9);
          tooltip.html("x "+d.x+ "  y "+d.y)
             .style("left", (d3.event.pageX + 10) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.transition()
             .duration(50)
             .style("opacity", 0);
        });
    
        chart.selectAll('text')
          .data(this.state.data, null, 2)
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
          .data(this.state.data)
          .exit()
          .remove()

          // chart.selectAll("circle")
          // .data(dataset)
          // .transition()
          // .duration(1000)
          // .attr("cx", function(d) {
          //      return xScale(d[0]);
          // })
          // .attr("cy", function(d) {
          //      return yScale(d[1]);
          // });


          // chart.selectAll('dots')
          // .data(this.state.data, null, 2)
          // .exit()
          // .remove()

          // chart.selectAll("circle")
          //   .data(this.state.data)
          //   .exit()
          //   .remove()

          

            // chart.selectAll("svg").remove();
      
    }


    
    render() {
      return (
        <SliderContext.Consumer>
          {context => (
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
                                
                            )
                            )
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
                    {console.log(">>"+this.props.propsData.length)}
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
        <svg className='chart'></svg>
        </Row>
          
        </div>
          )}
        </SliderContext.Consumer>
      );
    }
  }
  GraphMOga.contextType = SliderContext;


export default GraphMOga;