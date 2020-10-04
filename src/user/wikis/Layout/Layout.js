import React from "react";
import "./Layout.scss";
import Button from "react-bootstrap/Button";
import LoadingOverlay from "react-loading-overlay";
import GitHubIcon from "@material-ui/icons/GitHub";
import ClockLoader from "react-spinners/ClockLoader";
import Navigation from "../../dashboard/navigation/navigation";

const Layout = (props) => {
  const { wikis, spinner, allWikis, isAdmin, oauthCheck, children } = props;
  return (
    <React.Fragment>
      <div className="navigation">
        <Navigation wikis={wikis}></Navigation>
      </div>
      <div id="wikis">
        <LoadingOverlay
          active={!!spinner}
          text={spinner}
          spinner={<ClockLoader color={"#1A73E8"} />}
          styles={{
            spinner: (base) => ({
              ...base,
              width: "100px",
              "& svg circle": {
                stroke: "rgba(26, 115, 232, 0.5)",
              },
            }),
          }}
        >
          <h1 className="wikis-heading">Wikis</h1>
          {allWikis === "NO_ACCESS_TOKEN" ? (
            <div className="wikis-not-found">
              {isAdmin === "true" ? (
                <Button variant="light" onClick={oauthCheck}>
                  <GitHubIcon />
                  Connect Github
                </Button>
              ) : (
                "Nothing here Yet"
              )}
            </div>
          ) : (
            children
          )}
        </LoadingOverlay>
      </div>
    </React.Fragment>
  );
};

export default Layout;
