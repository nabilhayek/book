import Link from "next/link"
import Button from "./Button"
import { useCurrentUser } from "@/hooks"

type Props = {
    id: string
    name: string
    email: string
  }

const Profile = ({id, name, email}: Props) => {
    const { user } = useCurrentUser()
    return (
        <div className="flex flex-col gap-5 w-full">
        <h1 className="font-semibold text-lg">Profile details</h1>
        <div>
        <h2>{name}</h2>
        <h2>{email}</h2>
        <h2>{id}</h2>
  
        </div>
        {/* <Link href="/logout"><Button variant="outline" className="w-full">Logout</Button></Link> */}
        </div>
    )
  }

export default Profile