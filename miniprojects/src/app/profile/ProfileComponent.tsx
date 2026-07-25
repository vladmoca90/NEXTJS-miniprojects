"use client";
import "../styles/profile.css";
import { useContext } from "react";
import { ProfileContext } from "./profileContext/ProfileContext";

export default function ProfileComponent() {
  const profile = useContext(ProfileContext);

  if (!profile) {
    throw new Error(
      "ProfileComponent must be rendered inside ProfileContext.Provider"
    );
  }

  return (
    <div className="overflow-hidden">
      <table className="profile-table mt-4 w-full divide-y divide-gray-200 border border-gray-200 text-left">
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr>
            <th
              scope="row"
              className="w-1/3 bg-gray-50 px-4 py-3 font-medium text-gray-700"
            >
              Full name
            </th>
            <td className="px-4 py-3 text-gray-900">
              {profile.forename} {profile.surname}
            </td>
          </tr>

          <tr>
            <th
              scope="row"
              className="bg-gray-50 px-4 py-3 font-medium text-gray-700"
            >
              Age
            </th>
            <td className="px-4 py-3 text-gray-900">{profile.age}</td>
          </tr>

          <tr>
            <th
              scope="row"
              className="bg-gray-50 px-4 py-3 font-medium text-gray-700"
            >
              Nationality
            </th>
            <td className="px-4 py-3 text-gray-900">
              {profile.nationality}
            </td>
          </tr>

          <tr>
            <th
              scope="row"
              className="bg-gray-50 px-4 py-3 font-medium text-gray-700"
            >
              Occupation
            </th>
            <td className="px-4 py-3 text-gray-900">
              {profile.occupation}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}