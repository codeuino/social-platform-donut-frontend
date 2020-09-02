import React, { Component } from "react";
import DataTable from "react-data-table-component";
import data from "../../../../assets/jsonData/tickets";
import "./TicketContent.scss";
import userIcon2 from "../../../../assets/images/userIcon2.jpg";
import { Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import BadgeElement from './BadgeElement';
import customStyles from './DataTableCustomStyles';

class TicketContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: data,
      selectedState: this.props.selectedState,
      displayData: data,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedState !== prevState.selectedState) {
      let allData = data;
      let displayData = [];

      if (nextProps.selectedState === "All") {
        displayData = data;
      } else {
        allData.forEach((i) => {
          if (i.genres[0] === nextProps.selectedState) {
            displayData.push(i);
          }
        });
      }

      return {
        selectedState: nextProps.selectedState,
        displayData: displayData,
      };
    }
    return null;
  }

  handleRowClick = (e) => {
    //Access data table elements using event
    this.props.history.push("/ticketdiscussion");
  };

  render() {
    const Button = () => <button type="button">Download</button>;

    const CustomTitle = ({ row }) => (
      <div>
        {/* eslint-disable-next-line react/prop-types */}
        <div style={{ fontWeight: "bold" }}>{row.title}</div>
      </div>
    );

    const columns = [
      {
        name: "Title",
        selector: "titler",
        sortable: true,
        maxWidth: "600px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        cell: (row) => <CustomTitle row={row} />,
      },
      {
        name: "Description",
        selector: "plot",
        wrap: true,
        sortable: true,
        format: (row) => `${row.plot.slice(0, 100)}...`,
      },
      {
        name: "Status",
        // eslint-disable-next-line react/no-array-index-key
        cell: (row) => (
          <div>
            {row.genres.map((genre, i) => (
              <BadgeElement ticketState={genre} />
            ))}
          </div>
        ),
      },
      {
        name: "User",
        cell: (row) => (
          <div>
            <Image
              src={userIcon2}
              alt="icon"
              rounded
              className="profile-img"
              roundedCircle
            />
            <span className="profile-text">Devesh Verma</span>
          </div>
        ),
      },
      {
        name: "Created At"
      },
      {
        name: "Comments"
      }
    ];

    return (
      <DataTable
        title={this.state.selectedState}
        columns={columns}
        data={this.state.displayData}
        customStyles={customStyles}
        pagination
        paginationPerPage={Math.floor((window.innerHeight - 220) / 85)}
        highlightOnHover={true}
        pointerOnHover={true}
        paginationRowsPerPageOptions={[]}
        onRowClicked={this.handleRowClick}
      />
    );
  }
}

export default withRouter(TicketContent);
