import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "../../API/ChatterAPI";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

export default function AdminCommunityTable() {
  const [communities, setCommunities] = React.useState();
  const fetchCommunities = async () => {
    const response = await api.post("/get-community");
    if (response.status === 200) {
      console.log(response.data);
      setCommunities(response.data.communities);
    }
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const deleteHanlder = async (id) => {
    const formData = {
      CommunityId: id,
    };
    try {
      const response = await api.post("/delete-community", formData);
      console.log(response);
      if (response.status === 200) {
        fetchCommunities();
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  React.useEffect(() => {
    fetchCommunities();
  }, []);
  if (!communities) {
    return null;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "130px" }}>Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Private</TableCell>
            <TableCell align="center">Disbanded</TableCell>
            <TableCell align="center">No of Users</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {communities.map((row) => (
            <StyledTableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell
                sx={{
                  maxWidth: "250px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
                align="center"
              >
                {row.description}
              </TableCell>
              <TableCell align="center">{`${row.private}`}</TableCell>
              <TableCell align="center">{`${row.is_disbanded}`}</TableCell>
              <TableCell align="center">{row?.users.length}</TableCell>
              <TableCell align="center">
                <div onClick={() => deleteHanlder(row._id)}>
                  <DeleteIcon sx={{ color: red[500], cursor: "pointer" }} />
                </div>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
