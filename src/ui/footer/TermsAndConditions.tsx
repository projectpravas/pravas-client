import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";
interface ITermsAndConditionsProps {}

const ListUl = styled(ListItem)({
  display: "list-item",
});

const TypoPara = styled(Typography)({});

const TypoPara1 = {
  margin: { xs: "5% 8% 5% 8%", md: "2% 8% 0% 8%", lg: "2% 8% 2% 8%" },
  fontSize: "1rem",
  lineHeight: "1.86em",
};

const TermsAndConditions: React.FunctionComponent<ITermsAndConditionsProps> = (
  props
) => {
  return (
    <>
      <Helmet>
        <title>Terms And Conditions</title>
        <meta name="description" content="Terms And Conditions" />
        <meta name="keywords" content="Terms And Conditions" />
      </Helmet>
      <Grid sx={{ margin: { xs: "12% 0 18% 0", md: "6% 0% 10% 0" } }}>
        <Typography
          variant="h5"
          sx={{
            margin: { xs: "5% 5% 5% 5%", md: "2% 6% 2% 6%" },
            fontSize: "28px",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#313041",
          }}
        >
          Terms And Conditions
        </Typography>
        <Typography
          variant="h6"
          sx={{
            margin: { xs: "3% 8% 3% 8%", md: "0% 8% 0% 8%" },
            fontWeight: "bolder",
            lineHeight: "1.86em",
            fontSize: { xs: "1rem", md: "1rem" },
          }}
        >
          Pravas The Journey Pvt. Ltd.
        </Typography>

        <TypoPara sx={TypoPara1}>
          The following Terms and Conditions are related to bookings made for
          the following mentioned services: Train Tickets, Air Tickets, Hotel
          Reservations/Bookings, Transport, Passport Assistance, Visa and other
          related services offered at Pravas The Journey Pvt. Ltd.
          <Typography>
            {" "}
            1) Accommodations for the clients are subject to availability. In
            case the hotel that we have recommended is not available, we will
            suggest and recommend similar category hotel. The same will be
            booked for clients only after clients approve the changed hotel and
            the changed costs with the difference in price if any.
          </Typography>
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          2) On client’s request, we can block the rooms with hotel authorities,
          but to conform the same, client needs to pay amount stated by us in
          advance within 24 hours. Without advance we do not block the rooms
          etc.
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          3) Balance amount should be paid to us within the time limit
          communicated to clients. In any case, 100% payment has to be received
          by us (and reflected in our bank account in case amount deposit is in
          our Bank account) before client’s departure for the tour. Failing
          which we retain the rights to release the room and apply cancellation
          charges to client.
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          4) Once we received client’s approval for the hotel, request to
          change/modify the same may incur cancellation charges as levied by the
          (booked) hotel authorities/service providers. Every transport company,
          tour operator, service providers and hotel have its own rules
          concerning the changing and cancellation/part cancellations of orders.
          The travel agency acts as a sales agent / reseller for the said
          companies and complies with their rules in exactly the same extent as
          the companies themselves would when dealing with the clients directly
          if applicable.
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          5) Preponing or postponing the dates will be considered as
          cancellation and rebooking.
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          6) All the Hotels/ Resorts/ Campsites/ Transporters/ Service providers
          reserve the rights to increase the rates without prior notice. Changes
          in the cost will have to be incurred by the client even if the changes
          have occurred after oral/written confirmation/part payment/full
          payment from clients to us. In case the charges are reduced, we will
          refund the same to clients.
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          7) Please note that the check-in and check-out time in the hotels are
          generally 12 noon (excepting few hotels where it is 24 hours). Early
          check-in and/or late check-out permissions will be at the sole
          discretion of the respective authorities. Please conform about the
          exact check-in and check-out time.
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          8) Correct Documents: Check immediately after receiving travel
          documents, whether all the necessary documents are there and whether
          the dates, names, prices are correct in all the documents and on all
          the visas, as discussed and advised to us by client. The traveller has
          to bring it to our immediate notice if there are any deficiencies.
          Complaints made after 48 hours after we have handed over/emailed the
          documents or after the start of the trip in regards to the correctness
          of documents may not be entertained/ same will be satisfied only
          within the limits of possibility available at the given moment.
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          9) We will not be responsible for any loss, injury or damage to the
          property/life of clients for all reasons beyond our control during the
          tour. We would not be responsible for changes/extra costs incurred
          because of delays/cancellation of any mode of transport. Clients will
          not receive compensation/ extra expenses from the tour operator, the
          transport company, service provider or the travel agency.
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          10) The services sold by the travel agency do not contain insurance as
          a part of the service or the price, if this has not been expressly
          stated. Travellers will have no right to demand compensation from the
          travel agency for expenses/unforeseen expenses/extra charges, if the
          travel agency was not the direct and immediate cause of such expenses.
          This also applies in case the travel agency has not separately offered
          the client the option to buy insurance cover together with the other
          services sold, or explained the possible consequences of having no
          insurance cover.
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          11) We do not operate any hotel or transport. Though we take utmost
          care to offer the best services, we will not be responsible for any
          shortfall in services offered by our associates/hotel/
          transporter/service providers or any losses/damages that could have
          been a result of their services. The travel agency is not the direct
          provider of any services sold by it, but only an authorized reseller
          of respective. Therefore, the travel agency will not be liable for the
          quality and quantity of the services of the actual service provider
          (Airline, Railway, Shipping line, Hotel tour operator, Car Rental
          Company etc.). If clients are dissatisfied with services, we will only
          be responsible to communicate client’s views to the concerned
          authorities/management of service providers. Compensation (if any)
          offered by our associates/ service provider (Airline, Shipping line,
          Hotel tour operator, Car rental company etc.) will be passed on the
          clients within 15 days of we receiving the amount. It is though
          imperative that:
          <br />
          <br />
          <ListUl>
            Clients launch an official written complaint to the service provider
            and obtain the acknowledgement for the same.
          </ListUl>
          <ListUl>
            Obtain the receipts for the (justified) direct extra expenses.
          </ListUl>
          <ListUl>
            The traveller will have to submit the written complaint together
            with original copies of receipts for the (justified) direct extra
            expenses for which the traveller wishes to receive compensation via
            the travel agency within a week at the latest after clients return
            from the tour (addressed to the director/partner of the travel
            agency). Monetary claims not related to direct and documented
            expenses (moral damages, nervous tension, waste of time etc.) is
            unfortunately not subject to compensation by the travel agency or
            any other company/service provider.
          </ListUl>
        </TypoPara>

        <TypoPara sx={TypoPara1}>
          12) Transport Ticket is a contract between the carrier (Transport
          Company/ Airline/ Shipping/ Railway) and the traveller. The contract
          terms and conditions are presented in fine print overleaf of the
          tickets or on inserts. Please ask for the same to our travel
          counsellor. Upon buying the ticket(s) the traveller automatically
          accepts these terms and conditions. No signature is needed from the
          client.
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          13) Disputes, if any, will be subject to Pune Jurisdiction only.
        </TypoPara>
        <TypoPara sx={TypoPara1}>
          14) I will take care of myself/my family and travel along with all the
          responsibility of personal belongings and will not claim the company
          of any loss, damage, accident.
        </TypoPara>
      </Grid>
    </>
  );
};

export default TermsAndConditions;
