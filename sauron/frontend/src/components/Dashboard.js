import React from "react";


const Dashboard = () => {
  return (
  <>
    <h1>Dashboard</h1>
    <div class="card-dashboard">
      <div class="card card-dashboard-item">
        <div class="card-body">
          <h5 class="card-title">Card Lista ultimos tickets</h5>
        </div>
      </div>
      <div class="card card-dashboard-item">
        <div class="card-body">
          <h5 class="card-title">Card alertas criticos</h5>
        </div>
      </div>
      <div class="card card-dashboard-item">
        <div class="card-body">
          <h5 class="card-title">Card Rank alertas</h5>
        </div>
      </div>
      <div class="card card-dashboard-item">
        <div class="card-body">
          <h5 class="card-title">Card alertas por cliente</h5>
        </div>
      </div>
  </div>
  </>
  );
}

export default Dashboard;
