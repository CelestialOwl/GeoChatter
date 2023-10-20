import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "../../API/ChatterAPI";
import { url } from "../../API/ChatterAPI";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

export default function AdminUserTable() {
  const [users, setUsers] = React.useState();
  const fetchUsers = async () => {
    const response = await api.get("/users-list");
    if (response.status === 200) {
      setUsers(response.data.userList);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  if (!users) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">id</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Chats</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow
              key={row.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row._id}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.chats.length}</TableCell>
              <TableCell align="center">
                <img
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "60px",
                  }}
                  src={`${url}/${row.img}`}
                  alt="userimg"
                />
              </TableCell>
              <TableCell align="center">
                <div onClick={() => console.log(row._id)}>
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
