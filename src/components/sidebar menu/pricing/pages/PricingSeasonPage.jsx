// import { useEffect, useState } from "react";
// import SeasonForm from "../components/SeasonForm";
// import SeasonTable from "../components/SeasonTable";
// import { createSeason } from "../api/pricing.api";
// import axios from "axios";

// export default function PricingSeasonPage() {
//   const [seasons, setSeasons] = useState([]);

//   const loadSeasons = async () => {
//     const res = await axios.get("http://localhost:5005/seasons");
//     setSeasons(res.data);
//   };

//   useEffect(() => {
//     loadSeasons();
//   }, []);

//   const handleCreate = async values => {
//     await createSeason({ ...values, status: "DRAFT" });
//     loadSeasons();
//   };

//   return (
//     <>
//       <h2>Pricing Seasons</h2>

//       <SeasonForm onSubmit={handleCreate} />

//       <SeasonTable seasons={seasons} />
//     </>
//   );
// }



// import { useEffect, useState } from "react";
// import SeasonForm from "../components/SeasonForm";
// import SeasonTable from "../components/SeasonTable";
// import { getSeasons, createSeason } from "../api/pricing.api";

// export default function PricingSeasonPage() {
//   const [seasons, setSeasons] = useState([]);

//   const load = async () => {
//     const res = await getSeasons();
//     setSeasons(res.data);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const create = async values => {
//     await createSeason(values);
//     load();
//   };

//   return (
//     <>
//       <h2>Pricing Seasons</h2>
//       <SeasonForm onSubmit={create} />
//       <SeasonTable seasons={seasons} reload={load} />
//     </>
//   );
// }



import { useEffect, useState } from "react";
import SeasonForm from "../components/SeasonForm";
import SeasonTable from "../components/SeasonTable";
import { getSeasons, createSeason } from "../api/pricing.api";

export default function PricingSeasonPage() {
  const [seasons, setSeasons] = useState([]);

  const load = async () => {
    const res = await getSeasons();
    setSeasons(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async values => {
    await createSeason({
      ...values,
      status: "DRAFT"
    });
    load();
  };

  return (
    <>
      <h2>Pricing Seasons</h2>

      {/* Create Season */}
      <SeasonForm onSubmit={create} />

      {/* Season List */}
      <SeasonTable seasons={seasons} reload={load} />
    </>
  );
}
