import * as React from 'react';
import Grid from "@mui/material/Grid";
import styled from '@emotion/styled';
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import TableCancellationPolicy from './TableCancellationPolicy';

const ListUl = styled(ListItem)({
    display:"list-item"
   });  

   const TypoPara1 = {
    // para
    padding :{xs:"1% 6% 1% 6%", md:"0% 8% 0% 8%", lg:"0% 8% 0% 8%"},
    fontSize:"1rem",
    lineHeight:"1.86em"
   }   
   
   const typoHead = {
    padding :{xs:"8% 6% 2% 6%", md:"4% 8% 1% 8%", lg:"4% 8% 1% 8%"},
   }
interface ICancellationPolicyProps {
}

const CancellationPolicy: React.FunctionComponent<ICancellationPolicyProps> = (props) => {
  return <>
  <Grid mt={5} mb={14}>
  <Typography sx={{ padding :{xs:"5% 6% 1% 6%", md:"2% 8% 1% 8%", lg:"1% 8% 2% 8%"},
    fontSize:"1rem",lineHeight:"1.86em"}}><b>Cancellation Policy And Refund Rules:</b></Typography>
 
 <ListUl sx={TypoPara1}>Transport Ticket, Railway Reservations, Air Reservations is a contract between the carrier (Transport Company/ Airline/ Shipping Company/ Railway Authority) and the traveller. The contract terms and conditions are presented in fine print overleaf of the tickets or on inserts or on official websites of the respective service provider, company. Upon buying of the ticket the traveller automatically accepts these terms and conditions. No signature is needed from the traveller. The said Terms and Conditions also include Cancellation Rules as well as Refund Rules. The same would be applicable to the client.</ListUl>
 <ListUl sx={TypoPara1}>Please do note that Pravas The Journey Pvt. Ltd. also charges some nominal fee as Cancellation Service Charges. The amount as received by the Service Provider will be refunded to the clients after deducting our Cancellation Service Charge within 10 to 15 days of Cancellation.</ListUl>
 <ListUl sx={TypoPara1}>Also, every Hotel, Service Provider and Transport Provider has their own Cancellation Charges. The same would be applicable to the client. Please do note that Pravas The Journey Pvt. Ltd. also charges some nominal fees as Cancellation Service Charges. The amount as received by the Service Provider will be refunded to the clients after deducting our Cancellation Service Charge within 10 to 15 days of Cancellation. This document which, depending on the situation is an offer, a confirmation or an invoice, is – pursuant to internationally accepted practice – a contract between the travel agency and the client/traveller. The object of the contract comprises all the services listed here (incl. Transport tickets, which are thus subject to two contracts). The traveller’s acceptance and/or written or oral confirmation of the order and/or payment of the partial or full amount to the travel agency are considered equal to the client/traveller signing the contract. No physical signature is needed. Placing the order and/or paying (whichever happens first) therefore means that client/traveller agree with all the terms and conditions and information presented in this document as well as with any other information and terms and conditions given to client/traveller by us orally or in writing, or information and terms and conditions that client/traveller could have requested from us before the final confirmation of the respective order.</ListUl>
 <ListUl sx={TypoPara1}>Refund policy may differ than mentioned below, it will be applicable depending upon some selective sectors/ regions/ state/ season/ country/ service providers etc.</ListUl>
 <ListUl sx={TypoPara1}>Refund will be made on following terms. If tour is cancelled by traveller / guest for whatever reason.</ListUl>
 
 <TableCancellationPolicy />

 <ListUl sx={{padding :{xs:"5% 8% 5% 8%", md:"0% 8% 0% 8%", lg:"0% 8% 0% 8%"},}}>For Airfare & Train Tickets: It will be depending on Respective Policy + Rs.500 for Air tickets & Rs.100 for Train Tickets per head as our booking charges.</ListUl>
  
  <Typography sx={typoHead}><b>Note:</b></Typography>
  <ListUl sx={TypoPara1}>Applicable Refund as per cancellation policy will be paid within 15 to 20 working days from the date of cancellation or as per service provider time limit.</ListUl>
  <ListUl sx={TypoPara1}>No interest etc. will be applicable on any refund.</ListUl>
  <ListUl sx={TypoPara1}>Cancellation charges are applicable on total tour costing (As per services taken).</ListUl>
  <ListUl sx={TypoPara1}>In some cases – Hotels, Vehicle owners, Service providers etc. may apply their own cancelation policy, which are also applicable.</ListUl>
  <ListUl sx={TypoPara1}>Under force Majeure Situation, the company reserves the right to Cancel, Partly Cancel and/or Reschedule tour considering the situations and safety of all. No refund fully/partly applicable on cancellation under any circumstances due to Force Majeure </ListUl>
  <ListUl sx={TypoPara1}>The Company reserves the right to reschedule tour, event or change the itinerary because of any uncontrollable factors like change in airline timetable, discontinuation or suspension of services by suppliers/service providers. No Refund is applicable in uncontrollable situations and guest has to abide by the new itinerary/timetable/schedule.</ListUl>
  <ListUl sx={TypoPara1}>Refund will be made in original mode of payment imitated by client. No cash transfers will be made in any circumstances.</ListUl>
  <ListUl sx={TypoPara1}>For Credit Notes – Credit Amount and Validity of same will be case to case basis and will be as mentioned on credit note.</ListUl>
  <ListUl sx={TypoPara1}>Credit notes cannot be transferred.</ListUl>
  <ListUl sx={TypoPara1}>Credit Notes cannot be bank transferred or converted in to any payment mode. It should only be used for bookings with company as mentioned on credit note.</ListUl>
  <ListUl sx={TypoPara1}>Guest is required to pay additional cost due to delay in flight/ cancellation of flight/ missed flight, missing the connecting flight.</ListUl>
  <ListUl sx={TypoPara1}>In case of any unidentified breakout of any epidemics, any uncertain calamities (natural or manmade) the policy of company may change as per the situation occurred.</ListUl>
 
  <Typography sx={typoHead}><b>Rules & Regulations</b></Typography> 
  <ListUl sx={TypoPara1}>Following the time schedule given by Tour/Trek/Safari Leader is mandatory.</ListUl>
  <ListUl sx={TypoPara1}>Company has reserved all rights of admission and to make change in the schedule/ plan as per conditions and without any prior notice.</ListUl>
  <ListUl sx={TypoPara1}>Consumption or carrying liquor, alcohol, tobacco products, and any banned substances is strictly prohibited destinations, events, tours, treks, wildlife safaris etc.</ListUl>
 
  </Grid>
  </>;
};

export default CancellationPolicy;
