import Link from "next/link";
import Button from "@/components/Button";
import { useCurrentUser, useRemoveUser, useGetAllUsers } from "@/hooks";
import Trash from "@/assets/svgs/trash.svg";
import ChevronRight from "@/assets/svgs/chevron-right.svg";
import Image from "next/image";
import { UserWithoutSensitiveData } from "@/types";
import { useEffect, useState } from "react";
import Profile from "@/components/Profile";

const UserList = (): JSX.Element => {
  const { data, loading } = useGetAllUsers();
  const [users, setUsers] = useState<UserWithoutSensitiveData[]>([]);
  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);
  const { remove } = useRemoveUser();

  const handleRemove = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await remove(id);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      return;
    }

    setUsers(users.filter((user) => user.id !== id));
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-semibold text-lg m-0">All Members</h1>
        <h2 className="text-xs text-zinc-400 font-medium">
          Admin role needed to delete users.
        </h2>
      </div>
      {users?.map((user: UserWithoutSensitiveData) => (
        <Link href={`/member/${user.id}`} key={user.id}>
          <div className="flex items-center justify-between hover:bg-zinc-100 p-4 border border-zinc-200 rounded-sm transition-all ease-default cursor-pointer bg-white">
            <div className="flex-1 max-w-[80%]">
              <h2>{user.name}</h2>
              <h2 className="text-xs text-zinc-400 font-medium truncate">
                {user.email}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => handleRemove(user.id, e)}
              >
                <Image src={Trash} alt="delete" width={20} height={20} />
              </button>
              <Image src={ChevronRight} alt="view" width={20} height={20} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const Member = (): JSX.Element => {
  const { user } = useCurrentUser();
  if (!user) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="w-full py-12 px-8 flex flex-col justify-center items-center border-box">
      <div className="flex flex-col gap-16 w-full max-w-[400px]">
        <div className="flex flex-col gap-5">
          <Profile email={user.email} name={user.name} id={user.id} />
          <Link href="/logout">
            <Button variant="outline" className="w-full">
              Logout
            </Button>
          </Link>
        </div>
        <UserList />
      </div>
    </div>
  );
};

export default Member;
