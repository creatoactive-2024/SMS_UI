// import { Button, message } from "antd";
// import { publishSeason } from "../api/pricing.api";

// export default function PublishSeasonButton({ seasonId }) {
//   const publish = async () => {
//     await publishSeason(seasonId);
//     message.success("Season is LIVE");
//   };

//   return (
//     <Button danger type="primary" onClick={publish}>
//       Publish
//     </Button>
//   );
// }



// import { Button, message } from "antd";
// import { publishSeason } from "../api/pricing.api";

// export default function PublishSeasonButton({ id, reload }) {
//   const publish = async () => {
//     await publishSeason(id);
//     message.success("Season is LIVE");
//     reload();
//   };

//   return <Button danger onClick={publish}>Publish</Button>;
// }




import { Button, message } from "antd";
import { publishSeason } from "../api/pricing.api";

export default function PublishSeasonButton({ id, reload }) {
  const publish = async () => {
    try {
      await publishSeason(id);
      message.success("Season is LIVE");
      reload();
    } catch (err) {
      message.error(
        err.response?.data?.message ||
        "Please add base pricing before publishing"
      );
    }
  };

  return (
    <Button type="primary" danger onClick={publish}>
      Publish
    </Button>
  );
}
