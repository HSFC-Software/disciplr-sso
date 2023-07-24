import Image from "next/image";
import Link from "next/link";

export default function Success(props: any) {
  return (
    <main className="h-screen w-full flex justify-center items-center relative">
      <div className="absolute top-7 left-7">
        <Image src="/disciplr-logo.png" alt="disciplr" width="36" height="36" />
      </div>
      <div className="px-7">
        <h1 className="text-3xl font-bold text-gray-700">
          Disciplr Password Updated
        </h1>
        <p className="mt-3 text-gray-400">
          Your new password is now active and you can use it to login to your
          account.
          <br />
          <br />
          <Link
            href="https://app.fishgen.org/sign-in"
            className="underline text-[#6e7ac5]"
          >
            Go back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
