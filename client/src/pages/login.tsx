export default function Login() {


  type FormEvent = React.FormEvent<HTMLFormElement> & { target: HTMLFormElement & { email: HTMLInputElement, password: HTMLInputElement } }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const { email, password } = e.target
    console.log(email.value, password.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
        
      </form>
    </>
  )
}
