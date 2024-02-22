import { BiSearch } from "react-icons/bi";
import { Button, Input } from "..";
import Logo from "../Logo";
import { Share2 } from "lucide-react";
import { useSocketContext } from "@/context/socket-context";
import { useModal } from "@/hooks/use-modal-store";

export const DetailsForm = ({
  username,
  setUsername,
  loading,
  findMatch,
  joinInviteQueue,
  findMatchButtonTitle = "Find",
  title = "Welcome to TicTacGo!",
}: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  findMatch: () => void;
  joinInviteQueue?: () => void;
  title?: string;
  findMatchButtonTitle?: string;
}) => {
  const { onOpen } = useModal();
  const { isConnected } = useSocketContext();

  return (
    <div className="flex flex-col gap-y-8 items-center">
      <Logo />
      <form className="rounded-md p-4 md:shadow-slate-700 md:shadow-sm md:border md:border-slate-700">
        <h1 className="text-3xl md:text-4xl text-center font-bold">{title}</h1>
        <Input
          maxLength={30}
          containerProps={{ className: "my-4" }}
          className="w-full p-2"
          label="Username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="flex gap-x-4 justify-end">
          {username?.length > 2 && isConnected && joinInviteQueue && (
            <Button
              className="py-2 px-4"
              onClick={(e) => {
                e.preventDefault();
                onOpen("Copy Link", { username });
                joinInviteQueue?.();
              }}
              loading={loading}
              endContent={<Share2 />}
            >
              Share
            </Button>
          )}
          <Button
            className="py-2 px-4"
            onClick={(e) => {
              e.preventDefault();
              findMatch();
            }}
            loading={loading}
            endContent={!findMatchButtonTitle && <BiSearch />}
          >
            {findMatchButtonTitle}
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
};
