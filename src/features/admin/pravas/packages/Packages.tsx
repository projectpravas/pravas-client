import React from "react";
import PackageForm from "../TourAndPackageForm";

interface ICreatePackageFormProps {}

const CreatePackageForm: React.FunctionComponent<ICreatePackageFormProps> = (
  props
) => {
  return (
    <>
      <PackageForm />
    </>
  );
};

export default CreatePackageForm;
