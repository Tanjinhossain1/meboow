import React from 'react';
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import SpotifyIcon from "@mui/icons-material/Spoke";
import TiktokIcon from "@mui/icons-material/Spoke";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DiscordIcon from "@mui/icons-material/Spoke";
import PublicIcon from "@mui/icons-material/Public";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TelegramIcon from "@mui/icons-material/Telegram";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

export const categoriesProperName = [
  { name: "Everythings", icon: <AllInclusiveIcon /> },
  { name: "Instagram", icon: <InstagramIcon /> },
  { name: "Facebook", icon: <FacebookIcon /> },
  { name: "YouTube", icon: <YouTubeIcon /> },
  { name: "Twitter", icon: <TwitterIcon /> },
  { name: "Spotify", icon: <SpotifyIcon /> },
  { name: "TikTok", icon: <TiktokIcon /> },
  { name: "Telegram", icon: <TelegramIcon /> },
  { name: "Linkedin", icon: <LinkedInIcon /> },
  { name: "Discord", icon: <DiscordIcon /> },
  { name: "Website Traffic", icon: <PublicIcon /> },
  { name: "Others", icon: <MoreHorizIcon /> },
];
export default function CategoryButtons({ selectedCategory, onSelectCategory }: { selectedCategory: string; onSelectCategory: (category: string) => void; }) {

  return (
    <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {categoriesProperName.map((item) => (
        <button
          key={item.name}
          className={`p-1 rounded-lg shadow-md flex items-center justify-center ${
            selectedCategory === item.name ? 'bg-purple-600' : 'bg-gray-800'
          } text-white`}
          onClick={() => onSelectCategory(item.name)}
        >
          {item.icon}
          <p className="hidden md:inline text-sm ml-2">{item.name}</p>
        </button>
      ))}
    </div>
  );
}
