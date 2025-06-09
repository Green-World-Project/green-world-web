import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

function ChangePass() {
  const [currPasswordShow, setcurrPasswordShow] = useState(false);
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const { register } = useFormContext();

  return (
    <div className="flex flex-row gap-7 max-md:flex-col">
      {/* Current Password Field */}
      <div className="flex flex-col gap-1 grow">
        <label className="font-medium" htmlFor="yourPassword">
          Your Password
        </label>
        <div className="relative flex items-center">
          <input
            id="yourPassword"
            placeholder="••••••••"
            autoComplete="current-password"
            type={currPasswordShow ? "text" : "password"}
            {...register("currentPassword")}
            className={`
              pl-2 pr-8 py-1 w-full rounded-sm shadow-sm outline-none
              placeholder-gray-400 placeholder:text-base placeholder:font-normal
              focus:ring-2 focus:ring-[#2ecc71] bg-[#E1F1F1] transition duration-300 ease-in-out
            `}
          />
          {currPasswordShow ? (
            <button
              type="button"
              onClick={() => setcurrPasswordShow((prev) => !prev)}
              className="flex items-center gap-2 absolute right-2 cursor-pointer"
            >
              <IoEyeOff size={20} fill="#2ecc71" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setcurrPasswordShow((prev) => !prev)}
              className="flex items-center gap-2 absolute right-2 cursor-pointer"
            >
              <IoEye size={20} fill="#2ecc71" />
            </button>
          )}
        </div>
      </div>

      {/* New Password Field */}
      <div className="flex flex-col gap-1 grow">
        <label className="font-medium" htmlFor="newPassword">
          New Password
        </label>
        <div className="relative flex items-center">
          <input
            id="newPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            type={newPasswordShow ? "text" : "password"}
            {...register("newPassword")}
            className={`
              pl-2 pr-8 py-1 w-full rounded-sm shadow-sm outline-none
              placeholder-gray-400 placeholder:text-base placeholder:font-normal
              focus:ring-2 focus:ring-[#2ecc71] bg-[#E1F1F1] transition duration-300 ease-in-out
            `}
          />
          {newPasswordShow ? (
            <button
              type="button"
              onClick={() => setNewPasswordShow((prev) => !prev)}
              className="flex items-center gap-2 absolute right-2 cursor-pointer"
            >
              <IoEyeOff size={20} fill="#2ecc71" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setNewPasswordShow((prev) => !prev)}
              className="flex items-center gap-2 absolute right-2 cursor-pointer"
            >
              <IoEye size={20} fill="#2ecc71" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangePass;
