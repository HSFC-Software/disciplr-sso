/* eslint-disable @next/next/no-async-client-component */
"use client";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_AUTH_URL ?? "";
const key = process.env.NEXT_PUBLIC_AUTH_KEY ?? "";

async function validateInvitation(id: string) {
  const res = await fetch(`${url}/v2/auth/invite/${id}`, {
    headers: { Authorization: `Bearer ${key}` },
  });

  if (res.status !== 200) return false;
  return true;
}

export default function Invite(props: any) {
  const invitation_id = props.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const params = useSearchParams();

  const handleSubmit = () => {
    const userEl = document.getElementById("username") as HTMLInputElement;
    const passEl = document.getElementById("password") as HTMLInputElement;
    const rePassEl = document.getElementById("re-password") as HTMLInputElement;

    // checks if passwords are match
    if (passEl.value !== rePassEl.value) {
      alert("Password do not match.");
      rePassEl.focus();
      return;
    }

    setIsLoading(true);
    axios
      .patch(
        `${url}/v2/auth`,
        {
          invitation_id,
          username: userEl.value,
          password: passEl.value,
        },
        { headers: { Authorization: `Bearer ${key}` } }
      )
      .then(() => {
        // sign in the user and redirect to the app

        // redirect_uri
        const redirect_uri = params.get("redirect_uri");

        axios
          .post(
            `${url}/v2/auth`,
            {
              username: userEl.value,
              password: passEl.value,
            },
            { headers: { Authorization: `Bearer ${key}` } }
          )
          .then((res) => {
            window.location.href = `${redirect_uri}?token=${res.data.token}`;
          });
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    validateInvitation(invitation_id)
      .then((res) => {
        if (!res) {
          window.location.href =
            "/invitation/expired?link=" + window.location.href;
        }
      })
      .finally(() => {
        setIsValidating(false);
      });
  }, []);

  if (isValidating)
    return (
      <div className="flex flex-col items-center gap-4">
        <div>
          <h1 className="text-5xl font-bold text-center px-7 text-gray-700">
            Validating
          </h1>
          <p className="mt-3 text-sm px-5 text-gray-400 text-center">
            <span className="block">[{window?.location.href}]</span>
          </p>
        </div>

        <div className="w-[40px] mt-4">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 120 30"
            xmlns="http://www.w3.org/2000/svg"
            fill="#6e7ac5"
          >
            <circle cx="15" cy="15" r="15">
              <animate
                attributeName="r"
                from="15"
                to="15"
                begin="0s"
                dur="0.8s"
                values="15;9;15"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                from="1"
                to="1"
                begin="0s"
                dur="0.8s"
                values="1;.5;1"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="60" cy="15" r="9" fill-opacity="0.3">
              <animate
                attributeName="r"
                from="9"
                to="9"
                begin="0s"
                dur="0.8s"
                values="9;15;9"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                from="0.5"
                to="0.5"
                begin="0s"
                dur="0.8s"
                values=".5;1;.5"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="105" cy="15" r="15">
              <animate
                attributeName="r"
                from="15"
                to="15"
                begin="0s"
                dur="0.8s"
                values="15;9;15"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                from="1"
                to="1"
                begin="0s"
                dur="0.8s"
                values="1;.5;1"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-3 max-w-[450px] w-full mx-7">
      <div className="flex justify-center w-full mb-7">
        <Image src="/disciplr-logo.png" alt="disciplr" width="75" height="75" />
      </div>
      <input
        // autoFocus
        disabled={isLoading}
        required
        id="username"
        className="bg-gray-50 py-4 px-6 rounded-xl"
        placeholder="Phone or Email Address"
      />
      <input
        required
        disabled={isLoading}
        id="password"
        className="bg-gray-50 py-4 px-6 rounded-xl"
        placeholder="Password"
        type="password"
      />
      <input
        required
        disabled={isLoading}
        id="re-password"
        className="bg-gray-50 py-4 px-6 rounded-xl"
        placeholder="Retype Password"
        type="password"
      />
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className="disabled:bg-gray-50 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-medium text-gray-700"
      >
        Sign Up
      </button>
      <p className="mt-3 px-5 text-sm text-gray-400 text-center">
        By clicking &quot;Sign Up&quot; you are agreeing to our{" "}
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
