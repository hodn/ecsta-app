import React from 'react';
import axios from 'axios';

export class testComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            weekId: null
        }

    }

    componentDidMount() {

        let json = {
            "username": "tester1",
            "hash": "aaa"
        }

        axios.post('http://localhost:5000/users/login', json)
            .then(response => {
                this.setState({userId: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

    }

    componentWillUnmount() {

    }

    // What the actual component renders
    render() {

        return (

            <div>


                {this.state.userId}

            </div>

        );


    }

}

