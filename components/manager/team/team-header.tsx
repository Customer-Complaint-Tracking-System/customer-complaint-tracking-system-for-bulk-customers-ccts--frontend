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
import { AssignComplaintsDialog } from "./assign-complaint-modal";

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
  const [isAssignOpen, setIsAssignOpen] = useState(false);
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
  const handleAssignment = (data: {
    complaintIds: string[];
    staffId: string;
    mode: "unassigned" | "redistribute";
  }) => {
    console.log("Assignment payload:", data);

    // Call your TanStack Query mutation here.
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
        <CustomButton
          onClick={() => setIsAssignOpen(true)}
          icon={<Plus />}
          title="Assign complaint"
        />
      </div>
      <AssignComplaintsDialog
        open={isAssignOpen}
        onOpenChange={setIsAssignOpen}
        onConfirmAssignment={handleAssignment}
      />
    </>
  );
};

export default TeamHeader;
