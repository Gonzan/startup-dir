import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";


const NavBar = async () => {
  const session = await auth()

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
    <nav className="flex justify-between items-center">
      <Link href="/"/>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={144}
          height={30}
          className="h-10 w-auto"
        />
        <div className="flex items-center gap-5">
        {session && session?.user ?(
          <div className="flex items-center gap-5">
            <Link href="/startup/create" className="text-gray-700 hover:text-gray-900">Create</Link>
             <form action={async () => {
              "use server"

              await signOut()
            }}>
            <button type="submit" className="text-gray-700 hover:text-gray-900">
              Sign Out
            </button>
            </form>
            

            <Link href={`/user/${session.user.id}`} className="text-gray-700 hover:text-gray-900">Profile</Link>
            
          </div>
        ):(
          <div className="flex items-center gap-5">
            <form action={async () => {
              "use server"

              await signIn("github")
            }}>
              <button type="submit" className="text-gray-700 hover:text-gray-900">
                Sign In
              </button>
            </form>
          </div>
        )
        }
        </div>
    </nav>
    </header>
  );
}

export default NavBar;