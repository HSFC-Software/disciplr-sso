import Image from "next/image";
import Link from "next/link";

export default function Expired(props: any) {
  return (
    <main className="h-screen w-full flex justify-center items-center relative">
      <div className="absolute top-7 left-7">
        <Image src="/disciplr-logo.png" alt="disciplr" width="36" height="36" />
      </div>
      <div className="px-7">
        <h1 className="text-3xl font-bold text-gray-700">
          Your invitation has expired
        </h1>
        <p className="mt-3 text-gray-400">
          Request for a a new reset password{" "}
          <Link href="/forgot" className="underline text-[#6e7ac5]">
            link.
          </Link>
        </p>
      </div>
    </main>
  );
}
