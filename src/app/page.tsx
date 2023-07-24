"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";

const url = process.env.NEXT_PUBLIC_AUTH_URL ?? "";
const key = process.env.NEXT_PUBLIC_AUTH_KEY ?? "";

export default function SignIn() {
  const params = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleSubmit = () => {
    const userEl = document.getElementById("username") as HTMLInputElement;
    const passEl = document.getElementById("password") as HTMLInputElement;

    const client_id = params.get("client_id");
    const redirect_uri = params.get("redirect_uri");
    const state = params.get("state");

    if (userEl.value === "") {
      userEl.focus();
      return;
    }

    if (passEl.value === "") {
      passEl.focus();
      return;
    }

    setIsLoading(true);

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
        window.location.href = `${redirect_uri}?client_id=${client_id}&state=${state}&#access_token=${res.data.token}`;
      })
      .catch(() => {
        alert("Invalid username or password");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onBlur = () => {
    document.getElementById("footnote")?.classList.remove("hidden");
    document.getElementById("logo")?.classList.remove("hidden");
  };

  const onFocus = () => {
    document.getElementById("footnote")?.classList.add("hidden");
    document.getElementById("logo")?.classList.add("hidden");
  };

  useEffect(() => {
    // document.getElementById("username")?.focus();
  }, []);

  return (
    <main className="h-screen w-full flex justify-center items-center relative">
      <div
        id="logo"
        className="abforgot/6cd0e352-7d0c-49c7-adf2-12b904056fa0solute top-7 left-7"
      >
        <Image src="/disciplr-logo.png" alt="disciplr" width="36" height="36" />
      </div>
      <div className="flex flex-col gap-3 max-w-[450px] w-full mx-7 py-7">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Sign In</h1>

        <input
          disabled={isLoading}
          required
          onFocus={onFocus}
          onBlur={onBlur}
          id="username"
          className="bg-gray-50 py-4 px-6 rounded-xl"
          placeholder="Email Address"
        />
        <input
          required
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={isLoading}
          id="password"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="bg-gray-50 py-4 px-6 rounded-xl"
          placeholder="Password"
          type="password"
        />

        <div className="flex justify-between mt-3 items-center flex-wrap gap-y-4">
          <div className="flex gap-2 text-gray-500 items-center shrink-0">
            {remember && (
              <button
                onClick={() => setRemember(false)}
                className="h-5 w-5 rounded bg-[#6e7ac5] text-white flex items-center justify-center"
              >
                <BiCheck />
              </button>
            )}
            {!remember && (
              <button
                onClick={() => setRemember(true)}
                className="h-5 w-5 rounded bg-gray-100 text-white flex items-center justify-center"
              />
            )}
            <div>Remember me</div>
          </div>
          <div className="text-center">
            <Link
              href="/forgot"
              className="text-gray-400 hover:underline cursor-pointer"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="disabled:bg-gray-50 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-medium text-gray-700 mt-4"
        >
          Submit
        </button>
        <p className="text-sm text-gray-400 text-center px-5">
          By clicking &quot;Sign In&quot; you agree to our{" "}
          <a
            className="text-[#6e7ac5]"
            href="https://app.fishgen.org/privacy.html"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </main>
  );
}
