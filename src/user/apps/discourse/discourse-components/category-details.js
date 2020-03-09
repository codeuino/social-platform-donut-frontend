import React, {Component} from 'react';
import Navigation from '../../../dashboard/navigation/navigation';
import {Table} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import './category-details.scss'
import {Link} from 'react-router-dom'


const organizationUrl = 'https://meta.discourse.org'

class CategoryDetails extends Component{

    constructor(props){
        super(props);
        this.state={
            loading: true,
            topics:[],
            category: '',
            discourse: true
        }
    }

    async componentDidMount(){
        await fetch(`https://cors-anywhere.herokuapp.com/${organizationUrl}/c/${this.props.match.params.id}`, {
            method:'GET',
            mode: 'cors',
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                topics: data.topic_list.topics,
                category: this.props.location.state.categoryName,
                loading: false,
            })
        })
        .catch(err=>{
            console.log(err)
        })

    }

    render(){
        let content;
        let topics = this.state.topics.map((topic,i)=>{
            return(
                <tr key={i}>
                    <td><Link to={{
                        pathname : `/t/${topic.slug}/${topic.id}`,
                        state:{
                            topicName: topic.title
                        }
                    }} >{topic.title}</Link></td>
                    <td>{topic.reply_count}</td>
                    <td>{topic.views}</td>
                    <td>{topic.last_posted_at}</td>
                </tr>
            )
        })

        if(this.state.loading){
            content = (
                <div>
                    <Spinner animation='border' role="status"></Spinner>
                </div>
            )
        }else{
            content=(
                <div>
                    <h2>{this.state.category}</h2>
                    <Table hover responsive>
                        <thead>
                            <tr className="table-heading">
                                <th>Topics</th>
                                <th>Replies</th>
                                <th>Views</th>
                                <th>Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topics}
                        </tbody>
                    </Table>
                </div>
            )
        }

        return(
            <div className="category-details-container">
                <div className="navigation">
                    <Navigation discourse={this.state.discourse}></Navigation>
                </div>
                <div className="topics-container">
                    {content}
                </div>
            </div>
            
        )
    }
}

export default CategoryDetails;