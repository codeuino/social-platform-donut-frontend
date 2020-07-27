import React, { useState, useEffect } from "react";
import CustomDatePicker from "./DatePicker";
import "./ProposalViewsReport.scss";
import { formatDate } from "./utils";
import { Line } from "react-chartjs-2";
import { ClockLoader } from "react-spinners";
import moment from "moment";
import { connect } from 'react-redux'
import { getProposalviewAnalytics} from '../../../../actions/analyticsAction'

const ProposalViewsReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
  };

  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(
    moment().add(-10, "days").toDate()
  );
  const [endDate, setEndDate] = useState(moment().toDate());
  const [isLoading, setLoading] = useState(true);
  const {proposalviewAnalytics, proposalId, getProposalviewAnalytics} = props

  const displayResults = (response) => {
    console.log(proposalviewAnalytics)
    let chartLabels = [];
    let values = [];

    proposalviewAnalytics.forEach((row, idx) => {
      chartLabels.push(formatDate(row[0]));
      values.push(row[1]);
    });
    setReportData({ ...reportData, chartLabels, values });
    setLoading(false);
  };

  const data = {
    labels: reportData.chartLabels,
    datasets: [
      {
        label: "Proposal Views",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: reportData.values,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7,
          },
        },
      ],
    },
  };

  useEffect(() => {
    setLoading(true)
    getProposalviewAnalytics(startDate, endDate, proposalId)
  }, [startDate, endDate]);

  useEffect(()=> {
    displayResults()
    setLoading(false)
  }, [proposalviewAnalytics])

  return (
    <div className="report-wrapper">
      <h2 className="chart-title">Proposal Views</h2>
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
        <div className="chart-wrapper">
          <Line data={data} width={250} height={100} options={options} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  proposalviewAnalytics: state.analytics.proposalviewAnalytics
})

export default connect(mapStateToProps, {getProposalviewAnalytics}) (ProposalViewsReport);
