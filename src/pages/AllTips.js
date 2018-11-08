import React, {Component} from 'react';
import TipFeed from "../components/TipFeed";
import {getTips} from "../services/TipService";

class AllTips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tips: []
        }
    }

    componentDidMount() {
        getTips()
            .then((tips) => {
                this.setState({tips})
            })
    }

    render() {
        return (
            <div className="main">
                <TipFeed userId={"0"} tips={this.state.tips}/>
            </div>
        );
    }
}

export default AllTips;
