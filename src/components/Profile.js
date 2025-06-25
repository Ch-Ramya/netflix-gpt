import { useSelector } from "react-redux";
import { LANGUAGE_OPTIONS } from "../utils/constants";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const rawUserName =
    user?.displayName || (user?.email ? user.email.split("@")[0] : "N/A");
  const userName =
    rawUserName !== "N?A"
      ? rawUserName.charAt(0).toUpperCase() + rawUserName.slice(1)
      : rawUserName;

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">My Profile</h1>

      {/* Box 1 - User Info */}
      <div className="w-full max-w-2xl mx-auto bg-zinc-900 rounded-lg p-6 mb-6 shadow-md">
        <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">
          User Information
        </h2>
        <div className="flex items-center gap-4">
          <img
            src={
              user?.photoURL ||
              "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            }
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p>
              <strong>Name:</strong> {userName}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Box 2 - Language Preferences */}
      <div className="w-full max-w-2xl mx-auto bg-zinc-900 rounded-lg p-6 mb-6 shadow-md">
        <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">
          Language Preferences
        </h2>
        <div className="flex items-center gap-4">
          <label htmlFor="language" className="font-semibold">
            Language:
          </label>
          <select
            id="language"
            className="bg-zinc-800 text-white border border-zinc-600 px-4 py-2 rounded"
            defaultValue="en"
          >
            {LANGUAGE_OPTIONS.map(({ key, label }) => (
              <option key={key} value={key} className="text-black">
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Box 3 - Subscription Info */}
      <div className="w-full max-w-2xl mx-auto bg-zinc-900 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">
          Subscription Info
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Plan: Premium (4K + HDR)</li>
          <li>Price: ₹1649/year</li>
          <li>Next Billing Date: July 25, 2026</li>
          <li>Status: Active</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
