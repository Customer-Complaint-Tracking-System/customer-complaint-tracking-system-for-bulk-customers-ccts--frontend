"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Side } from "@base-ui/react/internals/useAnchorPositioning";
import { cn } from "cn";
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

type UserRole = "manager" | "complaint";

type UserProfileProps = {
  fullname: string;
  role: UserRole;
  image?: string | null;
  side: Side;
  sidebar?: boolean;
};

const UserProfile = ({ fullname, role, image, side,sidebar }: UserProfileProps) => {
  const router = useRouter();

  const initials = fullname
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();

  const formattedRole = role === "manager" ? "Manager" : "Complaint";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          role="button"
          tabIndex={0}
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.currentTarget.click();
            }
          }}
        >
          <Avatar className="size-10 shrink-0">
            <AvatarImage src={image || undefined} alt={fullname} />
            <AvatarFallback className="bg-brand-blue font-semibold text-white">
              {initials || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className={cn("truncate text-sm font-semibold", sidebar && "text-white")}>{fullname}</p>
            <p className="text-xs capitalize text-muted-foreground">
              {formattedRole}
            </p>
          </div>

          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side={side}
        sideOffset={8}
        className="w-60"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarImage src={image || undefined} alt={fullname} />
                <AvatarFallback className="bg-brand-blue text-sm font-semibold text-white">
                  {initials || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{fullname}</p>
                <p className="text-xs text-brand-text-gray">{formattedRole}</p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => router.push("/manager/profile")}>
          <UserRound className="mr-2 size-4" />
          My Profile
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => router.push("/manager/settings")}>
          <Settings className="mr-2 size-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onSelect={() => router.push("/login")}
        >
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
