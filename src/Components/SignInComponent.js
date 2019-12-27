import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class SignInComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
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
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    submitForm(event) {

        event.preventDefault();
        this.props.authenticateUser(this.state);
    }

    // What the actual component renders
    render() {

        return (

            <div>


                <form noValidate autoComplete="off" onSubmit={this.submitForm}>
                    <TextField className="input-form" id="usernameIn" name="username" label="Username" variant="outlined" onChange={this.handleInputChange} />  <br/>
                    <TextField className="input-form" id="passwordIn" name="password" label="Password" variant="outlined" type="password" onChange={this.handleInputChange} />  <br/>
                    <Button id="sign-button" variant="contained" color="primary" type="submit" disabled={!this.validateForm()}>
                        Sign In
                    </Button>
                </form>

            </div>

        );


    }

}

