'use client'

// LoginPage.jsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, setupRecaptcha, signInWithPhoneNumber } from "../firebase";
import { ref, set } from "firebase/database";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const router = useRouter();

  const requestOtp = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      console.log("OTP sent");
    } catch (error) {
      console.error("Error during signInWithPhoneNumber:", error);
    }
  };

  const verifyOtp = async () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );
    try {
      const userCredential = await auth.signInWithCredential(credential);
      const user = userCredential.user;

      await set(ref(db, "users/" + user.uid), {
        phoneNumber: user.phoneNumber,
        type: "customer",
      });

      console.log("User logged in successfully");
      router.push("/register");
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          Travelindia.tours
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Mobile Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              placeholder="Phone number"
            />
            <button
              onClick={requestOtp}
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              Send OTP
            </button>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Verify OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              placeholder="OTP"
            />
            <button
              onClick={verifyOtp}
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              Submit OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
