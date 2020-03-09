import React ,{Component} from 'react';
import Navigation from '../../../dashboard/navigation/navigation';
import './topic-details.scss'
import Spinner from 'react-bootstrap/Spinner'


const organizationUrl = 'https://meta.discourse.org'

class TopicDetails extends Component{

    constructor(props){
        super(props);
        this.state={
            posts: [],
            topic: '',
            loading: true,
            discourse: true
        }
    }

    async componentDidMount(){
        await fetch(`https://cors-anywhere.herokuapp.com/${organizationUrl}/t/${this.props.match.params.id}/posts`, {
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
                posts: data.post_stream.posts,
                topic: this.props.location.state.topicName,
                loading: false
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){

        let posts = this.state.posts.map((post,i)=>{
            return(
                <div className="post" key={i}>
                    <div className="poster">
                        {post.name}
                    </div>
                    <div className="post-description-container" dangerouslySetInnerHTML={{ __html: post.cooked}}>
                       
                    </div>
                </div>
            )
        })

        let content;

        if(this.state.loading){
            content = (
                <div className="loader-container">
                    <Spinner animation="border"></Spinner>
                </div>
            )
        }else{
            content = (
                posts
            )
        }

        return(
            <div className="topic-details-container">
                <div className="navigation">
                    <Navigation discourse={this.state.discourse}></Navigation>
                </div>
                <div className="posts-container">
                    <h4>{this.state.topic}</h4>
                    <div>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}

export default TopicDetails