import React, { Component } from 'react';
import "../../../dashboard/navigation/navigation.scss";
import RightNav from './RightNav';

class SettingSidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: false
    }
  };
  toggleActiveClass = () => {
    this.setState({active: !this.state.active });
  }
  render() {
    const iconsSize = 40;
    const navArray = ["privacy", "notification", "posts", "location", "posts", "blocked", "tagged", "language"];
    let navContent;
    navContent = navArray.map((item, id)=> (
      <RightNav option={item} key={id} iconsSize={iconsSize} onClick={this.toggleActiveClass} active={this.state.active} />
    ));
    return (
     <div className="navigation mt-4">
        {navContent}
      </div>
    );
  }
}

export default SettingSidebar;

