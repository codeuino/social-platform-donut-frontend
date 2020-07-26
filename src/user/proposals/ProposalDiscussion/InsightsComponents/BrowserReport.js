import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import CustomDatePicker from "./DatePicker";
import { queryReport } from "./queryReport";
import { colors } from "./styles";
import { ClockLoader } from "react-spinners";
import moment from "moment";
import { connect } from "react-redux";
import { getBrowserAnalytics } from '../../../../actions/analyticsAction';

const BrowserReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
    colors: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(
    moment().add(-10, "days").toDate()
  );
  const [endDate, setEndDate] = useState(moment().toDate());
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    const total = response.result.reports[0].data.totals[0].values[0];
    setTotalUsers(total);
    let labels = [];
    let values = [];
    let bgColors = [];
    queryResult.forEach((row, id) => {
      labels.push(row.dimensions[0]);
      values.push(row.metrics[0].values[0]);
      bgColors.push(colors[id]);
    });
    setLoading(false);
    setReportData({
      ...reportData,
      labels,
      values,
      colors: bgColors,
    });
  };

  const data = {
    labels: reportData.labels,
    datasets: [
      {
        data: reportData.values,
        backgroundColor: reportData.colors,
      },
    ],
  };

  useEffect(() => {
    
    props.getBrowserAnalytics(startDate, endDate, props.proposalId)
    console.log(props)
    // setLoading(true);
    // const request = {
    //   startDate,
    //   endDate,
    //   metrics: "ga:users",
    //   dimensions: ["ga:browser"],
    //   filter: `ga:pagePath==/${props.proposalId}`,
    // };
    // setTimeout(
    //   () =>
    //     queryReport(request)
    //       .then((resp) => displayResults(resp))
    //       .catch((error) => console.error(error)),
    //   1500
    // );
  }, [startDate, endDate]);

  return (
    <div className="report-wrapper">
      <h2 className="chart-title">Used Browsers</h2>
      <div className="datepicker-content">
        <CustomDatePicker
          placeholder={"Start date"}
          date={startDate}
          handleDateChange={(date) => setStartDate(date)}
        />
        <CustomDatePicker
          placeholder={"End date"}
          date={endDate}
          handleDateChange={(date) => setEndDate(date)}
        />
      </div>
      {isLoading ? (
        <ClockLoader
          color={"#1DA9DF"}
          loading={isLoading}
          size={50}
          css="display: block;
        margin: 0 auto;"
        />
      ) : (
        <div className="piechart-wrapper">
          <Pie data={data} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  browserAnalytics: state.analytics.browserAnalytics
})

export default connect(mapStateToProps, {getBrowserAnalytics}) (BrowserReport);
