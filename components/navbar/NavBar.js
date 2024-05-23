import { useRouter } from "next/router";
import { useState } from "react";


function NavBar() {

  const router = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex md:mb-0 mb-4 py-8 justify-center bg-secondary w-full">
      <nav className="">
        <section className="flex lg:hidden items-center">
          <div
            className="space-y-2 absolute left-[10px]"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-6 animate-pulse bg-black-500"></span>
            <span className="block h-0.5 w-6 animate-pulse bg-black-500"></span>
            <span className="block h-0.5 w-6 animate-pulse bg-black-500"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-4 right-4 "
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-6 w-6 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col p-4 w-full min-h-[250px] gap-y-4 mt-14">
              <li className="text-center text-xl font-semibold mb-2">Menu</li>
              <li className="pl-4">
                <button
                  className="text-left block text-lg font-medium text-gray-800  focus:outline-none"
                  onClick={() => {
                    router.push('/')
                    setIsNavOpen(false)
                  }}
                >
                  Products
                </button>
              </li>
              <li className="pl-4">
                <button
                  className="text-left block text-lg font-medium text-gray-800 focus:outline-none"
                  onClick={() => {
                    router.push('/dashboard')
                    setIsNavOpen(false)
                  }}
                >
                  Dashboard
                </button>
              </li>
            </ul>
          </div>
        </section>

        <ul className="hidden space-x-8 lg:flex ">
          <li
          >
            <button
              onClick={() => router.push('/')}
            >
              Products

            </button>
          </li>
          <li
          >
            <button
              onClick={() => router.push('/dashboard')}
            >
              Dashboard
            </button>
          </li>
        </ul>
      </nav>

    </div>
  )
}

export default NavBar