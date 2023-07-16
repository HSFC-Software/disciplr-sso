/* eslint-disable @next/next/no-async-client-component */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Invite(props: any) {
  const params = useSearchParams();

  const handleRedirect = () => {
    const redirect_uri = params.get("redirect_uri") ?? "";
    window.location.href = redirect_uri;
  };

  useEffect(() => {
    setTimeout(() => {
      handleRedirect();
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col gap-3 max-w-[450px] w-full mx-7">
      <header className="text-gray-700 font-bold text-3xl mb-7">
        Change Password
      </header>

      <label className="text-gray-700 font-bold">Success!</label>

      <p className="text-sm text-gray-400">
        Will redirect you to the app in a moment...{" "}
        <button className="text-[#6e7ac5]">Redirect Manually.</button>
      </p>
    </div>
  );
}
