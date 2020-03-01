import React, {Component} from 'react';
import Navigation from '../../dashboard/navigation/navigation';
import Categories from './discourse-components/categories';
import LatestTopics from './discourse-components/latest-topics';
import './discourse.scss'

class Discourse extends Component{
    constructor(props) {
        super(props);
        this.state = {
          discourse: true
        };
    }


    render(){
        return(
            <div className="discourse">
                <div className="navigation">
                    <Navigation discourse={this.state.discourse}></Navigation>
                </div>
                <div className="main-content">
                    <Categories></Categories>
                    <LatestTopics></LatestTopics>
                </div>
            </div>
        )
    }
}

export default Discourse