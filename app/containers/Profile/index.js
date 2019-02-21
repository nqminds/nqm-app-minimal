import React from "react";
import Typography from "@material-ui/core/Typography";

// Uncomment this to test out groovy subscription hooks
// import useDataSubscription from "../../hooks/dataset-subscription-hook";

export function Profile() {
  // Put in some dataset id and watch how easy and fast it is to subscribe!
  // const data = useDataSubscription("Z2trnPj-assets");
  return (
    <Typography paragraph>
      User profile
    </Typography>
  );
}
