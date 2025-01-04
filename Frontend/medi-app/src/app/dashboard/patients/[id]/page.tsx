import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from 'next/image';

export default function SinglePatientPage() {
  return (
    <div className="flex gap-12 mt-6">
        <div className="flex-[2] p-5 bg-gray-100 rounded-lg font-bold text-gray-600 h-max">
            <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-3">
                <Image src="/noavater.png" alt="User Avatar" fill />
            </div>
            John Doe
        </div>

  <div className="flex-[5] p-8 bg-gray-100 rounded-lg">
    <form className="flex flex-col">
          <div>
            <Label htmlFor="username" className="text-xs mb-1">Username</Label>
            <Input id="username" type="text" name="username" placeholder="John Doe" className="p-5 border-2 border-gray-300 rounded bg-bgSoft text-gray-900 mb-2" />
          </div>

          <div>
            <Label htmlFor="email" className="text-xs mb-1">Email</Label>
            <Input id="email" type="email" name="email" placeholder="johndoe@gmail.com" className="p-5 border-2 border-gray-300 rounded bg-bgSoft text-gray-900 mb-2" />
          </div>

          <div>
            <Label htmlFor="password" className="text-xs mb-1">Password</Label>
            <Input id="password" type="text" name="password" className="p-5 border-2 border-gray-300 rounded bg-bgSoft text-gray-900 mb-2" />
          </div>

          <div>
            <Label htmlFor="phone" className="text-xs mb-1">Phone</Label>
            <Input id="phone" type="tel" name="phone" placeholder="+232229999229" className="p-5 border-2 border-gray-300 rounded bg-bgSoft text-gray-900 mb-2" />
          </div>

          <div>
            <Label htmlFor="address" className="text-xs mb-1">Address</Label>
            <Textarea id="address" name="address" placeholder="U.S.A" rows={3} className="p-5 border-2 border-gray-300 rounded bg-bgSoft text-gray-900 mb-2" />
          </div>

          <div>
            <Label htmlFor="isAdmin" className="text-xs mb-1">Is Admin?</Label>
            <Select name="isAdmin">
              <SelectTrigger id="isAdmin" className="w-full p-5 border-2 border-gray-300 rounded bg-bgSoft text-gray-900 mb-2">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="isActive" className="text-xs mb-1">Is Active?</Label>
            <Select name="isActive">
              <SelectTrigger id="isActive" className="w-full p-5 border-2 border-gray-300 rounded bg-bgSoft text-gray-900 mb-2">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full p-5 bg-teal-500 hover:bg-teal-600 text-white rounded mt-2">Update</Button>
        </form>
      </div>
    </div>
  );
}
