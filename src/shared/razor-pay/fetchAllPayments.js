import axios from "axios";

async function getAllPayments() {
  const response = await axios.get(
    "https://api.razorpay.com/v1/payments",
    {
      auth: {
        key_id: "rzp_test_577RSEw8WtsFyW",
        key_secret: "LTYcyCgYks2UBz65HPzVNLhs",
      },
    },
    { params: { skip: "skip", count: "count" } }
  );
  const data = await response.data;
  console.log(data);
}
getAllPayments();
export default getAllPayments;
