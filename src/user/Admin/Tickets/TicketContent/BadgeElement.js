import React from "react";
import Badge from "react-bootstrap/Badge";

const BadgeElement = (props) => {
  let badgeVariant = null;
  switch (props.ticketState) {
    case "Open":
      badgeVariant = "primary";
      break;
    case "Solved":
      badgeVariant = "success";
      break;
    case "OnHold":
      badgeVariant = "secondary";
      break;
    case "Pending":
      badgeVariant = "warning";
      break;
    case "Closed":
      badgeVariant = "danger";
      break;
    default:
      badgeVariant = "Open";
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
