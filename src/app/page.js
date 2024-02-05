import Link from 'next/link'
export default function Home() {
  return (
    <main className="">
      <h1 className='text-3xl my-5'>Home page</h1>
      <div className='flex flex-row gap-3'>
        <Link className='border-black hover:bg-neutral-300 border-2 px-3' href="/register">Register</Link>
        <Link className='border-black hover:bg-neutral-300 border-2 px-3' href="/signin">Sign In</Link>
        <Link className='border-black hover:bg-neutral-300 border-2 px-3' href="/dash">Dash</Link>
        <Link className='border-black hover:bg-neutral-300 border-2 px-3' href="/profile">Profile</Link>
      </div>
    </main>
  );
}
