const customStyles = {
  table: {
    style: {
      width: "87vw",
      height: "60vh",
    },
  },
  header: {
    style: {
      display: "none",
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
      backgroundColor: "#F5F5F5",
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

export default customStyles;
