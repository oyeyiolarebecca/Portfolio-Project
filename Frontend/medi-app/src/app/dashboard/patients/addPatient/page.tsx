import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function AddPatient() {
  return (
    <div className="container bg-[var(--bgSoft)] p-5 rounded-lg mt-5">
      <form className="form flex flex-wrap justify-between gap-y-4">
        <div className="w-[45%]">
          <Label htmlFor="username" className="block text-sm font-medium mb-1">Patient Name</Label>
          <Input
            id="username"
            type="text"
            placeholder="Patient name"
            name="username"
            required
            className="p-3 bg-[var(--bgSoft)] text-[var(--text)] border border-[#d3d3d3] rounded"
          />
        </div>

        <div className="w-[45%]">
          <Label htmlFor="email" className="block text-sm font-medium mb-1">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            className="p-3 bg-[var(--bgSoft)] text-[var(--text)] border border-[#d3d3d3] rounded"
          />
        </div>

        <div className="w-[45%]">
          <Label htmlFor="password" className="block text-sm font-medium mb-1">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            className="p-3 bg-[var(--bgSoft)] text-[var(--text)] border border-[#d3d3d3] rounded"
          />
        </div>

        <div className="w-[45%]">
          <Label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Phone"
            name="phone"
            className="p-3 bg-[var(--bgSoft)] text-[var(--text)] border border-[#d3d3d3] rounded"
          />
        </div>

        <div className="w-[45%]">
          <Label htmlFor="isAdmin" className="block text-sm font-medium mb-1">Is Admin?</Label>
          <Select name="isAdmin">
            <SelectTrigger id="isAdmin" className="w-full p-3 bg-[var(--bgSoft)] text-[var(--text)] border border-[#d3d3d3] rounded">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[45%]">
          <Label htmlFor="isActive" className="block text-sm font-medium mb-1">Is Active?</Label>
          <Select name="isActive">
            <SelectTrigger id="isActive" className="w-full p-3 bg-[var(--bgSoft)] text-[var(--text)] border border-[#d3d3d3] rounded">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Label htmlFor="desc" className="block text-sm font-medium mb-1">Address</Label>
          <Textarea
            id="desc"
            name="desc"
            placeholder="Address"
            rows={4}
            className="p-3 bg-[var(--bgSoft)] text-[var(--text)] border border-[#d3d3d3] rounded w-full"
          />
        </div>

        <div className="w-full">
          <Button type="submit" className="btn bg-teal-500 hover:bg-teal-600 text-white w-full p-5 rounded cursor-pointer">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
