"use client";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";

const url = process.env.NEXT_PUBLIC_AUTH_URL ?? "";
const key = process.env.NEXT_PUBLIC_AUTH_KEY ?? "";

export default function Forgot() {
  const params = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    const userEl = document.getElementById("username") as HTMLInputElement;

    if (userEl.value === "") {
      userEl.focus();
      return;
    }

    setIsLoading(true);

    axios
      .post(
        `${url}/v2/forgot`,
        {
          email: userEl.value,
        },
        { headers: { Authorization: `Bearer ${key}` } }
      )
      .then(() => {
        // redirect to success
        window.location.href = "/forgot/success";
      })
      .catch(() => {
        alert("Unable to send email. Kindly double check the email address.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onBlur = () => {
    document.getElementById("footnote")?.classList.remove("hidden");
  };

  const onFocus = () => {
    document.getElementById("footnote")?.classList.add("hidden");
  };

  useEffect(() => {
    document.getElementById("username")?.focus();
  }, []);

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-3 max-w-[450px] w-full mx-7">
        <h1 className="text-3xl font-bold text-gray-700 mb-7">
          Forgot Password?
        </h1>
        <input
          disabled={isLoading}
          required
          onFocus={onFocus}
          onBlur={onBlur}
          id="username"
          onKeyUp={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="bg-gray-50 py-4 px-6 rounded-xl"
          placeholder="Email Address"
        />

        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="disabled:bg-gray-50 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-medium text-gray-700"
        >
          Reset My Password
        </button>

        <p className="mt-3 text-sm text-gray-400">
          <a
            className="text-[#6e7ac5] underline"
            href="https://app.fishgen.org/networks/sign-in"
          >
            Go back to sign in
          </a>
        </p>
      </div>
    </main>
  );
}
