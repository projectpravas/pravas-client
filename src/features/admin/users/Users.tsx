import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import UserService from "../../../services/UserService";
import { errorToast } from "../../../ui/toast/Toast";
import { selectLoggedUser } from "../../../app/slices/AuthSlice";
import UserForm from "./UserForm";
import UserList from "./UserList";
import CustomTitle from "../../../ui/title/CustomTitle";

interface IUsersProps {}

const Users: React.FunctionComponent<IUsersProps> = (props) => {
  const [users, setUsers] = useState<object[]>([{}]);
  const currentLoggedUser = useSelector(selectLoggedUser);

  const { pathname } = useLocation();

  const loadUsers = () => {
    UserService.fetchAllUsers(
      `?role=${pathname.includes("users") ? "admin" : "customer"}`
    )
      .then((res) => {
        setUsers(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
        const msg = err?.response?.data?.message || "Try Again..";
        errorToast(msg, 5000);
      });
  };

  useEffect(() => {
    loadUsers();
  }, [pathname]);

  return (
    <>
      <CustomTitle
        title={`${pathname.includes("users") ? "Admin" : "Customer"} List`}
      />
      <UserList
        title={`${pathname.includes("users") ? "Admin" : "Customer"} List`}
        data={users}
        loadUsers={loadUsers}
      />
      <Outlet />
    </>
  );
};

export default Users;
