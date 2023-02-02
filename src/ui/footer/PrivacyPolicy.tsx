import * as React from 'react';
import Grid from "@mui/material/Grid";
import styled from '@emotion/styled';
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

interface IPrivacyPolicyProps {
}

const TypoPara = {
      // heading bold
    margin:{xs:"5% 8% 5% 8%", md:"1% 8% 1% 8%", lg:"0% 8% 2% 8%"},
    fontSize:"1rem",
    lineHeight:"1em"
   }
const TypoPara1 = {
    // para
    padding :{xs:"5% 8% 5% 8%", md:"2% 8% 1% 8%", lg:"0% 8% 2% 8%"},
    fontSize:"1rem",
    lineHeight:"1.86em"
   }

const TypoPara2 = {
      // para width a b c d etc
    // padding :{xs:"5% 8% 5% 8%", md:"2% 8% 0% 8%", lg:"2% 8% 2% 8%"},
    fontSize:"1rem",
    lineHeight:"1.4em"
   }

const ListUl = styled(ListItem)({
    display:"list-item"
   });   

const PrivacyPolicy: React.FunctionComponent<IPrivacyPolicyProps> = (props) => {
  return <>
  <Grid sx={{marginBottom:"6%"}}>
  <Typography variant='h5' sx={{margin:{xs:"5% 5% 5% 5%",md:"5% 6% 0% 6%"}, fontSize:"28px", fontWeight:700, lineHeight:1.2, color:"#313041"}}>Privacy Policy</Typography>
  <Typography sx={{ padding :{xs:"5% 8% 5% 8%", md:"2% 8% 1% 8%", lg:"1% 8% 2% 8%"},
    fontSize:"1rem",lineHeight:"1.86em"}}>This Privacy Policy is applicable to all services, products, website of
    <b> Pravas The Journey Pvt. Ltd.    </b>
    unless specified.
  </Typography>

  <Typography sx={TypoPara}><b>Information –</b></Typography>
  <ListUl sx={TypoPara1}>We offer a many of services that require clients/individuals to register and share personal information (Name, Contact, Email ID, DOB, Mailing Address, ID Card/ADHAR Card numbers, Medical History (if any) etc.) to us. To provide our best services, we may collect same. The information can be submitted while registering with Pravas and associated companies or service providers just to provide our clients better quality and inconvenient services.</ListUl>
  <ListUl sx={TypoPara1}>When our clients send us emails or communications thru other mediums, we may retain these communications to process respective inquiries.</ListUl>
  <ListUl sx={TypoPara1}>We may arrange third party services through their respective websites. The information collected is processed under the Privacy Policy. Information collected by the affiliated, associated service provider is governed by their respective privacy policies. Respective Privacy Policy is applicable to services by Pravas The Journey Pvt. Ltd. only. We have no control over the services and data security of the affiliated service providers and associates.</ListUl>
  <ListUl sx={TypoPara1}>We may process the personal information at our office in India. With some cases, we may process personal information on behalf of and according to the instructions of third party service providers, associates, and partners.</ListUl>
  <ListUl sx={TypoPara1}>When you register for any particular service that requires registration, we request to provide personal information. If we use this information in any other manner than the purpose for which it was submitted in such case, we will take consent prior.</ListUl>
  <ListUl sx={TypoPara1}>If we propose to use personal information for any purposes other than those described in this Privacy Policy and/or in the specific service privacy notices, we will offer you an effective way to opt out of the use of personal information for those other purposes. We will not collect or use sensitive information for purposes other than those described in this Privacy Policy and/or in the supplementary service privacy notices, unless we have obtained your prior consent. One can deny sharing personal information to any of our services, then we may not be able to provide those services to you.</ListUl>
 
  <Typography sx={TypoPara1}><b>Information sharing –</b></Typography>

  <Typography sx={TypoPara}>We only share personal information with other companies or individuals except Pravas The Journey Pvt. Ltd. in the following circumstances:</Typography>
  <ListUl sx={TypoPara1}>We have consent of respective. We require opt-in consent for the sharing of any sensitive personal information.</ListUl>
  <ListUl sx={TypoPara1}>We provide such information to our team, associates that operate under different brands or other trusted businesses or persons for the purpose of processing personal information on our behalf. We require that these parties agree to process such information based on our instructions and in compliance with this Privacy Policy and any other appropriate confidentiality and security measures.</ListUl>
  <ListUl sx={TypoPara1}>We have a good faith belief that access, use, preservation or disclosure of such information is reasonably necessary to</ListUl>
 
  <Typography sx={TypoPara1}>
    <Typography sx={TypoPara2}>(a) Satisfy any applicable law, regulation, legal process or enforceable governmental request</Typography>
    <Typography sx={TypoPara2}>(b) Enforce applicable Terms of Service, including investigation of potential violations thereof</Typography>
    <Typography sx={TypoPara2}>(c) Detect, prevents, or otherwise addresses fraud, security or technical issues</Typography>
    <Typography sx={TypoPara2}>(d) Protect against harm to the rights, property or safety of Pravas The Journey Pvt. Ltd., its clients or the public as required and/or permitted by law.</Typography>
  </Typography>

  <ListUl sx={TypoPara1}>If we are involved in a merger, acquisition, or any form of sale of some or all of its assets, we will ensure the confidentiality of any personal information involved in such transactions and provide notice before personal information is transferred and becomes subject to a different privacy policy.</ListUl>
  <ListUl sx={TypoPara1}>We may share with third parties’ certain pieces of aggregated, non-personal information, such as the number of customers who hired particular Service, or how many consumers used particular service. Such information does not identify you individually.</ListUl>


  <Typography sx={TypoPara}><b>Security</b></Typography>
  <Typography sx={TypoPara1}>We take appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure or destruction of data. It includes internal reviews of our data collection, storage and processing practices and security measures, as well as physical security measures to guard against unauthorized access to systems where we store data. We restrict access to personal information to employees, contractors and agents who need to know that information in order to operate, develop or improve our services. These individuals are bound by confidentiality obligations and may be subject to discipline, including termination and criminal prosecution, if they fail to meet these obligations.</Typography>
  <Typography sx={TypoPara}><b>Data integrity</b></Typography>
  <Typography sx={TypoPara1}>We use personal information only for the purposes for which it was collected and in accordance with this Privacy Policy or any applicable service-specific privacy notice. We review our data collection, storage and processing practices to ensure that we only collect, store and process the personal information needed to provide or improve our services or as otherwise permitted under this Policy. We take reasonable steps to ensure that the personal information we process is accurate, complete, and current, but we depend on our users to update or correct their personal information whenever necessary.</Typography>
  <Typography sx={TypoPara}><b>Enforcement</b></Typography>
  <Typography sx={TypoPara1}>We regularly review the compliance with this Privacy Policy. Please feel free to direct any questions or concerns regarding this Privacy Policy or treatment of personal information by contacting us through the website, email or by writing to us at – 528 Vinayak Smruti, Shivajinagar Gaothan, Pune 400115. When we receive formal written complaints, we to contact the respective customer regarding his or her concerns. We will cooperate with the appropriate regulatory authorities, including local law/data protection authorities, to resolve any complaints regarding the transfer of personal data that cannot be resolved between Pravas The Journey Pvt. Ltd. and an individual.</Typography>
  <Typography sx={TypoPara}><b>Changes in Privacy Policy</b></Typography>
  <Typography sx={TypoPara1}>Please note that this Privacy Policy may change from time to time. We will not reduce your rights under this Privacy Policy without ones explicit consent, and we expect most such changes will be minor. Regardless, we will post any Privacy Policy changes, if the changes are significant, we will provide a more prominent notice (email notification of Privacy Policy changes). If you have any additional questions or concerns about this Privacy Policy, please feel free to contact us.</Typography>
  
  </Grid>
  </>;
};

export default PrivacyPolicy;
