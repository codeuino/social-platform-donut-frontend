import React from "react";
import Badge from "react-bootstrap/Badge";

const BadgeElement = (props) => {
  let badgeVariant = null;
  let text = null;
  switch (props.ticketState) {
    case "open":
      badgeVariant = "primary";
      text = "Open"
      break;
    case "solved":
      badgeVariant = "success";
      text = "Solved"
      break;
    case "onHold":
      badgeVariant = "secondary";
      text = "On Hold"
      break;
    case "pending":
      badgeVariant = "warning";
      text = "Pending"
      break;
    case "closed":
      badgeVariant = "danger";
      text = "Closed"
      break;
    default:
      badgeVariant = "primary";
  }
  return (
    <div>
      <Badge pill variant={badgeVariant}>
        {props.ticketState}
      </Badge>
    </div>
  );
};

export default BadgeElement;
