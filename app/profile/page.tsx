"use client";
import { useState, useEffect } from "react";

import { supabase } from "@/utils/supabaseClient";
import { Loading } from "@/app/components";
import { useToastContext } from "@/contexts/toastContext";

const MyProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { invokeToast } = useToastContext();

  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        if (error) {
          console.error("Error fetching user info:", error);
        } else {
          setEmail(userData.email || "");
          setFirstName(userData.first_name || "");
          setLastName(userData.last_name || "");
        }
      }
    };
    getUserInfo();
  }, []);

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("users")
        .update({ first_name: firstName, last_name: lastName })
        .eq("id", user?.id);

      if (error) {
        console.error("Error updating profile:", error);
      } else {
        invokeToast("success", "Profile updated successfully");
      }
    }
    setIsUpdating(false);
  };

  if (!email) {
    return (
      <div className="m-auto p-10 w-[60rem] bg-white flex justify-center items-center">
        <Loading size={10} color="primary" />
      </div>
    );
  }

  return (
    <div className="m-auto p-10 w-[30rem] bg-white">
      <h1 className="text-2xl font-bold mb-10 text-center">My Profile</h1>
      <div className="text-lg space-y-8">
        <div className="flex items-center gap-3">
          <div>
            <strong>First Name:</strong>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-2 border bg-gray-50 mt-1 rounded w-full"
            />
          </div>
          <div>
            <strong>Last Name:</strong>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-2 border bg-gray-50 mt-1 rounded w-full"
            />
          </div>
        </div>
        <div>
          <strong>Email:</strong>
          <div className="p-2 border bg-gray-50 mt-1 rounded">{email}</div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleUpdateProfile}
            className={`w-40 py-2 flex items-center justify-center h-12 bg-blue-500 text-white rounded ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? <Loading size={5} color="white" /> : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
