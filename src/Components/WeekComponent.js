import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SnackBar from '@material-ui/core/Snackbar';

export class WeekComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            goal1: "",
            goal2: "",
            goal3: "",
            snackOpen: false,
            snackMessage: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.submitForm = this.submitForm.bind(this);


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

    validateForm() {
        return this.state.goal1.length > 0 && this.state.goal2.length > 0 && this.state.goal3.length
    }

    submitForm(event) {

        event.preventDefault();

        let input = {
            userId: this.state.userId,
            goals:[this.state.goal1, this.state.goal2, this.state.goal3]
            
        }

        axios.post('http://localhost:5000/weeks/add', input)
            .then(response => {
                document.getElementById("goals-form").reset()
                this.setState({
                    snackMessage: "Goals have been set!",
                    snackOpen: true
                });

                console.log(response)
               
            })
            .catch((error) => {

                console.log(error);

                
            });

    }


    // What the actual component renders
    render() {

        return (

            <div>

                <Typography variant="h3">Week</Typography>
                <Typography variant="subtitle1">Set your goals for the new week</Typography>
                <form id="goals-form"noValidate autoComplete="off" onSubmit={this.submitForm}>
                    <TextField id="goal1" name="goal1" label="First goal" variant="outlined" multiline onChange={this.handleInputChange} />  <br />
                    <TextField id="goal2" name="goal2" label="Second goal" variant="outlined" multiline onChange={this.handleInputChange} />  <br />
                    <TextField id="goal3" name="goal3" label="Third goal" variant="outlined" multiline onChange={this.handleInputChange} />  <br />
                    <Button id="sign-button" variant="contained" color="primary" type="submit" disabled={!this.validateForm()}>
                        Set goals
                    </Button>
                </form>

                <SnackBar anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}

                        open={this.state.snackOpen}
                        autoHideDuration={5000}
                        onClose={this.closeSnack}
                        message={<span id="message-id">{this.state.snackMessage}</span>}

                    />


            </div >

        );


    }

}

