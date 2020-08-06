import React, { useState, useEffect } from "react";
import CustomDatePicker from "./DatePicker";
import { queryReport } from "./queryReport";
import { ClockLoader } from "react-spinners";
import "./PageviewsReport.scss";
import moment from "moment";
import { connect } from "react-redux";
import { getMostViewedAnalytics } from "../../../../actions/analyticsAction";

const PageviewsReport = (props) => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(
    moment().add(-10, "days").toDate()
  );
  const [endDate, setEndDate] = useState(moment().toDate());
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const {mostviewedAnalytics, getMostViewedAnalytics} = props

  const displayResults = (response) => {
    setTotalPages(mostviewedAnalytics.totalResults);

    let newReportData = [];
    if(mostviewedAnalytics?.rows.length > 0){
      mostviewedAnalytics.rows.forEach((row, idx) => {
        if (idx < 10) {
          let tempObj = {
            path: row[0],
            views: row[1],
          };
          newReportData.push(tempObj);
        }
      })
    }
    setLoading(false);
    setReportData(newReportData);
  };

  useEffect(() => {
    setLoading(true)
    getMostViewedAnalytics(startDate, endDate)
  }, [startDate, endDate]);

  useEffect(()=> {
    displayResults()
    setLoading(false)
  }, [mostviewedAnalytics])

  return (
    <div className="report-wrapper">
      <h2 className="chart-title">Top 10 Proposals by Views</h2>
      {/* <h3 className="chart-subtitle">{`Total pages - ${totalPages}`}</h3> */}
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
        <div className="loader">
          <ClockLoader
            color={"#1DA9DF"}
            loading={isLoading}
            size={50}
            css="display: block;
              margin: 0 auto;"
          />
        </div>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, id) => (
              <tr key={id}>
                <td className="left-align">{row.path}</td>
                <td>{row.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  mostviewedAnalytics: state.analytics.mostviewedAnalytics,
});

export default connect(mapStateToProps, { getMostViewedAnalytics })(
  PageviewsReport
);
