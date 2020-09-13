import React , { Component } from 'react';

import PostListCss from './PostList.css';
//import axios from 'axios';
import ReactTable from "react-table";  
 
class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }

     componentDidMount(){
         fetch('http://127.0.0.1:3000/members')
    
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result);
            this.setState({
            isLoaded: true,
            
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
       )
  }

       operation(index)
       {
        document.getElementById(index).hidden = !document.getElementById(index).hidden
        }
 
  render() {

    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
    return (
        <div className="main"> 
                  
            {items.map((member, index) => { 
                return (

                  <table className="Userinfo">
                    <tr>
                      <td onClick={()=> this.operation(index)}>{member.id} </td>
                      <td onClick={()=> this.operation(index)}>{member.tz} </td> 
                      <td onClick={()=> this.operation(index)}>{member.real_name}</td> 
                    </tr>

                    <table className="timeinfo" id={index} hidden={true}>
                      <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                      </tr> 
                   

                      
                      {member.activity_periods.map((activity_period) => { 
                        return  <tr>
                                  <td>{activity_period.start_time} </td>
                                  <td>{activity_period.end_time} </td>
                                </tr>  
                        })}
                    </table>
                    
                  </table>    
                 )
               })
               }
            
        </div>


      )
    }
}
}
export default PostList;
 