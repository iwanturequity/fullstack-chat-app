import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Shield, Calendar, Check } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-base-100 to-base-200 pb-12">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl shadow-xl border border-base-300 overflow-hidden">
          {/* Header section with decorative background */}
          <div className="relative bg-gradient-to-r from-primary/20 to-secondary/20 p-8 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-repeat" 
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Profile
              </h1>
              <p className="mt-2 text-base-content/70">Manage your personal information</p>
            </div>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4 mt-4 px-6 py-8">
            <div className="relative">
              <div className="size-36 rounded-full overflow-hidden border-4 border-base-200 shadow-lg">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-full object-cover"
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-primary hover:bg-primary-focus
                  p-3 rounded-full cursor-pointer 
                  shadow-lg hover:shadow-xl hover:scale-105
                  transition-all duration-300
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-primary-content" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/60">
              {isUpdatingProfile ? 
                <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></span> Uploading...</span> : 
                "Click the camera icon to update your photo max size 10kb "}
            </p>
          </div>

          {/* User information section */}
          <div className="space-y-6 px-8 pb-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary/70" />
                  Full Name
                </div>
                <div className="px-4 py-3 bg-base-200/50 rounded-xl border border-base-300 shadow-inner">
                  {authUser?.fullName}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary/70" />
                  Email Address
                </div>
                <div className="px-4 py-3 bg-base-200/50 rounded-xl border border-base-300 shadow-inner">
                  {authUser?.email}
                </div>
              </div>
            </div>

            {/* Account information card */}
            <div className="mt-8 bg-base-200/30 rounded-xl p-6 border border-base-300">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary/70" />
                Account Information
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-3 border-b border-base-300">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-base-content/60" />
                    Member Since
                  </span>
                  <span className="font-medium px-3 py-1 bg-base-200/50 rounded-lg">
                    {authUser.createdAt?.split("T")[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-base-content/60" />
                    Account Status
                  </span>
                  <span className="font-medium px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;