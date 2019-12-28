import React from 'react';
import axios from 'axios';
import hash from 'object-hash';
import { SignInComponent } from '../Components/SignInComponent';
import SnackBar from '@material-ui/core/Snackbar';
import BarComponent from '../Components/BarComponent';
import { AppView } from './AppView';

export class SignInView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            snackOpen: false,
            snackMessage: ""
        }

        this.authenticateUser = this.authenticateUser.bind(this);
        this.closeSnack = this.closeSnack.bind(this);

    }

    componentDidMount() {


    }

    componentWillUnmount() {

    }

    authenticateUser(input) {

        let credentials = {
            username: input.username.toLowerCase(),
            hash: hash(input.password)
        };

        axios.post('http://localhost:5000/users/login', credentials)
            .then(response => {

                if (response.data === null) {

                    this.setState({
                        snackMessage: "Incorrect password",
                        snackOpen: true
                    });;
                }
                else {

                    this.setState({
                        userId: response.data
                    });;
                }

                this.setState({ userId: response.data })
            })
            .catch((error) => {

                console.log(error);

                this.setState({
                    snackMessage: "Username not found",
                    snackOpen: true
                });;
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

    // What the actual component renders
    render() {

        if (this.state.userId === null) {

            return (

                <div>

                    <BarComponent link="/signup" linkName="Sign Up" />
                    <SignInComponent authenticateUser={this.authenticateUser} />
                    <SnackBar anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}

                        open={this.state.snackOpen}
                        autoHideDuration={5000}
                        onClose={this.closeSnack}
                        message={<span id="message-id">{this.state.snackMessage}</span>}

                    />


                </div>
            );

        }

        else {
            return (

                <div>
                    <BarComponent link="/signin" linkName="Log Out" />
                    <AppView userId={this.state.userId}/>

                </div>

            );
        }




    }

}

