import React, {Component} from 'react';
import './categories.scss'
import {Link} from 'react-router-dom'


class Categories extends Component{
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            categoryContent: [],
        }
    }    

    render(){

        let allCategories = this.props.categories.map((category,i)=>{
            return(
                <div key={i} className="category" style={{borderLeft: `4px solid #${category.color}`}}>
                    <Link to={{
                        pathname: `/c/${category.slug}/${category.id}`,
                        state: {
                            categoryName: category.name
                        }
                    }} className="category-link">{category.name}</Link>
                    <div className="description-container">
                        <div className="description">
                            <p dangerouslySetInnerHTML={{ __html: category.description}}></p>
                        </div>
                        <h5>{category.topics_month} / <small>month</small></h5>
                    </div>
                </div>
            )
        })


        return(
            <div className="categories-card-container">
                <small id="category">Category</small>
                <small id="topics">Topics</small>
                <div className="categories-list-container">
                    {allCategories}
                </div>
            </div>
        )
    }
}

export default Categories;