import { toUpper } from "lodash";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export function UserHeader({user}:{user:any}) {
    return (
      <div className="flex border-b justify-between items-center">
        <Link href={"/"} title="Back" className="text-blue-500  ml-2">
            <MoveLeft  />
        </Link>
        <div className="flex justify-end p-4 ">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-full p-1">
            <div className="bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-sm">{toUpper(user.fullName.slice(0,1))}</span>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-medium">{user.fullName}</div>
            <div className="text-xs text-gray-500">{toUpper(user.role)}</div>
          </div>
        </div>
      </div>
      </div>
    )
  }
  