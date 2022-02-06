import Image from "next/image";
import {
    SearchIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import PlusCirleIcon from "@heroicons/react/outline/PlusCircleIcon";

function Header() {
    return (
        <div className='shadow-sm border-b bg-white top-0 z-50'>
            <div className="flex max-w-6xl justify-between mx-5 lg:mx-auto">
                {/* Left Logo */}
                <div className="relative hidden w-24 cursor-pointer lg:inline">
                    <Image
                        src="https://links.papareact.com/ocw"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="relative w-10 flex-shrink-0 cursor-pointer lg:hidden">
                    <Image
                        src="https://links.papareact.com/jjm"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>

                {/* Search Bar */}
                <div className='max-w-xs'>
                    <div className="relative mt-1 rounded-md p-3">
                        <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
                            <SearchIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="block w-full border-gray-300 bg-gray-50 pl-10 focus:border-black focus:ring-black sm:text-sm rounded-md"
                        />
                    </div>
                </div>

                {/* Right */}
                <div className='flex items-center justify-end space-x-4'>
                    <HomeIcon className='navBtn' />
                    <MenuIcon className='h-6 md:hidden cursor-pointer w-10' />

                    <div className='relative navBtn'>
                        <PaperAirplaneIcon className='navBtn rotate-45' />
                        <div className="absolute -top-1 -right-2 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white text-xs w-5 h-5">3</div>
                    </div>
                    <PlusCirleIcon className='navBtn' />
                    <UserGroupIcon className='navBtn' />
                    <HeartIcon className='navBtn' />

                    <img src='https://links.papareact.com/3ke' alt='profile picture' className='h-10  rounded-full cursor-pointer' />
                </div>
            </div>
        </div>
    );
}

export default Header;
