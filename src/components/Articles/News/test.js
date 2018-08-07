import React, { Component }from 'react';

import axios from 'axios';
import { URL } from '../../../config';


class Test extends Component {
    state ={
      img:[],
      text:[]
    }
    
    componentWillMount(){
        axios.get(`${URL}/chill`)
        .then(response => {
            
            this.setState({
               img:response.data
           })
           axios.get(`${URL}/tex`)
           .then(response => {
               this.setState({
                   text:response.data
               })
           })
        })
    }



    render(){
        console.log(this.state.img);
        console.log(this.state.text);
       
        return(
            <div>
                {this.state.img.map((item,i)=>{
                    return(
                        <div>{i} <div style={{
                            background:`url('${item}')`,
                            width:'800px',
                            height:'500px'
                        }}></div>{this.state.text[i]}</div>
                    )
                })}
            </div>
        )
    }
}

export default Test;

