"use client";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_AUTH_URL ?? "";
const key = process.env.NEXT_PUBLIC_AUTH_KEY ?? "";

export default function SignIn() {
  const params = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

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
        <div className="flex justify-center w-full mb-7">
          <Image
            src="/disciplr-logo.png"
            alt="disciplr"
            width="75"
            height="75"
          />
        </div>
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
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="disabled:bg-gray-50 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-medium text-gray-700"
        >
          Sign In
        </button>
        <p className="mt-3 px-5 text-sm text-gray-400 text-center">
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
