import React from 'react';
import { WeekComponent } from '../Components/WeekComponent';
import { WinsComponent } from '../Components/WinsComponent';
import { GoalsComponent } from '../Components/GoalsComponent';
import { ReflectionComponent } from '../Components/ReflectionComponent';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import ViewListIcon from '@material-ui/icons/ViewList';
import FastRewindIcon from '@material-ui/icons/FastRewind';

export class AppView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            weekId: null,
            value: null
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

        let displayComp;
        let goalsComp;

        goalsComp = this.state.value !== 0 ?  <GoalsComponent userId={this.state.userId}/> : null

        switch (this.state.value) {
            case 0:
                displayComp = <WeekComponent userId={this.state.userId}/>;
                break;
            case 1:
                displayComp = <WinsComponent userId={this.state.userId}/>;
                break;
            case 2:
                displayComp = <ReflectionComponent userId={this.state.userId}/>;
                break;
            default:
                displayComp = <WinsComponent userId={this.state.userId}/>;
        }

        return (

            <div>

                {goalsComp}
                
                {displayComp}

                <BottomNavigation
                    value={this.state.value}
                    onChange={(event, newValue) => {
                        this.setState({
                            value: newValue
                        });
                    }}
                    showLabels

                >
                    <BottomNavigationAction label="Goals" icon={<ViewListIcon />}/>
                    <BottomNavigationAction label="Wins" icon={<SentimentVerySatisfiedIcon />}/>
                    <BottomNavigationAction label="Reflections" icon={<FastRewindIcon />} />
                </BottomNavigation>

            </div >

        );


    }

}

