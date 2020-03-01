import React, {Component} from 'react';
import './categories.scss'

class Categories extends Component{
    render(){
        return(
            <div className="categories-card-container">
                <small>Categories</small>
                <div className="categories-list-container">
                    <div className="category">
                        <h3>Category Name</h3>
                        <p>content</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Categories;