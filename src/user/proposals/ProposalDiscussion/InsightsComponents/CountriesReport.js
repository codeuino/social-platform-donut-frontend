import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { colors } from "./styles";
import CustomDatePicker from "./DatePicker";
import { ClockLoader } from "react-spinners";
import moment from "moment";
import { connect } from 'react-redux';
import { getCountryAnalytics } from '../../../../actions/analyticsAction'

const CountriesReport = (props) => {
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
  const [isLoading, setLoading] = useState(true);
  const {countryAnalytics, proposalId, getCountryAnalytics} = props

  const displayResults = () => {
    let labels = [];
    let values = [];
    let bgColors = [];

    if(countryAnalytics.length > 0){
      countryAnalytics.forEach((row, idx) => {
        labels.push(row[0]);
        values.push(row[1]);
        bgColors.push(colors[idx]);
      });
    }
    setReportData({
      ...reportData,
      labels,
      values,
      colors: bgColors,
    });
    setLoading(false);
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

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return data.labels[tooltipItem["index"]];
        },
      },
    },
  };

  useEffect(() => {
    setLoading(true)
    getCountryAnalytics(startDate, endDate, proposalId)
  }, [startDate, endDate]);

  useEffect(()=> {
    displayResults()
    setLoading(false)
  }, [countryAnalytics])

  return (
    <div className="report-wrapper">
      <h2 className="chart-title">User Countries</h2>
      <div className="datepicker-content"></div>
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
          <Pie data={data} options={options} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  countryAnalytics: state.analytics.countryAnalytics
})

export default connect(mapStateToProps, {getCountryAnalytics}) (CountriesReport);
