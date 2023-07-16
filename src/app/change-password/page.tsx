/* eslint-disable @next/next/no-async-client-component */
"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const url = process.env.NEXT_PUBLIC_AUTH_URL ?? "";
const key = process.env.NEXT_PUBLIC_AUTH_KEY ?? "";

export default function Invite(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const params = useSearchParams();

  const handleSubmit = () => {
    const redirect_uri = params.get("redirect_uri");
    const token = params.get("token");

    // check if new passwords match
    const passEl = document.getElementById("new-password") as HTMLInputElement;
    const rePassEl = document.getElementById("re-password") as HTMLInputElement;
    const oldPassEl = document.getElementById("password") as HTMLInputElement;

    if (passEl.value !== rePassEl.value) {
      alert("New passwords do not match");
      rePassEl.focus();
      return;
    }

    setIsLoading(true);

    // handle old password not match
    axios
      .post(
        url + "/v2/auth/password",
        {
          password: passEl.value,
          old: oldPassEl.value,
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            "X-Authorization-Key": token,
          },
        }
      )
      .then(() => {
        window.location.href =
          "/change-password/success?redirect_uri=" + redirect_uri;
      })
      .catch((data) => {
        console.log(data);
        setIsLoading(false);

        if (data?.response?.status === 428) {
          // old password not match
          alert("Old password is incorrect.");
          oldPassEl.focus();
        } else {
          // unable to change password
          alert("Unable to change password. Please try again.");
        }
      });
  };

  return (
    <div className="flex flex-col gap-3 max-w-[450px] w-full mx-7">
      <header className="text-gray-700 font-bold text-3xl mb-7">
        Change Password
      </header>

      <label className="text-gray-700 font-bold">Old Password</label>
      <input
        required
        disabled={isLoading}
        id="password"
        className="bg-gray-50 py-4 px-6 rounded-xl mb-7"
        placeholder="Password"
        type="password"
      />
      <label className="text-gray-700 font-bold">New Password</label>
      <input
        required
        disabled={isLoading}
        id="new-password"
        className="bg-gray-50 py-4 px-6 rounded-xl"
        placeholder="New Password"
        type="password"
      />
      <input
        required
        disabled={isLoading}
        id="re-password"
        className="bg-gray-50 py-4 px-6 rounded-xl mb-7"
        placeholder="Retype New Password"
        type="password"
      />
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className="disabled:bg-gray-50 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-medium text-gray-700"
      >
        Change Password
      </button>
      <p className="mt-3 px-5 text-sm text-gray-400 text-center">
        By clicking &quot;Change Password&quot; you are agreeing to our{" "}
        <a
          className="text-[#6e7ac5]"
          href="https://app.fishgen.org/privacy.html"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
