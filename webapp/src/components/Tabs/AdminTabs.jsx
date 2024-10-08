import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminUserTable from "../Tables/AdminUser";
import AdminCommunityTable from "../Tables/AdminCommunity";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 5 }}>
        <Box sx={{ textAlign: "center" }}>
          <h1>Admin Panel</h1>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="admin-tabs"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Communities" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AdminUserTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AdminCommunityTable />
      </CustomTabPanel>
    </Box>
  );
}
