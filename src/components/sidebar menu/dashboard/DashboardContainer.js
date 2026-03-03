import axios from "axios";
import DashboardNew from "./DashboardNew";
import { transformDashboardApiToHubspotData } from "./dashboardAdapter";
import { useEffect, useState } from "react";
import baseURL from "../commonComponents/baseURL";

const DashboardContainer = () => {
  const [rows, setRows] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseURL}/dashboard`)
      .then((res) => {
        setStats(res.data?.stats); // ✅ keep original totals
        const transformed = transformDashboardApiToHubspotData(res.data);
        setRows(transformed);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardNew
      hubspotData={rows}
      stats={stats}
      loading={loading}
    />
  );
};

export default DashboardContainer;
