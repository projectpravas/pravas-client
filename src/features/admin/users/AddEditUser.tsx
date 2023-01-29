import React from "react";
import { useParams } from "react-router-dom";
import UserService from "../../../services/UserService";
import User from "../../../shared/models/userModel";
import UserForm from "./UserForm";

interface IAddEditUserProps {}

const AddEditUser: React.FunctionComponent<IAddEditUserProps> = (props) => {
  const [user, setUser] = React.useState<User>({});

  const { id, op, role } = useParams();

  const loadUser = (id: string) => {
    UserService.fetchOneUser(id)
      .then((res) => {
        setUser(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    if (op == "edit") loadUser(id as string);
  }, [id]);

  return (
    <>
      {
        <UserForm
          currentUser={user}
          type={`${op}` == "edit" ? "edit" : "add"}
          roleProps={role as string}
          loadUser={loadUser}
        />
      }
    </>
  );
};

export default AddEditUser;
