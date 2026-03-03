import { Row, Col } from "antd";
import baseURL from "../../config";
import "../admin-styles/dashboard.css";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [totalDepositAmount, setTotalDepositAmount] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);

  useEffect(() => {
    // Function to fetch the total deposit amount from your API
    const fetchTotalDepositAmount = async () => {
      try {
        const response = await fetch(`${baseURL}/totalDepositAmount`); // Replace with your API URL
        const data = await response.json();
        setTotalDepositAmount(data.totalDepositAmount);
      } catch (error) {
        console.error("Error fetching total deposit amount:", error);
      }
    };

    // Fetch the initial total deposit amount
    fetchTotalDepositAmount();

    // Function to fetch the total deposit amount from your API
    const fetchAllAccCount = async () => {
      try {
        const response = await fetch(`${baseURL}/getAccountCount`); // Replace with your API URL
        const data = await response.json();
        setTotalAccounts(data.count);
      } catch (error) {
        console.error("Error fetching total deposit amount:", error);
      }
    };

    // Fetch the initial total deposit amount
    fetchAllAccCount();

    // Periodically fetch and update the total deposit amount (every 5 seconds in this example)
    const interval = setInterval(() => {
      fetchTotalDepositAmount();
      fetchAllAccCount();
    }, 5000);

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="box">
          <div className="innerBox">
            <h1 className="CountDash">{totalAccounts}</h1>
          </div>
          <div className="innerBox">
            <p>Number of Agents</p>
          </div>
        </div>
        <div className="box">
          <div className="innerBox">
            <h1 className="CountDash">0</h1>
          </div>
          <div className="innerBox">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="box">
          <div className="innerBox">
            <h1 className="CountDash">{totalDepositAmount}</h1>
          </div>
          <div className="innerBox">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="box">
          <div className="innerBox">
            <h1 className="CountDash">0</h1>
          </div>
          <div className="innerBox">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="box">
          <div className="innerBox">
            <h1 className="CountDash">0</h1>
          </div>
          <div className="innerBox">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="box">
          <div className="innerBox">
            <h1 className="CountDash">0</h1>
          </div>
          <div className="innerBox">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
