// utils/dashboardAdapter.js
export const transformDashboardApiToHubspotData = (apiResponse) => {
  if (!apiResponse?.charts) return [];

  const rows = [];
  let idCounter = 1;

  // 1️⃣ Bar chart → enquiries & bookings
  apiResponse.charts.bar_chart.forEach((item) => {
    const [year, month] = item.period.split("-");
    const dateBase = `${year}-${month}-15T10:00:00Z`;

    // enquiries
    for (let i = 0; i < item.enquiries; i++) {
      rows.push({
        id: idCounter++,
        status: "Enquiry",
        createdAt: dateBase,
        nationality: "Unknown",
      });
    }

    // bookings
    for (let i = 0; i < item.bookings; i++) {
      rows.push({
        id: idCounter++,
        status: "Booking",
        bookedStatus: "Active",
        createdAt: dateBase,
        nationality: "Unknown",
      });
    }
  });

  // 2️⃣ Pie chart → nationality distribution (attach to bookings)
  if (apiResponse.charts.pie_chart_nationality?.length) {
    let bookingIndex = 0;
    const bookings = rows.filter((r) => r.status === "Booking");

    apiResponse.charts.pie_chart_nationality.forEach((nat) => {
      for (let i = 0; i < nat.value; i++) {
        if (bookings[bookingIndex]) {
          bookings[bookingIndex].nationality = nat._id || "Unknown";
          bookingIndex++;
        }
      }
    });
  }

  return rows;
};
