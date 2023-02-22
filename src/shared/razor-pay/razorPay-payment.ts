import BookingService from "../../services/BookingService";

let customersId: string;
let toursId: string;

const handleOpenRazorPay = (data: any) => {
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
        tourId: toursId,
        customerId: customersId,
      })

        .then((res) => {
          /// successfull payment
          console.log("verify", res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // prefill: {
    //   name: "Gaurav Kumar",
    //   email: "gaurav.kumar@example.com",
    //   contact: "9000090000",
    // },
    notes: {
      customerId: customersId,
      tourId: toursId,
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
    console.log("Error: ", e);
  }
};

const handlePayment = (amount: string, customerId: string, tourId: string) => {
  customersId = customerId;
  toursId = tourId;
  console.log("hi", amount, customerId, tourId);

  if (!amount || !customerId || !tourId) return false;

  if (customerId)
    BookingService.createOrder(amount)
      .then((result) => {
        // on order creation open RazorPay interface
        handleOpenRazorPay(result?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
};

export default handlePayment;
