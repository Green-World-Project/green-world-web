import { useContext, useEffect, useState } from "react";
import FloatingDotsBackground from "../../shared/FloatingDotsBackground";
import { StoreContext } from "../../context/StoreContext";
import ProfilePictureUploader from "./ProfilePictureUploader";
import { MdClose, MdEdit } from "react-icons/md";
import { FormProvider, useForm } from "react-hook-form";
import { userDataTypes } from "../../interfaces/interfaces";
import axios, { AxiosError } from "axios";
import { authUrls } from "../../constants/END_POINTS";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ChangePass from "./ChangePass";

export default function Profile() {
  const { userData, setUserData, token } = useContext(StoreContext);

  const fadeDown = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  const methods = useForm<userDataTypes>({
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.firstName,
      age: userData?.age,
      gender: userData?.gender,
      email: userData?.email,
      phoneNumber: userData?.phoneNumber,
      currentPassword: "",
      newPassword: "",

      // …any other userDataTypes fields…
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
  } = methods;

  const [editingFields, setEditingFields] = useState<
    Partial<Record<keyof userDataTypes, boolean>>
  >({});

  const onSubmit = async (data: userDataTypes) => {
    if (!userData || !token) return;

    try {
      const {
        firstName,
        lastName,
        age,
        gender,
        email,
        phoneNumber,
        currentPassword,
        newPassword,
      } = data;

      const userInfoPayload = {
        firstName,
        lastName,
        age,
        gender,
        email,
        phoneNumber,
      };

      const shouldUpdatePassword = Boolean(currentPassword && newPassword);

      if (shouldUpdatePassword) {
        const passwordPayload = { currentPassword, newPassword };

        try {
          await axios.put(authUrls.editUserPass, passwordPayload, {
            headers: { Authorization: `Bearer ${token}` },
          });

          reset({
            currentPassword: "",
            newPassword: "",
          });
        } catch (passwordErr) {
          const axiosError = passwordErr as AxiosError<{ error: string }>;
          const message =
            axiosError.response?.data?.error || "Password update failed!";
          toast.error(message);
          throw new Error("Password validation failed");
        }
      }

      await axios.put(authUrls.editUserInfo, userInfoPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(userInfoPayload);

      setEditingFields({});

      toast.success("Your changes have been saved successfully!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (err) {
      // Check if this is our custom error from password validation
      if (
        err instanceof Error &&
        err.message === "Password validation failed"
      ) {
        return;
      }

      // Handle other errors (likely from user info update)
      const axiosError = err as AxiosError<{ error: string }>;
      const message =
        axiosError.response?.data?.error || "Something went wrong!";
      toast.error(message);
    }
  };

  useEffect(() => {
    if (userData) {
      reset(userData);
    }

    setEditingFields({});
  }, [userData, reset]);

  const handleEditClick = (field: keyof userDataTypes) => {
    setEditingFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleCancelClick = (field: keyof userDataTypes) => {
    setEditingFields((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div className="pt-[145px] pb-10 grid place-items-center relative min-h-screen bg-gradient-to-br from-green-200 to-green-50 overflow-hidden">
      <FloatingDotsBackground numberOfDots={40} />
      <motion.div
        variants={fadeDown}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
        className="bg-white shadow-2xl z-20 pt-10 pb-7 px-7 w-[55%] max-lg:w-[80%] max-sm:w-[90%] rounded-md"
      >
        <ProfilePictureUploader />
        <FormProvider {...methods}>
          <form
            autoComplete="off"
            className="flex flex-col mt-10 gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row gap-7 max-md:flex-col">
              <div className="flex flex-col gap-1 grow">
                <label className="font-medium" htmlFor="firstname">
                  First Name
                </label>
                <div className="relative flex items-center">
                  <input
                    id="firstname"
                    type="text"
                    readOnly={!editingFields.firstName}
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className={`
                    pl-2 pr-8 py-1 w-full rounded-sm shadow-sm outline-none
                    focus:ring-2 focus:ring-[#2ecc71] bg-[#E1F1F1] transition  duration-300 ease-in-out
                    ${
                      !editingFields.firstName
                        ? "cursor-not-allowed opacity-80"
                        : ""
                    }
                    ${errors.firstName ? "ring-2 ring-red-500" : ""}
                    ${
                      dirtyFields.firstName
                        ? "  focus:ring-2 focus:ring-yellow-500"
                        : ""
                    }
                  `}
                  />
                  {!editingFields.firstName ? (
                    <MdEdit
                      size={20}
                      fill="#2ecc71"
                      className="absolute right-2 cursor-pointer"
                      onClick={() => handleEditClick("firstName")}
                    />
                  ) : (
                    <MdClose
                      size={20}
                      fill="#e53e3e"
                      className="absolute right-2 cursor-pointer"
                      onClick={() => handleCancelClick("firstName")}
                    />
                  )}
                </div>
                {errors.firstName && (
                  <span className="text-red-600 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 grow">
                <label className="font-medium" htmlFor="lastname">
                  Last Name
                </label>
                <div className="relative flex items-center">
                  <input
                    id="lastname"
                    type="text"
                    readOnly={!editingFields.lastName}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className={`
                    pl-2 pr-8 py-1 w-full rounded-sm shadow-sm outline-none
                    focus:ring-2 focus:ring-[#2ecc71] bg-[#E1F1F1] transition  duration-300 ease-in-out
                    ${
                      !editingFields.lastName
                        ? "cursor-not-allowed opacity-80"
                        : ""
                    }
                    ${errors.lastName ? "ring-2 ring-red-500" : ""}
                    ${
                      dirtyFields.lastName
                        ? "  focus:ring-2 focus:ring-yellow-500"
                        : ""
                    }
                  `}
                  />
                  {!editingFields.lastName ? (
                    <MdEdit
                      size={20}
                      fill="#2ecc71"
                      className="absolute right-2 cursor-pointer"
                      onClick={() => handleEditClick("lastName")}
                    />
                  ) : (
                    <MdClose
                      size={20}
                      fill="#e53e3e"
                      className="absolute right-2 cursor-pointer"
                      onClick={() => handleCancelClick("lastName")}
                    />
                  )}
                </div>
                {errors.lastName && (
                  <span className="text-red-600 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-7 max-md:flex-col">
              <div className="flex flex-col gap-1 basis-1/2">
                <label className="font-medium" htmlFor="age">
                  Age
                </label>
                <div className="relative flex items-center">
                  <input
                    id="age"
                    type="number"
                    readOnly={!editingFields.age}
                    {...register("age", {
                      required: "Age is required",
                      min: { value: 16, message: "Minimum age is 16" },
                    })}
                    className={`
                    pl-2 pr-8 py-1 w-full rounded-sm shadow-sm outline-none
                    focus:ring-2 focus:ring-[#2ecc71] bg-[#E1F1F1] transition  duration-300 ease-in-out
                    ${!editingFields.age ? "cursor-not-allowed opacity-80" : ""}
                    ${errors.age ? "ring-2 ring-red-500" : ""}
                    ${
                      dirtyFields.age
                        ? "  focus:ring-2 focus:ring-yellow-500"
                        : ""
                    }
                  `}
                  />
                  {!editingFields.age ? (
                    <MdEdit
                      size={20}
                      fill="#2ecc71"
                      className="absolute right-2 cursor-pointer"
                      onClick={() => handleEditClick("age")}
                    />
                  ) : (
                    <MdClose
                      size={20}
                      fill="#e53e3e"
                      className="absolute right-2 cursor-pointer"
                      onClick={() => handleCancelClick("age")}
                    />
                  )}
                </div>
                {errors.age && (
                  <span className="text-red-600 text-sm">
                    {errors.age.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 basis-1/2">
                <label className="font-medium" htmlFor="gender">
                  Gender
                </label>
                <div className="relative flex items-center">
                  <select
                    className="py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full h-full focus:ring-2 
                 focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                    id="gender"
                    {...register("gender")}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-7 max-md:flex-col">
              <div className="flex flex-col gap-1 grow">
                <label className="font-medium" htmlFor="email">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    id="email"
                    type="text"
                    readOnly={!editingFields.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                    className={`
                    pl-2 pr-8 py-1 w-full rounded-sm shadow-sm outline-none
                    focus:ring-2 focus:ring-[#2ecc71] bg-[#E1F1F1] transition  duration-300 ease-in-out
                    ${
                      !editingFields.email
                        ? "cursor-not-allowed opacity-80"
                        : ""
                    }
                    ${errors.email ? "ring-2 ring-red-500" : ""}
                    ${
                      dirtyFields.email
                        ? "  focus:ring-2 focus:ring-yellow-500"
                        : ""
                    }
                  `}
                  />
                  {!editingFields.email ? (
                    <MdEdit
                      size={20}
                      fill="#2ecc71"
                      className="absolute right-2 cursor-pointer"
                      onClick={() => handleEditClick("email")}
                    />
                  ) : (
                    <MdClose
                      size={20}
                      fill="#e53e3e"
                      className="absolute right-2 cursor-pointer"
                      onClick={() => handleCancelClick("email")}
                    />
                  )}
                </div>
                {errors.email && (
                  <span className="text-red-600 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 grow">
                <label className="font-medium" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <input
                    id="phone"
                    type="tel"
                    readOnly={!editingFields.phoneNumber}
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                    })}
                    className={`
                    pl-2 pr-8 py-1 w-full rounded-sm shadow-sm outline-none
                    focus:ring-2 focus:ring-[#2ecc71] bg-[#E1F1F1] transition  duration-300 ease-in-out
                    ${
                      !editingFields.phoneNumber
                        ? "cursor-not-allowed opacity-80"
                        : ""
                    }
                    ${errors.phoneNumber ? "ring-2 ring-red-500" : ""}
                    ${
                      dirtyFields.phoneNumber
                        ? "  focus:ring-2 focus:ring-yellow-500"
                        : ""
                    }
                  `}
                  />
                  {!editingFields.phoneNumber ? (
                    <MdEdit
                      size={20}
                      fill="#2ecc71"
                      className="absolute right-2 cursor-pointer"
                      onClick={() => handleEditClick("phoneNumber")}
                    />
                  ) : (
                    <MdClose
                      size={20}
                      fill="#e53e3e"
                      className="absolute right-2 cursor-pointer"
                      onClick={() => handleCancelClick("phoneNumber")}
                    />
                  )}
                </div>
                {errors.phoneNumber && (
                  <span className="text-red-600 text-sm">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
            </div>
            <ChangePass />
            <div className="flex flex-row justify-between mt-3 gap-3 flex-wrap">
              <button
                type="button"
                className="py-[10px] px-7 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md shadow-md transition-all duration-200 ease-in-out"
                onClick={() => {
                  if (userData) {
                    reset({
                      ...userData,
                      currentPassword: "",
                      newPassword: "",
                    });
                  }
                  setEditingFields({});
                }}
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-[10px] px-7 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 "
              >
                {isSubmitting ? "Saving..." : "Submit Changes"}
              </button>
            </div>
          </form>
        </FormProvider>
      </motion.div>
    </div>
  );
}
