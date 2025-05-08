"use client"

import type React from "react"

import Link from "next/link"
import { Activity, Users, Globe, DollarSign, User } from "lucide-react"
import { UserHeader } from "./user-header"

type MainLayoutProps = {
  children: React.ReactNode
  activeTab: "dashboard" | "referrals" | "surveys" | "withdraw" | "profile"
  user: any
}

export function MainLayout({ children, activeTab,user }: MainLayoutProps) {
  console.log(user)
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-sm">
      <UserHeader user={user} />
      <nav className="flex border-b">
        <NavItem
          href="/earning/dashboard"
          icon={<Activity size={20} />}
          label="Dashboard"
          isActive={activeTab === "dashboard"}
        />
        <NavItem href="/earning/referrals" icon={<Users size={20} />} label="Referrals" isActive={activeTab === "referrals"} />
        <NavItem href="/earning/surveys" icon={<Globe size={20} />} label="Surveys" isActive={activeTab === "surveys"} />
        <NavItem
          href="/earning/withdraw"
          icon={<DollarSign size={20} />}
          label="Withdraw"
          isActive={activeTab === "withdraw"}
        />
        <NavItem href="/earning/profile" icon={<User size={20} />} label="Profile" isActive={activeTab === "profile"} />
      </nav>
      <main>{children}</main>
    </div>
  )
}

type NavItemProps = {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex-1 flex flex-col items-center py-3 px-2 text-sm ${
        isActive ? "text-purple-600 font-medium" : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </Link>
  )
}
