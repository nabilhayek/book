import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Link from "next/link";
import { useLogin } from "@/hooks";
import { useRouter } from "next/router";

export default function Login() {
  const { login, loading } = useLogin();
  const router = useRouter();

  type FormEvent = React.FormEvent<HTMLFormElement> & {
    target: HTMLFormElement & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = e.target;
    console.log(email.value, password.value);
    try {
      await login(email.value, password.value);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      return;
    }

    router.push("/member");
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
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
          />
          <Button disabled={loading} variant="solid" className="w-full">
            Login
          </Button>
        </form>
        <Link href="/register">
          <Button disabled={loading} variant="text" className="w-full">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}
