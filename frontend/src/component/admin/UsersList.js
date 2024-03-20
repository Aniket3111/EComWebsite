import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";
const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.api.getCellValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/admin/user/${params.api.getCellValue(params.id, "id")}`}
            >
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteUserHandler(params.api.getCellValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL USERS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className="ProductListTable"
            autoHeight
            sx={{ display: "grid" }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
