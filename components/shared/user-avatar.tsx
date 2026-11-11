import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  fullname?: string;
  image?: string | null;
  className?: string;
};

const UserAvatar = ({ fullname, image, className }: UserAvatarProps) => {
  const initials =
    fullname
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((name) => name.charAt(0).toUpperCase())
      .join("") || "U";

  return (
    <Avatar className={cn("size-10 shrink-0", className)}>
      <AvatarImage src={image || undefined} alt={fullname || "User"} />

      <AvatarFallback className="bg-[#142B4A] font-semibold text-white">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
