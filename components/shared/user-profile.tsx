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
import useProfileHook from "@/hooks/use-profile.hook";
import { supabase } from "@/lib/supabase/supabase";
import { formatStaffRole } from "@/lib/utils";
import { Side } from "@base-ui/react/internals/useAnchorPositioning";
import { cn } from "cn";
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

type UserProfileProps = {
  image?: string | null;
  side: Side;
  sidebar?: boolean;
};

const UserProfile = ({ image, side, sidebar }: UserProfileProps) => {
  const router = useRouter();
  const { data, isPending } = useProfileHook();

  if (isPending || !data) {
    return null;
  }

  const initials = data.data.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();

  const role = formatStaffRole(data.data.role);
  const fullname = data.data.name;

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      console.log("Successfully signed out");

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Unexpected logout error:", error);
    }
  };

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
            <AvatarFallback className="bg-[#142B4A] font-semibold text-white">
              {initials || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "truncate text-sm font-semibold",
                sidebar && "text-white",
              )}
            >
              {fullname}
            </p>
            <p className="text-xs capitalize text-muted-foreground">{role}</p>
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
                <AvatarFallback className="bg-[#142B4A] text-sm font-semibold text-white">
                  {initials || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{fullname}</p>
                <p className="text-xs text-brand-text-gray">{role}</p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled
          onClick={() => router.push("/manager/profile")}
        >
          <UserRound className="mr-2 size-4" />
          My Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled
          onClick={() => router.push("/manager/settings")}
        >
          <Settings className="mr-2 size-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
