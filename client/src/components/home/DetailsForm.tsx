import { BiSearch } from "react-icons/bi";
import { Button, Input } from "..";
import Logo from "../Logo";

export const DetailsForm = ({
  username,
  setUsername,
  loading,
  findMatch,
}: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  findMatch: () => void;
}) => (
  <div className="flex flex-col gap-y-8 items-center">
    <Logo />
    <form className="rounded-md p-4 shadow-slate-700 shadow-sm border border-slate-700">
      <h1 className="text-4xl text-center font-bold">Welcome to TicTacGo!</h1>
      <Input
        maxLength={30}
        containerProps={{ className: "my-4" }}
        className="w-full p-2"
        label="Username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          className="py-2 px-4"
          onClick={findMatch}
          loading={loading}
          endContent={<BiSearch />}
        >
          Find
        </Button>
      </div>
    </form>
    <span>
      Developed by{" "}
      <a
        target="_blank"
        href="https://vidhanshu.vercel.app/"
        className="text-blue-500 hover:underline"
      >
        Vidhanshu
      </a>
    </span>
  </div>
);
