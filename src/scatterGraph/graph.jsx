import * as d3 from 'd3';
import React from 'react';
import './style.css'
import {  Row, Col} from 'reactstrap';
import { DropdownToggle, DropdownMenu, DropdownItem , UncontrolledButtonDropdown,Label} from 'reactstrap';

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
        
        x_val:[],
        y_val:[]


      }
      const dur = Math.floor(Math.random() * 500 + 1000)
      this.transition = d3.transition().duration(dur).ease(d3.easeCubicInOut);
    }

    setData = () =>{
      console.log("data from state------------------------------------------")
      console.log(typeof(JSON.parse(this.state.xValue[0])))
      console.log(this.state.yValue)
      // let graph_domain=[]
      this.setState({
        x_val:(this.state.xValue).map(num => Number(num)),
        y_val:(this.state.yValue).map(num => Number(num))

      })

      // if (xValue){

      
      // var x_domain_min =  Math.min.apply(Math,JSON.parse(this.state.xValue).map(Number))
      // var x_domain_max =  Math.min(xValue)
      // var y_domain_min =  Math.max(yValue)
      // var y_domain_max =  Math.min(yValue)

      // console.log(">>??>>",x_domain_min)
      // }
      // var stateCopy = Object.assign({}, this.state.graph_domain);
      // stateCopy.graph_domain[key].xmin = x_domain_min;
      // stateCopy.graph_domain[key].xmax = x_domain_max;
      // stateCopy.graph_domain[key].ymin = y_domain_min;
      // stateCopy.graph_domain[key].ymax = y_domain_max;

      // this.setState(stateCopy);




      // console.log( Math.min(...xValue))

      const { xValue, yValue } = this.state;
      
      
      // console.log("data from setdata function", this.state.data)
      // console.log(typeof(this.state.data))

      var d = [
        {"x":0.122584,"y":0.353008,"c":0.355928},
        {"x":0.243913,"y":-0.591662,"c":0.355928},
        {"x":0.122584,"y":-0.626392,"c":0.346507},
        {"x":0.164663,"y":-0.131016,"c":0.703251},
        {"x":0.243913,"y":-0.356120,"c":0.599739},
        {"x":0.237486,"y":-0.131016,"c":0.512527},
        {"x":.132584,"y":.253008,"c":.235928},
        {"x":.152584,"y":.453008,"c":.125928},
        {"x":.112584,"y":.363008,"c":.235928},
        {"x":.162584,"y":.393008,"c":.125928}
  
      ]
      this.setState({
        // data: xValue.map((x, i) => ({ x, y: yValue[i] ,c:0})),
        data:d
      })
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
      console.log("cheking type "+ typeof(this.state.data))
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
    this.setState({
      selectValue1:e.currentTarget.textContent,
      xValue:x
  }, () => {
    this.setData()
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

  //   this.setState({
  //     selectValue2:e.currentTarget.textContent,
  //     yValue:y
  // })
  // this.setData()

  };
    
      componentDidUpdate() {
      

      const height = 400,
              width = 500,
              margins = {top: 20, right: 100, bottom: 50, left: 50};
        
        const chart = d3.select('.chart')
          .attr('width', width + margins.left + margins.right)
          .attr('height', height + margins.top + margins.bottom)
          .append('g')
          .attr('transform','translate(' + margins.left + ',' + margins.top + ')');
        
        
        const xScale = d3.scaleLinear()
          .range([0,width])
          .domain([Math.min.apply(Math,this.state.x_val.map(Number)), Math.max.apply(Math,this.state.x_val.map(Number)) ]);

        
        const yScale = d3.scaleLinear()
          .range([height,0])
          
          .domain([Math.min.apply(Math,this.state.y_val.map(Number)), Math.max.apply(Math,this.state.y_val.map(Number)) ]);
  
        const dots = chart.selectAll('dot')
          .data(this.state.data, null, 2)
          .enter().append('circle')
          .attr('r', 5)
          .attr('cx', d => {return xScale(d.x); })
          .attr('cy', d => {return yScale(d.y)})
          .style('fill', d => {
          for (var i=0; i<this.state.data.length; i++){
            var point1= this.props.propsData.selected_slider_data.point1
            var point2= this.props.propsData.selected_slider_data.point2
            var point3= this.props.propsData.selected_slider_data.point3
            var point4= this.props.propsData.selected_slider_data.point4
            var point5= this.props.propsData.selected_slider_data.point5
            if (this.state.data[i].c>point1 && this.state.data[i].c<point2 ){
              return 'green';
            }else if(this.state.data[i].c>point2 && this.state.data[i].c<point3){
              return 'blue'
            }else if(this.state.data[i].c>point3 && this.state.data[i].c<point4){
              return 'yellow'
            }else if(this.state.data[i].c>point4 && this.state.data[i].c<point5){
              return 'red'
            }else{
              return 'black'
            }

            }
            


          
          });
        
        const details = d3.select('.container').append('div')
          .attr('class','details')
          .html('Details');
    
    
    
        dots.on('mouseover', d => {
            
          details.html(
            d.x + ','+ d.y)
            .style('opacity', 1);
        }).on('mouseout', () => {
          details.style('opacity', 0);  
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
      );
    }
  }
  

export default GraphMOga;