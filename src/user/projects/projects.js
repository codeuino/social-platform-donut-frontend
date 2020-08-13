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
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
      },
    }));

    const useStyles2 = makeStyles({
      root: {
        maxWidth: 345,
        marginTop: "20px",
      },
    });

    let Projects = allProjects.map((Item, index) => (
      <Grid item xs = {6} sm = {4} key={index} className="card__container">
        <Card className={useStyles2.root}>
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
      <div className="organization">
        <div className="navigation">
          <Navigation proj={this.state.proj}></Navigation>
        </div>
        <div className="news projects">
          <p id="project__header">All Projects</p>
          <div className={useStyles.root}>
            <Grid container spacing={3}>
              {Projects}
            </Grid>
          </div>
          <div className="project__pagination__container">
            <Pagination
              showSizeChanger
              onShowSizeChange={this.onShowSizeChange}
              defaultCurrent={1}
              total={100}
              onChange={this.handlePagination}
            />
          </div>
        </div>
      </div>
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
