import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function ProgressBar({ handleClose }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (progress === 100) {
    }
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress > 100) {
          clearInterval(timer);
          handleClose();
        }
        const diff = 0.15 * 10;
        return Math.min(oldProgress + diff);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%", height: 10 }}>
      <LinearProgress
        color="primary"
        sx={{ height: 20, borderRadius: 10 }}
        variant="determinate"
        value={progress}
      />
    </Box>
  );
}
