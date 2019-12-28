import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

export class ReflectionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null
        }

        //this.handleInputChange = this.handleInputChange.bind(this);



    }

    componentDidMount() {


    }

    componentWillUnmount() {

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }



    // What the actual component renders
    render() {

        return (

            <div>
                
                <Typography variant="h3">Reflection</Typography>
                <Typography variant="subtitle1">Summarize your week</Typography>
                <form noValidate autoComplete="off" onSubmit={this.submitForm}>
                    <TextField  />  <br />
                    <TextField  />  <br />
                    <Button id="sign-button" variant="contained" color="primary" type="submit">
                        Conclude 
                    </Button>
                </form>


            </div >

        );


    }

}

