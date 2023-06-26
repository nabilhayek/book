import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Switch from "@/components/Switch";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRegister, useLogin } from "@/hooks";
import { sleep } from "@/lib/functions";
import client from "@/lib/apollo-client";
import { useState } from "react";

export default function Register() {
  const [agreed, setAgreed] = useState(false);

  const router = useRouter();

  type FormEvent = React.FormEvent<HTMLFormElement> & {
    target: HTMLFormElement & {
      email: HTMLInputElement;
      password: HTMLInputElement;
      name: HTMLInputElement;
      confirmPassword: HTMLInputElement;
    };
  };

  const { register, loading } = useRegister();
  const { login, loading: loginLoading } = useLogin();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password, name, confirmPassword } = e.target;

    if (!email.value) return alert("Email is required");
    if (!password.value) return alert("Password is required");
    if (!name.value) return alert("Name is required");

    if (password.value !== confirmPassword.value)
      return alert("Passwords do not match");

    if (!agreed) return alert("You must agree to the terms and conditions");

    try {
      await register(email.value, name.value, password.value);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      return;
    }

    try {
      await login(email.value, password.value);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      return;
    }

    client.clearStore();
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col gap-14">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-[300px]"
        >
          <TextInput
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="email"
          />
          <TextInput
            label="Name"
            placeholder="Enter your name"
            type="text"
            name="name"
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
          />
          <TextInput
            label="Confirm Password"
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
          />
          <Switch
            label="I agree to the terms and conditions"
            onChange={(e) => setAgreed(e)}
          />
          <Button
            disabled={loading || loginLoading}
            variant="solid"
            className="w-full"
          >
            Register
          </Button>
        </form>
        <Link href="/login">
          <Button
            disabled={loading || loginLoading}
            variant="text"
            className="w-full"
          >
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
