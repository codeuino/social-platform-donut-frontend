import React, { Component } from "react";
import Project_list from "../../../jsonData/projects";
import EditIcon from '@material-ui/icons/Edit';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import { Card, Button, Badge, Col, Row } from "react-bootstrap";
import "./proj-info.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import proj_img from "../../../images/project.png";
import user_img from "../../../images/userIcon.jpg";
import { EditProject } from "../popups/edit-project";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteProject } from "../popups/delete-project";
import { makeStyles,Grid, Fab, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import NavBar from "../../dashboard/navigation/navbar";


class ProjInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proj: true,
      editproject: false,
      project_info: {},
    };
  }

  render() {
    let cancel = () =>
      this.setState({
        editproject: false,
        profile_info:{}
      });
      let cancel_del = () =>
      this.setState({
        deleteproject: false,
      });

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

    let project_info = Project_list.filter(
      (x) => x._id === this.props.match.params.id
    );
    let maintainers = project_info[0].maintainers.map((item) => (
      <Grid item xs={6} sm={4}>
        <Card className={useStyles2.root}>
          <CardActionArea>
            <CardMedia component="img" className="img" image={user_img} />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Software developer in Codeuino
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" variant="light">
              <strong>See Profile</strong>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));

    return (
      <div className="organization">
        <div className="navigation">
          <NavBar proj={this.state.proj}></NavBar>
        </div>
        <div className="news">
          <Fab
            className="back"
            href="/projects"
            color="primary"
            aria-label="add"
          >
            <ArrowBackIcon />
          </Fab>
          <Row>
            <Col sm={4}>
              <Card.Img variant="top" className="proj_img" src={proj_img} />
            </Col>
            <Col sm={8}>
              <div className="project-info">
                <Row>
                  <Col sm={7}>
                    <h1 className="proj_name">{project_info[0].Proj_name}</h1>
                    <Badge variant="success">
                      Version {project_info[0].version}
                    </Badge>{" "}
                  </Col>

                  <Col sm={5}>
                    <Button variant="light" href={project_info[0].github_link}>
                      <GitHubIcon></GitHubIcon>
                    </Button>{" "}
                    <Button
                      variant="light"
                      href={project_info[0].bitbucket_link}
                    >
                      <LanguageIcon></LanguageIcon>
                    </Button>{" "}
                    <Button
                      variant="light"
                      onClick={() => this.setState({ editproject: true,project_info:project_info[0] })}
                    >
                      <EditIcon></EditIcon>
                    </Button>{" "}
                    <EditProject
                      show={this.state.editproject}
                      data={this.state.project_info}
                      onHide={cancel}
                    />
                    <Button
                    variant="light"
                    onClick={() => this.setState({ deleteproject: true })}
                  >
                    <DeleteIcon></DeleteIcon>
                  </Button>
                  <DeleteProject
                    show={this.state.deleteproject}
                    onHide={cancel_del}
                  />
                    <br></br>
                    <div className="tech-stack">
                  <Badge pill variant="primary">
                    React
                  </Badge>{" "}
                  <Badge pill variant="secondary">
                    Passport
                  </Badge>{" "}
                  <Badge pill variant="success">
                    Nodejs
                  </Badge>{" "}
                  <Badge pill variant="danger">
                    Bootstrap
                  </Badge>{" "}
                  <br></br>
                  <Badge pill variant="warning">
                    Mongoose
                  </Badge>{" "}
                  <Badge pill variant="info">
                    JWT
                  </Badge>{" "}
                  <Badge pill variant="light">
                    Material-ui
                  </Badge>{" "}
                  <Badge pill variant="dark">
                    Redux
                  </Badge>
                </div>
                  </Col>
                </Row>

                <p className="createAt">
                  Created At: {project_info[0].createAt}{" "}
                </p>
                <p className="short_des">{project_info[0].short_des}</p>
                <p className="place">Updated At: {project_info[0].updatedAt}</p>
                
             
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="description">
                <h1>About the Project</h1>
                <hr />

                <p className="desc">
                {project_info[0].long_des}
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <div className="maintainers">
                <h1>Maintainers</h1>
                <hr />
              </div>
            </Col>
          </Row>

          <div className={useStyles.root}>
            <Grid container spacing={1}>
              {maintainers}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjInfo;
