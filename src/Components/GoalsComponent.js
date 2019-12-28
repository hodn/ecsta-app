import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

export class GoalsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      goal1: "",
      goal2: "",
      goal3: ""
    }

    



  }

  componentDidMount() {

    axios.post('http://localhost:5000/weeks/last', {userId: this.state.userId})
    .then(response => {
      
      let goals = response.data[0].goals;
      
      this.setState({
        goal1: goals[0],
        goal2: goals[1],
        goal3: goals[2]
    });
      

    })
    .catch((error) => {

      console.log(error);


    }); 


  }

  componentWillUnmount() {

  }


  // What the actual component renders
  render() {

    return (

      <div>

        <Typography variant="h3">Goals for this week</Typography>
        <Typography variant="body1">1. {this.state.goal1}</Typography>
        <Typography variant="body1">2. {this.state.goal2}</Typography>
        <Typography variant="body1">3. {this.state.goal3}</Typography>


      </div >

    );

  }
}