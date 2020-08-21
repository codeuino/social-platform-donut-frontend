import React, { Component } from "react";
import DataTable from "react-data-table-component";
import data from "../../../assets/jsonData/tickets";
import "./TicketContent.scss";
import userIcon2 from "../../../assets/images/userIcon2.jpg";
import { Image, Badge } from "react-bootstrap";

const BadgeElement = (props) => {
  return (
    <div>
      {/* {props.ticketState === "Solved" && (
        <Badge pill variant="success">
          {props.ticketState}
        </Badge>
      )}
      {props.ticketState === "OnHold" && (
        <Badge pill variant="secondary">
          {props.ticketState}
        </Badge>
      )}
      {props.ticketState === "Pending" && (
        <Badge pill variant="warning">
          {props.ticketState}
        </Badge>
      )}
      {props.ticketState === "Closed" && (
        <Badge pill variant="danger">
          {props.ticketState}
        </Badge>
      )} */}

      <Badge pill variant="primary" style={{ fontSize: "12px" }}>
        {props.ticketState}
      </Badge>
    </div>
  );
};

const customStyles = {
  table: {
    style: {
      width: "87vw",
      height: "75vh",
    },
  },
  header: {
    style: {
      fontFamily: "Inter",
      fontWeight: "bold",
      fontSize: "1.5rem",
      paddingLeft: "20px",
      color: "#2D2D2D", // override the row height
    },
  },
  rows: {
    style: {
      minHeight: "72px", // override the row height
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgba(26, 115, 232, 0.1)",
    },
  },
  headCells: {
    style: {
      marginLeft: "10px",
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: "700",
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      margin: "10px",
    },
  },
};

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
        name: "Ticket Title",
        selector: "titler",
        sortable: true,
        maxWidth: "600px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        cell: (row) => <CustomTitle row={row} />,
      },
      {
        name: "Ticket Description",
        selector: "plot",
        wrap: true,
        sortable: true,
        format: (row) => `${row.plot.slice(0, 100)}...`,
      },
      {
        name: "Ticket Status",
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
    ];

    return (
      <DataTable
        title={this.state.selectedState}
        columns={columns}
        data={this.state.displayData}
        customStyles={customStyles}
        pagination
        paginationPerPage={Math.floor((window.innerHeight - 185) / 85)}
        highlightOnHover={true}
        pointerOnHover={true}
        paginationRowsPerPageOptions={[]}
      />
    );
  }
}

export default TicketContent;
