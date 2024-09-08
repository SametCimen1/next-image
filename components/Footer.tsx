import Image from "next/image";
import Link from "next/link";


export default function Footer(){
    return(
        <div className='mt-20 flex flex-col items-center gap-4 w-4/5 m-auto' >


<div className="mt-10 w-full">
        
        <footer className="rounded-lg  w-full">
            <div className="w-full mx-auto md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href='/' aria-label='sprout and scribble logo'>
                        <span className="cursor-pointer font-semibold text-[#2D2E32] dark:text-[#efefef] text-lg ">
                            Next-Image
                        </span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6  sm:mx-auto lg:my-8" />
                <span className=" text-sm text-gray-500 sm:text-center dark:text-gray-400 flex justify-center items-center">© 2024    &nbsp;<a href="https://sametcimen.com" className="hover:underline text-blue-400"> Samet</a>
                                        
                        
                            <span className="ml-2">built with</span>
                            <div className='flex flex-wrap items-center justify-center gap-4 ml-3'>
                                <Image 
                                  src = "/icons/ts.svg"
                                  width={25}
                                  height={25}
                                  alt="Typescript icon"
                                />
                                <Image 
                                  src = "/icons/vercel.svg"
                                  width={25}
                                  height={25}
                                  alt="Vercel icon"
                                />
                                <Image 
                                  src = "/icons/next.svg"
                                  width={25}
                                  height={25}
                                  alt="Nextjs icon"
                                />
                                <Image 
                                  src = "/icons/aws.svg"
                                  width={25}
                                  height={25}
                                  alt="AWS icon"
                                />
                                <Image 
                                  src = "/icons/psql.svg"
                                  width={25}
                                  height={25}
                                  alt="Postgresql icon"
                                />

                            </div>
                
                </span>
    
            </div>
        </footer>

    </div>
    
                        </div>
    )
}