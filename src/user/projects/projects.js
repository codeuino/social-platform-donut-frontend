import React, { Component } from "react";
import "./projects.scss";
import Navigation from "../dashboard/navigation/navigation";
import Project_list from "../../jsonData/projects";
import { makeStyles,Grid , Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import { Button } from "react-bootstrap";
import Popups from "../../common/Popups";


class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proj: true,
      deleteproject: false
    };
  }

  render() {
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

    let Projects = Project_list.map((Item) => (
      <Grid item xs={6} sm={4}>
        <Card className={useStyles2.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              className="img"
              image={Item.image}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {Item.Proj_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {Item.short_des}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>


        
          <Button size="small"  href={`/${Item._id}/proj-info`} variant="light">
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
          <div className={useStyles.root}>
            <Grid container spacing={2}>
              {Projects}
            </Grid>
          </div>
        </div>
        <Popups
          option={this.state.option}
          optionValue={this.state.optionValue}
          modalShow={this.state.modalShow}
        />
      </div>
    );
  }
}

export default Projects;
