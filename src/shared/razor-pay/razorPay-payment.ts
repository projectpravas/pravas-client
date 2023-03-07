import BookingService from "../../services/BookingService";
import TourService from "../../services/TourService";
import UserService from "../../services/UserService";

async function getData(tourId: string, customerId: string) {
  let tourTitle = "";
  let tourDate: any = "";
  let name = "";

  if (!customerId || !tourId) return;

  await TourService.fetchOneTour(tourId)
    .then(async (res) => {
      const tour = await res?.data?.data;

      tourTitle = tour?.title ? tour?.title : "";
      tourDate = tour?.tourDate
        ? new Intl.DateTimeFormat("en-IN").format(
            new Date(tour?.tourDate.toString())
          )
        : "";
    })
    .catch((err) => {
      console.error(err);
    });

  await UserService.fetchOneUser(customerId)
    .then(async (res) => {
      const user = await res?.data?.data;

      name = `${user?.name ? user?.name?.first : ""} ${
        user?.name ? user?.name?.last : ""
      }`;
    })
    .catch((err) => {
      console.error(err);
    });

  return { tourDate, tourTitle, name };
}

const handleOpenRazorPay = (
  data: any,
  notesData: any,
  tourId: string,
  customerId: string,
  getCurrentUser: Function
) => {
  const options = {
    key: "rzp_test_577RSEw8WtsFyW",
    amount: data?.amount,
    currency: data?.currency,
    name: "Pavas The Journey",
    description: "Test Transaction",
    image: "/PTSM-LOGO.png",
    order_id: data?.id,
    handler: (response: any) => {
      BookingService.verifyOrder({
        ...response,
        tourId: tourId,
        customerId: customerId,
      })

        .then((res) => {
          /// successfull payment
          getCurrentUser();
          return res;
        })
        .catch((err) => {
          console.error(err);
          const msg = err?.response?.data?.message || "Payment Failed";
          return msg;
        });
    },
    // prefill: {
    //   name: "Gaurav Kumar",
    //   email: "gaurav.kumar@example.com",
    //   contact: "9000090000",
    // },
    notes: {
      ...notesData,
      paymentTime: Date.now(),
    },
    // theme: {
    //   color: "#3399cc",
    // },
    timeout: 60 * 5,
  };

  const rzp = new window.Razorpay(options);

  try {
    rzp.open();
  } catch (e) {
    console.error("Error: ", e);
    const msg = "Payment Failed";
    return msg;
  }
};

const handlePayment = async (
  amount: string,
  customerId: string,
  tourId: string,
  getCurrentUser: Function
) => {
  if (!amount || !customerId || !tourId) return false;

  const notesData = await getData(tourId, customerId);

  if (customerId)
    BookingService.createOrder(amount)
      .then((result) => {
        // on order creation open RazorPay interface
        handleOpenRazorPay(
          result?.data?.data,
          notesData,
          tourId,
          customerId,
          getCurrentUser
        );
      })
      .catch((err) => {
        console.error(err);
        const msg = err?.response?.data?.message || "Payment Failed";
        return msg;
      });
};

export default handlePayment;
