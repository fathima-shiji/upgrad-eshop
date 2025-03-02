import { Typography, Link } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
      <CopyrightIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />
      {"Copyright © "}
      <Link color="inherit" href="https://upgrad.com/">
        upGrad
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default Copyright;
