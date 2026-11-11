"use client";

import { useState } from "react";
import {
  Plus,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomButton from "@/components/shared/custom-button";

interface AddStaffPayload {
  email: string;
  password: string;
  role: string;
}

interface TeamHeaderProps {
  onAddStaff?: (staff: AddStaffPayload) => Promise<void> | void;
}

const TeamHeader = ({ onAddStaff }: TeamHeaderProps) => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!role) {
      setError("Please select a staff role.");
      return;
    }

    try {
      setIsLoading(true);

      await onAddStaff?.({
        email,
        password,
        role,
      });

      setOpen(false);
      resetForm();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to add staff member. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Team Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight text-slate-800">
            Team Management
          </h1>

          <p className="text-xs text-slate-500">
            Monitor team workloads and distribute complaints efficiently.
          </p>
        </div>
        <CustomButton icon={<Plus />} title="Assign complaint" />
      </div>

      {/* Add Staff Dialog */}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) resetForm();
        }}
      >
        <DialogContent className="w-full max-w-5xl rounded-xl p-6">
          <DialogHeader className="space-y-3">
            <div className="space-y-1.5">
              <DialogTitle className="text-lg text-center font-semibold text-slate-800">
                Add a team member
              </DialogTitle>

              <DialogDescription className="text-xs leading-5 text-slate-500">
                Create a staff account by providing their email, login password
                and assigned role.
              </DialogDescription>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="staff-email" className="text-xs font-medium">
                Staff email address
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="staff-email"
                  type="email"
                  placeholder="staff@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 rounded-lg pl-10 text-xs"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="staff-role" className="text-xs font-medium">
                Staff role
              </Label>

              <Select
                value={role}
                onValueChange={(value) => {
                  if (value) setRole(value);
                }}
              >
                <SelectTrigger
                  id="staff-role"
                  className="h-10 rounded-lg text-xs w-full"
                >
                  <SelectValue placeholder="Select staff role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="COMPLAINT_OFFICER">
                    Complaint Officer
                  </SelectItem>

                  <SelectItem value="SENIOR_OFFICER">Senior Officer</SelectItem>

                  <SelectItem value="TEAM_LEAD">Team Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="staff-password" className="text-xs font-medium">
                Temporary password
              </Label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="staff-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter temporary password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 rounded-lg pl-10 pr-10 text-xs"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-xs font-medium">
                Confirm password
              </Label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm temporary password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10 rounded-lg pl-10 pr-10 text-xs"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </p>
            )}

            <DialogFooter className="gap-2 pt-3 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
                className="h-10 rounded-lg text-xs"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-10 rounded-lg bg-teal-600 text-xs font-semibold hover:bg-teal-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>Add staff member</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamHeader;
