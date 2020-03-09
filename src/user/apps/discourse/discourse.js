import React, {Component} from 'react';
import Navigation from '../../dashboard/navigation/navigation';
import Categories from './discourse-components/categories';
import LatestTopics from './discourse-components/latest-topics';
import Spinner from 'react-bootstrap/Spinner'
import './discourse.scss'

const organizationUrl = 'https://meta.discourse.org'

class Discourse extends Component{
    constructor(props) {
        super(props);
        this.state = {
          discourse: true,
          categoriesLoading: true,
          topicsLoading: true,
          topics: [],
          categories: []
        };
    }

    componentDidMount(){
        fetch(`https://cors-anywhere.herokuapp.com/${organizationUrl}/categories`, {
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
                categories: data.category_list.categories,
                categoriesLoading: false
            })
        } )
        .catch(err=>{
            console.log(err)
        })

        fetch(`https://cors-anywhere.herokuapp.com/${organizationUrl}/latest`, {
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
            this.setState({
                topics: data.topic_list.topics,
                topicsLoading: false
            })
        } )
        .catch(err=>{
            console.log(err)
        })
    }


    render(){

        let content;

        if(this.state.categoriesLoading && this.state.topicsLoading){
            content = (
                <div className="loader-container">
                    <Spinner animation="border"></Spinner>
                </div>
            )
        }else{
            content=(
                <div className="main-content">
                    <Categories categories={this.state.categories}></Categories>
                    <LatestTopics topics={this.state.topics}></LatestTopics>
                </div>
            )
        }
        return(
            <div className="discourse">
                <div className="navigation">
                    <Navigation discourse={this.state.discourse}></Navigation>
                </div>
                {content}
            </div>
        )
    }
}

export default Discourse