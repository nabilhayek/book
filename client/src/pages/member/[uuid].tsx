import Button from '@/components/Button';
import Profile from '@/components/Profile';
import { useUser } from '@/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const MemberProfile = (props: Props) => {
    const router = useRouter();
    const {data, loading, error} = useUser(router.query.uuid as string)
    

    if(loading || !data) return (
        <p>Loading ...</p>
    )

    if(error) return (
        <p>{error.message}</p>
    )


  return (
    <div className="w-full h-full flex flex-col justify-center items-center border-box">
      <div className="flex flex-col gap-16 min-w-[400px]">
      <Profile email={data.user.email} name={data.user.name} id={data.user.id} />
      <Link href="/member"><Button variant="outline" className="w-full">Go to Member Page</Button></Link>
      </div>
    </div>
  )
}

export default MemberProfile