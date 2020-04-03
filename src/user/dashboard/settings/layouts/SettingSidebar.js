import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MdSecurity,
  MdLocationOn,
  MdNotifications,
  MdRssFeed,
  MdBlock,
  MdAddToQueue,
  MdLanguage
} from 'react-icons/md';
import { FaUserTag } from 'react-icons/fa';
import '../../../dashboard/navigation/navigation.scss';

const SettingSidebar = props => {
  const iconsSize = 40;
  const { privacy, notification, location, posts, blocked, tagged } = props;
  return (
    <div className='navigation'>
      <ListGroup>
        <ListGroup.Item className={privacy ? 'active mt-4' : 'inactive mt-4'}>
          <NavLink to='/privacy' className='link'>
            <b>
              <MdSecurity size={iconsSize} />
              Security and Privacy
            </b>
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item className={location ? 'active' : 'inactive'}>
          <NavLink to='/location' className='link'>
            <b>
              <MdLocationOn size={iconsSize} />
              Location
            </b>
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item className={notification ? 'active' : 'inactive'}>
          <NavLink to='/notifications' className='link'>
            <b>
              <MdNotifications size={iconsSize} />
              Notification
            </b>
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item className={posts ? 'active' : 'inactive'}>
          <NavLink to='allPosts' className='link'>
            <b>
              <MdRssFeed size={iconsSize} />
              Posts
            </b>
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item className={blocked ? 'active' : 'inactive'}>
          <NavLink to='/blocked' className='link'>
            <b>
              <MdBlock size={iconsSize} />
              Blocked
            </b>
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item className={tagged ? 'active' : 'inactive'}>
          <NavLink to='/tagged' className='link'>
            <b>
              <FaUserTag size={iconsSize} />
              Timeline and Tagged
            </b>
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item className={tagged ? 'active' : 'inactive'}>
          <NavLink to='/tagged' className='link'>
            <b>
              <MdLanguage size={iconsSize} />
              Language
            </b>
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item className='link'>
          <p>
            <b>
              <MdAddToQueue size={iconsSize} />
              Apps Integrated
            </b>
          </p>
        </ListGroup.Item>
        <hr />
      </ListGroup>
    </div>
  );
};
SettingSidebar.propTypes = {
  privacy: PropTypes.bool,
  location: PropTypes.bool,
  notification: PropTypes.bool,
  posts: PropTypes.bool,
  blocked: PropTypes.bool,
  tagged: PropTypes.bool,
  language: PropTypes.bool
};
export default SettingSidebar;
