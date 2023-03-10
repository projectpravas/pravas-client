import { Grid } from "@mui/material";
import * as React from "react";
import EnquiryService from "../../../services/EnquiryService";
import CustomTitle from "../../../ui/title/CustomTitle";
import { errorToast } from "../../../ui/toast/Toast";
import EnquiriesList from "./EnquiryList";

interface IEnquiriesProps {}

const Enquiries: React.FunctionComponent<IEnquiriesProps> = (props) => {
  const [enquiries, setEnquiries] = React.useState<object[]>([{}]);
  const loadEnquiries = () => {
    EnquiryService.fetchAllEnquiries()
      .then((res) => {
        setEnquiries(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
        const msg = err?.response?.data?.message || "Try Again..";
        errorToast(msg, 5000);
      });
  };

  React.useEffect(() => {
    loadEnquiries();
  }, []);
  // console.log(enquiries);

  return (
    <Grid container>
      <CustomTitle title="Enquiries" />
      {/* <Outlet /> */}

      <EnquiriesList
        data={enquiries}
        loadEnquiries={loadEnquiries}
        title="Enquiry List"
      />
    </Grid>
  );
};

export default Enquiries;
