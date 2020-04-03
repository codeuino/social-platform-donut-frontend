import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './latest-topics.scss'

class LatestTopics extends Component{
    constructor(props){
        super(props);
        this.state = {
            topics: []
        }
    }

    render(){
        let latestTopics = this.props.topics.map((topic,i)=>{
            return(
                <div key={i} className="topic">
                    <div className="description-container">
                        <Link to={{
                        pathname : `/t/${topic.slug}/${topic.id}`,
                        state:{
                            topicName: topic.title
                        }
                    }}>{topic.title}</Link>
                        <p>Last post by: {topic.last_poster_username}</p>
                    </div>
                </div>
            )
        })
        return(
            <div className="latest-topics-card-container">
                <small id="latest-topics">Latest-topics</small>
                <div className="latest-topics-list-container">
                    {latestTopics}
                </div>
            </div>
        )
    }
}

export default LatestTopics