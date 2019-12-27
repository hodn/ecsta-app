import React from 'react';
import axios from 'axios';
import hash from 'object-hash';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SnackBar from '@material-ui/core/Snackbar';
import BarComponent from '../Components/BarComponent';

export class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            password2: "",
            snackOpen: false,
            snackMessage: "",
            userId: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.closeSnack = this.closeSnack.bind(this);


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

    closeSnack(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            snackOpen: false
        });

    }

    validateForm() {

        let filledForm = this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.password2.length > 0

        return filledForm;

    }

    submitForm(event) {

        event.preventDefault();

        let credentials = {
            username: this.state.username.toLowerCase(),
            email: this.state.email.toLowerCase(),
            hash: hash(this.state.password)
        };

        const validateEmail = (email) => {

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email));
        }

        const checkPassMatch = (pass, pass2) => {

            return pass === pass2 ? true : false;
        }

        if (validateEmail(credentials.email) && checkPassMatch(this.state.password, this.state.password2)) {

            axios.post('http://localhost:5000/users/signup', credentials)
                .then(response => {
                    if (response.data.userId === null) {

                        if (response.data.usernameDuplicate === true) {

                            this.setState({
                                snackMessage: "Username is taken",
                                snackOpen: true
                            });

                        }

                        else {

                            this.setState({
                                snackMessage: "Email is already registered",
                                snackOpen: true
                            });
                        }

                    }

                    else {

                        this.setState({
                            userId: response.data.userId,
                            snackMessage: "You have succesfully signed up",
                            snackOpen: true
                        });

                        document.getElementById("sign-up-form").reset();

                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {

            if (checkPassMatch(this.state.password, this.state.password2)) {

                this.setState({
                    snackMessage: "Email format is invalid",
                    snackOpen: true
                });

            }
            else {

                this.setState({
                    snackMessage: "Passwords don't match",
                    snackOpen: true
                });
            }
        }



    }

    // What the actual component renders
    render() {

        return (

            <div>

                <BarComponent link="/" linkName="Sign In" />

                <form id="sign-up-form" noValidate autoComplete="off" onSubmit={this.submitForm}>

                    <TextField className="input-form" id="usernameUp" name="username" label="Username" variant="outlined" onChange={this.handleInputChange} /> <br/>
                    <TextField className="input-form" id="emailUp" name="email" label="Email" variant="outlined" onChange={this.handleInputChange} /> <br/>
                    <TextField className="input-form" id="passwordUp" name="password" label="Password" variant="outlined" type="password" onChange={this.handleInputChange} /> <br/>
                    <TextField className="input-form" id="password2Up" name="password2" label="Re-enter password" variant="outlined" type="password" onChange={this.handleInputChange} /> <br/>


                    <Button id="sign-button" variant="contained" color="primary" type="submit" disabled={!this.validateForm()}>
                        Sign Up
                                </Button>

                    <SnackBar anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}

                        open={this.state.snackOpen}
                        autoHideDuration={5000}
                        onClose={this.closeSnack}
                        message={<span id="message-id">{this.state.snackMessage}</span>}

                    />

                </form>
            </div >

        );


    }

}

