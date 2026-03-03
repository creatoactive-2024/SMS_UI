// import { useEffect, useState } from "react";
// import DiscountForm from "../components/DiscountForm";
// import { getCourses, getSeasons } from "../api/pricing.api";

// export default function SeasonDiscountPage() {
//   const [courses, setCourses] = useState([]);
//   const [seasons, setSeasons] = useState([]);

//   useEffect(() => {
//     getCourses().then(r => setCourses(r.data));
//     getSeasons().then(r => setSeasons(r.data.filter(s => s.status === "LIVE")));
//   }, []);

//   return <DiscountForm courses={courses} seasons={seasons} />;
// }



import { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import DiscountTable from "../components/DiscountTable";
import DiscountCreateModal from "../components/DiscountCreateModal";
import { getDiscounts, getCourses, getSeasons } from "../api/pricing.api";

const { Title } = Typography;

export default function SeasonDiscountPage() {
  const [discounts, setDiscounts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const [d, c, s] = await Promise.all([
      getDiscounts(),
      getCourses(),
      getSeasons()
    ]);

    setDiscounts(d.data);
    setCourses(c.data);
    setSeasons(s.data.filter(x => x.status === "LIVE"));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Title level={3}>Season Discounts</Title>

      <Button type="primary" onClick={() => setOpen(true)}>
        Create Discount
      </Button>

      <DiscountTable discounts={discounts} reload={load} />

      <DiscountCreateModal
        open={open}
        onClose={() => setOpen(false)}
        courses={courses}
        seasons={seasons}
        reload={load}
      />
    </>
  );
}
