import React, { Component } from 'react'
import { connect } from 'react-redux';
import ToggleSwitch from './Toggle/ToggleSwitch';
import './maintenance.scss'

class OrgMaintenance extends Component {
  constructor(props){
    super(props);
    this.state = {
      isMaintenance: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps from OrgMaintenance', nextProps);
    this.setState({ isMaintenance: nextProps.org?.isMaintenance })
  }

  render() {
    const { isMaintenance } = this.state
    return (
      <>
        <div className="main__maintenance__container">
          <div className="description__container">
            <div className="toggle__container">
              <div className="maintenance__text">Maintenance Mode</div>
              <div className="toggle__switch">
                {/* <span className="label_text mr-2"></span> */}
                <ToggleSwitch isMaintenance={isMaintenance} />
              </div>
              <hr />
            </div>
            <p className="desc__text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laudantium iusto incidunt architecto beatae quibusdam animi,
              perspiciatis rerum. Rerum quam adipisci quibusdam dolore quos
              repudiandae? Excepturi nostrum minus quidem cupiditate dolor
              voluptates quaerat iure ratione tenetur veritatis adipisci
              nesciunt eligendi asperiores, dolorem sunt illo quam voluptatum
              voluptate. Magni possimus, odit totam voluptas nam officia
              consequuntur, voluptatem officiis, incidunt veniam harum ullam
              minima tempore debitis. Tempora molestias vel ex eos, voluptatem
              necessitatibus numquam consequatur commodi eveniet veniam atque
              accusantium nostrum quasi est, labore repellat quas pariatur
              consectetur facilis cum sint possimus aliquid. Nihil voluptates
              veritatis quas, aspernatur impedit maxime ipsum aliquam iste dolor
              at molestiae eius sed sapiente officiis nisi fuga accusantium
              incidunt repellat, quisquam ipsa et. Laudantium tenetur labore
              neque voluptates dolorem ea molestiae ipsum, vero reiciendis non
              consectetur harum suscipit iste error. Iure sed temporibus,
              possimus, ullam minus at impedit quidem itaque dicta debitis
              tenetur ipsa quia labore est aut magnam laboriosam minima vitae
              architecto! Dolor, similique maiores. Aliquid minima voluptates
              animi quis ab? Enim dicta saepe laboriosam illo voluptatibus
              numquam, molestiae ipsum, quibusdam nulla sequi exercitationem
              facere minus fugiat quisquam repudiandae tempora ullam, a maxime
              eaque doloribus consequatur culpa praesentium aperiam fuga.
              Delectus iste distinctio earum voluptatibus. Ea, similique.
            </p>
          </div>
        </div>
      </>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  org: state.org,
  error: state.error
})

export default connect(mapStateToProps, { })(OrgMaintenance);