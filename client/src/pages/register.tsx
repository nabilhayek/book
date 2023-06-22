import TextInput from "@/components/TextInput"
import Button from "@/components/Button"
import Switch from "@/components/Switch"
import Link from "next/link"

export default function Register() {


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
        <TextInput label="Name" placeholder="Enter your name" type="text" name="name" />
        <TextInput label="Password" placeholder="Enter your password" type="password" name="password" />
        <TextInput label="Confirm Password" placeholder="Confirm password" type="password" name="confirmPassword" />
        <Switch label="I agree to the terms and conditions" />
        <Button variant="solid" className="w-full">Register</Button>
      </form>
        <Link href="/login">
      <Button variant="text" className="w-full">Login</Button>
        </Link>
    </div>
    </div>
  )
}
