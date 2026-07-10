
"use client"

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, ChevronDown, Eye, EyeOff, UploadCloud, Info } from "lucide-react";
import DateIcon from "../_assets/DateIcon";
import ActiveBtn from "../_assets/ActiveBtn";
import InactiveBtn from "../_assets/InactiveBtn";
import NoteIcon from "../_assets/NoteIcon";
import CreateIcon from "../_assets/createIcon";
import DeleteIcon from "../_assets/DeleteIcon";
import CheckedIcon from "../_assets/checkedIcon";
import EraseCheckedIcon from "../_assets/EraseCheckedIcon";

// ── Custom Checkbox Component ──────
interface CustomCheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function CustomCheckbox({ id, checked, onCheckedChange }: CustomCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={() => onCheckedChange(!checked)}
      className="shrink-0 w-[19px] h-[19px] focus:outline-none rounded transition-all active:scale-95"
    >
      {checked ? (
        <CheckedIcon/>
      ) : (
        <EraseCheckedIcon/>
      )}
    </button>
  );
}

// ── Custom Status Switch Component ──────
interface StatusSwitchProps {
  active: boolean;
  onChange: (active: boolean) => void;
}

function StatusSwitch({ active, onChange }: StatusSwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className="focus:outline-none cursor-pointer transition-all active:scale-95"
    >
      {active ? (
        <ActiveBtn/>
      ) : (
        <InactiveBtn/>
      )}
    </button>
  );
}

