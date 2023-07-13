import Image from "next/image";

export default function Invite(props: any) {
  const link = props.searchParams.link;

  return (
    <main className="h-screen w-full flex justify-center items-center relative">
      <div className="absolute top-7 left-7">
        <Image src="/disciplr-logo.png" alt="disciplr" width="36" height="36" />
      </div>
      <div>
        <h1 className="text-5xl font-bold text-center px-7 text-gray-700">
          Your invitation has expired
        </h1>
        <p className="mt-3 text-sm px-5 text-gray-400 text-center">
          Kindly contact your Disciplr to request a new invitation.
          <span className="block">[{link}]</span>
        </p>
      </div>
    </main>
  );
}
