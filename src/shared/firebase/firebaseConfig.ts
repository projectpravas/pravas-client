import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { errorToast } from "../../ui/toast/Toast";

declare global {
  interface Window {
    appVerifier: any;
    confirmationResult: any;
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyAT2PMLVl4aPxWvKJlB8k9NLy59ZlI3syE",
  authDomain: "pravas-7a635.firebaseapp.com",
  projectId: "pravas-7a635",
  storageBucket: "pravas-7a635.appspot.com",
  messagingSenderId: "432819183076",
  appId: "1:432819183076:web:4847730cf623a5947bbbf1",
  measurementId: "G-CW5NHB0G4Z",
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireApp);
const auth = getAuth(fireApp);

const sendOTP = (setVerifiedStatus?: any, mobNumber?: any) => {
  if (typeof window.appVerifier != "object") {
    window.appVerifier = new RecaptchaVerifier(
      // "sign-in-button",
      "recaptcha-container",
      {
        size: "invisible",
        // size: "normal",
        callback: (response: any) => {
          // console.log("Can call verify-Method");
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // destroyRecaptcha();
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );
  }

  signInWithPhoneNumber(auth, `+91${mobNumber}`, window.appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
      // console.log(`OTP has sent to mobile number => ${mobNumber}`);
    })
    .catch((error) => {
      // Error; SMS not sent
      console.error(error);
      setVerifiedStatus && setVerifiedStatus(false);
      return;
      // ...
    });
};

const verifyOTP = (OTP: any, mobNumber: any, initialStateReset?: any) => {
  if (mobNumber == "") {
    errorToast("Please check Mobile Number..", 5000);
    return;
  }
  if (OTP?.length != 6) {
    errorToast(`OTP must have 6 digit..`, 5000);
    return;
  }

  window.confirmationResult
    .confirm(OTP)
    .then((result: any) => {
      // User signed in successfully.
      const user = result.user;
      // console.log(user);

      initialStateReset && initialStateReset();
    })
    .catch((error: any) => {
      errorToast("Wrong OTP..", 5000);
      console.error("Wrong OTP", error);

      // User couldn't sign in (bad verification code?)
      // ...
    });
};

export { auth, fireApp, sendOTP, verifyOTP };