interface AddNewUserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddNewUserForm({ isOpen, onClose }: AddNewUserFormProps) {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    email: "",
    employeeId: "",
  });

  const [accountInfo, setAccountInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    isActive: false,
    reason: "",
  });

  const [roleAccess, setRoleAccess] = useState({
    role: "",
    department: "",
    position: "",
    assignState: "",
    assignDistrict: "",
  });

  const [contentInclude, setContentInclude] = useState({
    userManagement: false,
    rolePermission: false,
    candidateAccess: false,
    documentsAccess: false,
    reportsAccess: false,
    gisAccess: false,
    scenarioSimulator: false,
    systemSettings: false,
  });

  const [additionalInfo, setAdditionalInfo] = useState({
    workLocation: "",
    reportingManager: "",
    notes: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const handleClearPhoto = () => {
    setProfilePhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("=== SUBMITTED COMPLETED FORM DATA ===");
    console.log(JSON.stringify({
      personalInformation: personalInfo,
      accountInformation: accountInfo,
      roleAccessDetails: roleAccess,
      contentPermissions: contentInclude,
      additionalInformation: additionalInfo,
      profilePhotoAsset: profilePhoto ? "Uploaded Blob Asset" : "Empty"
    }, null, 2));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(openState) => { if (!openState) onClose(); }}>
      <DialogContent
        style={{ maxWidth: "1024px", width: "calc(100vw - 32px)" }}
        className="p-0 overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-2xl max-h-[92vh] flex flex-col [&>button]:hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-6 pb-2">
          <div>
            <DialogTitle className="font-creato text-3xl font-medium leading-8.5 tracking-(--tracking-body) text-(--b1)">
              Add New User
            </DialogTitle>
            <p className="font-creato mt-1 text-base font-normal leading-5 text-(--b1) tracking-(--tracking-body)">
              Enter user details and assign role, permissions and access
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 cursor-pointer rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto  px-8 pb-6 flex flex-col gap-6">
          
          {/* ── ROW 1 ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Personal Info */}
            <div className="border border-[#DDDDDB] rounded-md p-4 flex flex-col gap-4">
              <h3 className="font-creato text-base font-medium leading-5 tracking-(--tracking-body) text-(--b1)">Personal Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Full Name <span className="text-red-500">*</span></Label>
                  <input
                    type="text"
                    required
                    placeholder="Jhon Doe"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                    className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) focus:outline-none focus:border-[#397968]"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Select Date of Birth <span className="text-red-500">*</span></Label>
                  <div className="relative group">
                    <input
                      type="date"
                      required
                      value={personalInfo.dob}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                      className="w-full h-10 border border-[#DDDDDB] rounded pl-3 pr-10 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) focus:outline-none focus:border-[#397968] bg-white cursor-pointer select-none
                        [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#5C5C5F]">
                      <DateIcon/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Male <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <select
                      required
                      value={personalInfo.gender}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                      className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) appearance-none bg-white focus:outline-none focus:border-[#397968]"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Phone Number <span className="text-red-500">*</span></Label>
                  <input
                    type="tel"
                    required
                    placeholder="+60 12-34506789"
                    value={personalInfo.phoneNumber}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
                    className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body)focus:outline-none focus:border-[#397968]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Email Address <span className="text-red-500">*</span></Label>
                  <input
                    type="email"
                    required
                    placeholder="jhon.doe@gmail.com"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) focus:outline-none focus:border-[#397968]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Employee ID <span className="text-gray-400">(optional)</span></Label>
                  <input
                    type="text"
                    placeholder="EMP-1001"
                    value={personalInfo.employeeId}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, employeeId: e.target.value })}
                    className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) focus:outline-none focus:border-[#397968]"
                  />
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="border border-[#DDDDDB] rounded-md p-4 flex flex-col gap-4 justify-between">
              <div className="flex flex-col gap-4">
                <h3 className="font-creato text-base font-medium leading-5 tracking-(--tracking-body) text-(--b1)">Account Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Username <span className="text-red-500">*</span></Label>
                    <input
                      type="text"
                      required
                      placeholder="Select Party"
                      value={accountInfo.username}
                      onChange={(e) => setAccountInfo({ ...accountInfo, username: e.target.value })}
                      className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body)focus:outline-none focus:border-[#397968]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Password <span className="text-red-500">*</span></Label>
                      <Info className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Select Position"
                        value={accountInfo.password}
                        onChange={(e) => setAccountInfo({ ...accountInfo, password: e.target.value })}
                        className="w-full h-10 border border-[#DDDDDB] rounded px-3 pr-10 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) focus:outline-none focus:border-[#397968]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Confirm Password <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        placeholder="Select State"
                        value={accountInfo.confirmPassword}
                        onChange={(e) => setAccountInfo({ ...accountInfo, confirmPassword: e.target.value })}
                        className="w-full h-10 border border-[#DDDDDB] rounded px-3 pr-10 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) focus:outline-none focus:border-[#397968]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/*  active status*/}
                  <div className="flex flex-col justify-end pb-1.5">
                    <span className="text-xs font-medium text-[#5C5C5F] mb-1">Account Status</span>
                    <div className="flex items-center gap-3 h-10">
                      <StatusSwitch
                        active={accountInfo.isActive}
                        onChange={(val) => setAccountInfo({ ...accountInfo, isActive: val })}
                      />
                      <span className="text-sm font-normal text-[#5C5C5F]">
                        {accountInfo.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2 mt-1">
                    <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Reason <span className="text-gray-400">(optional)</span></Label>
                    <input
                      type="text"
                      placeholder="You are break our rules and policy."
                      value={accountInfo.reason}
                      onChange={(e) => setAccountInfo({ ...accountInfo, reason: e.target.value })}
                      className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) focus:outline-none focus:border-[#397968]"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── ROW 2: Photo Layout & Role Access ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Profile Photo Layout Card */}
            <div className="lg:col-span-4 border border-[#DDDDDB] rounded-md p-4 flex flex-col gap-4">
              <h3 className="font-creato text-base font-medium leading-5 tracking-(--tracking-body) text-(--b1)">Profile Photo</h3>
              
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handlePhotoUpload}
              />

              {profilePhoto ? (
                <div className="flex flex-col gap-4 w-full">
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img src={profilePhoto} alt="Uploaded Profile Asset" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex gap-3 w-full">
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 cursor-pointer h-11 bg-[#22493E] hover:bg-[#142A24] tracking-(--tracking-body) text-white font-creato text-sm font-normal rounded transition-colors"
                    >
                      Change Photo
                    </Button>
                    <button
                      type="button"
                      onClick={handleClearPhoto}
                      className="cursor-pointer w-11 h-11 border border-[#E2E8F0] rounded-lg flex items-center justify-center bg-white hover:bg-red-50 transition-colors"
                      title="Delete Photo"
                    >
                      <DeleteIcon/>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-square border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50 flex flex-col items-center justify-center text-center">
                  <UploadCloud className="w-8 h-8 text-[#397968] mb-2" />
                  <p className="text-sm text-gray-700 font-medium">Drag & Drop your file here</p>
                  <span className="text-xs text-gray-400 my-1">Or</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer bg-(--cc) text-(--b1) font-normal text-base px-4 py-1.5 rounded hover:bg-[#bada76]"
                  >
                    Upload Photo
                  </button>
                  <span className="font-creato text-xs text-(--c5) tracking-(tracking-body) leading-4 mt-2">PNG only. <br/>Max size: 2MB</span>
                </div>
              )}
            </div>

            {/* Role Access */}
            <div className="lg:col-span-8 border border-[#DDDDDB] rounded-md p-4 flex flex-col gap-4">
              <h3 className="font-creato text-base font-medium leading-5 tracking-(--tracking-body) text-(--b1)">Role Access</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Role Access <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <select
                      required
                      value={roleAccess.role}
                      onChange={(e) => setRoleAccess({ ...roleAccess, role: e.target.value })}
                      className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs leading-4 text-(--c5) appearance-none bg-white focus:outline-none focus:border-[#397968]"
                    >
                      <option value="">Select Role</option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Department <span className="text-red-500">*</span></Label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Department"
                    value={roleAccess.department}
                    onChange={(e) => setRoleAccess({ ...roleAccess, department: e.target.value })}
                    className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) focus:outline-none focus:border-[#397968]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Position <span className="text-red-500">*</span></Label>
                <input
                  type="text"
                  required
                  placeholder="Enter Position"
                  value={roleAccess.position}
                  onChange={(e) => setRoleAccess({ ...roleAccess, position: e.target.value })}
                  className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) focus:outline-none focus:border-[#397968]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Assign State <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <select
                      required
                      value={roleAccess.assignState}
                      onChange={(e) => setRoleAccess({ ...roleAccess, assignState: e.target.value })}
                      className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) appearance-none bg-white focus:outline-none focus:border-[#397968]"
                    >
                      <option value="">Select State</option>
                      <option value="Johor">Johor</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Assign District <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <select
                      required
                      value={roleAccess.assignDistrict}
                      onChange={(e) => setRoleAccess({ ...roleAccess, assignDistrict: e.target.value })}
                      className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) appearance-none bg-white focus:outline-none focus:border-[#397968]"
                    >
                      <option value="">Select Districts</option>
                      <option value="All Districts">All Districts</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="bg-[#EBF2F0] border border-(--DDDDDB) rounded px-4 py-2.5 flex items-center gap-2 mt-1">
                <span>
                  <NoteIcon/>
                </span>
                <p className="text-xs text-(--c5) tracking-(--tracking-body)">
                  User will have access data and features based on the selected role and region.
                </p>
              </div>
            </div>

          </div>

          {/* ── ROW 3: Content Permissions Matrix ── */}
          <div className="border border-[#DDDDDB] rounded-md p-4 flex flex-col gap-4">
            <h3 className="font-creato text-base font-medium leading-5 tracking-(--tracking-body) text-(--b1)">Select Content to Include</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-3">
              {[
                { id: "userManagement", label: "User Management", desc: "Create, edit and manage users" },
                { id: "rolePermission", label: "Role & Permission", desc: "Manage roles and permissions" },
                { id: "candidateAccess", label: "Candidate Access", desc: "View and manage candidates" },
                { id: "documentsAccess", label: "Documents Access", desc: "Upload and manage documents" },
                { id: "reportsAccess", label: "Reports Access", desc: "View and export reports" },
                { id: "gisAccess", label: "GIS Access", desc: "Access GIS maps and analytics" },
                { id: "scenarioSimulator", label: "Scenario Simulator", desc: "Access scenario simulator" },
                { id: "systemSettings", label: "System Settings", desc: "Manage system settings" },
              ].map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <CustomCheckbox
                    id={item.id}
                    checked={contentInclude[item.id as keyof typeof contentInclude]}
                    onCheckedChange={(val) => setContentInclude({ ...contentInclude, [item.id]: val })}
                  />
                  <div className="flex flex-col gap-0.5">
                    <Label htmlFor={item.id} className="text-xs font-medium text-(--b1) font-creato text-sm font-normal tracking-(--tracking-body) cursor-pointer">{item.label}</Label>
                    <span className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body) leading-4">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── ROW 4: Additional Panel ── */}
          <div className="border border-[#DDDDDB] rounded-md p-4 flex flex-col gap-4">
            <h3 className="font-creato text-base font-medium leading-5 tracking-(--tracking-body) text-(--b1)">Additional Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Work Location</Label>
                <input
                  type="text"
                  placeholder="Enter Work Location"
                  value={additionalInfo.workLocation}
                  onChange={(e) => setAdditionalInfo({ ...additionalInfo, workLocation: e.target.value })}
                  className="w-full h-10 border border-[#DDDDDB] rounded px-3 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) focus:outline-none focus:border-[#397968]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Reporting Manager</Label>
                <div className="relative">
                  <select
                    value={additionalInfo.reportingManager}
                    onChange={(e) => setAdditionalInfo({ ...additionalInfo, reportingManager: e.target.value })}
                    className="w-full h-10 border border-[#DDDDDB] font-creato rounded px-3 text-xs appearance-none text-(--c5) bg-white focus:outline-none focus:border-[#397968]"
                  >
                    <option value="">Select Reporting Manager</option>
                    <option value="Jame Smith">Jame Smith</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-creato text-xs font-normal text-(--c5) tracking-(--tracking-body)">Notes</Label>
              <Textarea
                placeholder="Enter any additional notes..."
                value={additionalInfo.notes}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, notes: e.target.value })}
                className="w-full min-h-[80px] resize-none border border-[#DDDDDB] focus:border-[#397968] focus-visible:ring-0 font-creato text-xs text-(--c5) leading-3 tracking-(--tracking-body) rounded p-3"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto px-6 h-10 font-creato text-(--b1) text-base font-normal leading-5 tracking-(--tracking-body) rounded border border-(--DDDDDB) cursor-pointer hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto px-6 h-10 bg-[#22493E] font-creato tracking-(--tracking-body) cursor-pointer hover:bg-[#163028] text-white text-base font-normal rounded transition-colors"
            >
              <span>
                <CreateIcon/>
              </span>
              Create User
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}
