import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import User from "../../../shared/models/userModel";
import { selectLoggedUser } from "../../../app/slices/AuthSlice";
import UserForm from "../users/UserForm";

interface IUserProfileProps {}

const UserProfile: React.FunctionComponent<IUserProfileProps> = (props) => {
  const [user, setUser] = useState<User>({});
  const currentLoggedUser = useSelector(selectLoggedUser);

  const loadUser = () => {
    setUser(currentLoggedUser);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <UserForm
        currentUser={user}
        type="profile"
        roleProps="customer"
        loadUser={loadUser}
      />
    </>
  );
};

export default UserProfile;
