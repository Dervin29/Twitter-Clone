import React from "react";
import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiUser, BiMoney } from "react-icons/bi";
import FeedCard from "./components/FeedCard";
import { SlOptions } from "react-icons/sl";
import GoogleLoginButton from "./components/GoogleLoginButton"; 

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  { title: "Home", icon: <BiHomeCircle /> },
  { title: "Explore", icon: <BiHash /> },
  { title: "Notifications", icon: <BsBell /> },
  { title: "Messages", icon: <BsEnvelope /> },
  { title: "Bookmarks", icon: <BsBookmark /> },
  { title: "Twitter Blue", icon: <BiMoney /> },
  { title: "Profile", icon: <BiUser /> },
  { title: "More", icon: <SlOptions /> },
];

export default function Home() {

  // const handleGoogleLogin = useCallback((cred: CredentialResponse) => {
    
  // },[]);
  return (
    <div className="">
      <div className="grid grid-cols-12 h-screen w-screen px-20">
        <div className="col-span-3 pt-1 ml-28">
          <div className="text-3xl w-fit h-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="mt-4 text-lg pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-1"
                  key={item.title}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-35">
              <button className="bg-[#1d9bf0] text-lg font-semibold py-2 rounded-full w-full mt-5">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 h-screen border-r-[1px] border-l-[1px] border-gray-600 overflow-y-scroll no-scrollbar">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl">New to Twitter?</h1>
            <GoogleLoginButton /> 
          </div>
        </div>
      </div>
    </div>
  );
}
