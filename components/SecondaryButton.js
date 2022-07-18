import { useRouter } from "next/router";

function SecondaryButton({ text, link }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(link)}
      className="px-4 py-5 ml-4 font-extrabold transition rounded-md bg-info hover:bg-opacity-50 hover:bg-success hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 text-primary"
    >
      {text}
    </button>
  );
}

export default SecondaryButton;
