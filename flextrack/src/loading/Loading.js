import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Loading(margin = 50, minHeight = "0px") {
  return (
    <Box maxWidth="false" sx={{
      minHeight: minHeight,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: margin,
      marginBottom: margin,
    }}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;