import TextInput from "@/components/TextInput"
import Button from "@/components/Button"
import Link from "next/link"

export default function Login() {


  type FormEvent = React.FormEvent<HTMLFormElement> & { target: HTMLFormElement & { email: HTMLInputElement, password: HTMLInputElement } }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // const { email, password } = e.target
    // console.log(email.value, password.value)
    console.log(e.target.email.value)
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col gap-14">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[300px]">
        <TextInput label="Email" placeholder="Enter your email" type="email" name="email" />
        <TextInput label="Password" placeholder="Enter your password" type="password" name="password" />
        <Button variant="solid" className="w-full">Login</Button>
      </form>
      <Link href="/register">
      <Button variant="text" className="w-full">Register</Button>
      </Link>
    </div>
    </div>
  )
}
