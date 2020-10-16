import React, { Component } from "react";
import "./projects.scss";
import Navigation from "../dashboard/navigation/navigation";
import { makeStyles,Grid , Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import { Button } from "react-bootstrap";
import { connect } from 'react-redux'
import { createProject, getAllProjects } from '../../actions/projectAction'
import { Pagination } from 'antd'
import projectImage from '../../assets/images/project.png'
import { withRouter } from "react-router-dom";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proj: true,
      deleteproject: false,
      allProjects: []
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.getAllProjects(); // by default 6 projects per page
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('project ', nextProps)
    const { allProjects } = nextProps.project
    this.setState({ allProjects: allProjects }, () => {
      console.log('projects state ', this.state)
    })
  }

  onShowSizeChange = (currentPage, pageSize) => {
    console.log('currentPage pageSize ', currentPage, pageSize)
    this.props.getAllProjects(pageSize, currentPage)
  }

  handlePagination = (pageNumber) => {
    console.log('page number ', pageNumber);
    this.props.getAllProjects(6, pageNumber)
  }

  render() {
    const { allProjects } = this.state

    let Projects = allProjects.map((Item, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              className="img"
              image={Item.image || projectImage}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {Item.projectName || "Project Name"}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className="short-des">
                {Item.description?.shortDescription || "Short description of the project"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button 
              size="small" 
              onClick={() => this.props.history.push(`/${Item._id}/proj-info`)}
              variant="light"
            >
              <strong>See More</strong>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));

    return (
      <>
        <Navigation proj={this.state.proj}/>
        <div className="organization">
          <div className="projects">
            <p id="projects__header">All Projects</p>
            <Grid container spacing={3}>
              {Projects}
            </Grid>
            <div className="project__pagination__container">
              <Pagination
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                defaultCurrent={1}
                total={allProjects.length}
                onChange={this.handlePagination}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  project: state.project
})

export default connect(mapStateToProps, {
  createProject,
  getAllProjects
})(withRouter(Projects));
