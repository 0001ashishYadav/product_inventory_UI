import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  Clock,
  Package,
  TrendingUp,
  Star,
  Shield,
  Crown,
} from "lucide-react";
import { usersDataList } from "../data";

const User = () => {
  const [activeView, setActiveView] = useState("grid");
  const [selectedUser, setSelectedUser] = useState(null);

  const users = usersDataList;

  const getRoleBadgeColor = (role) => {
    const colors = {
      Admin: "bg-purple-100 text-purple-700 border-purple-200",
      Manager: "bg-blue-100 text-blue-700 border-blue-200",
      User: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[role] || colors.User;
  };

  const getRoleIcon = (role) => {
    if (role === "Admin") return Shield;
    if (role === "Manager") return Award;
    return UserCheck;
  };

  const getBadgeIcon = (badge) => {
    if (badge === "premium") return Crown;
    if (badge === "pro") return Star;
    return null;
  };

  const UserCardGrid = ({ user }) => {
    const [showMenu, setShowMenu] = useState(false);
    const RoleIcon = getRoleIcon(user.role);
    const BadgeIcon = getBadgeIcon(user.badge);

    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
        {/* Header with gradient */}
        <div
          className={`h-24 bg-linear-to-r ${
            user.role === "Admin"
              ? "from-purple-500 to-indigo-600"
              : user.role === "Manager"
              ? "from-blue-500 to-cyan-600"
              : "from-gray-400 to-gray-500"
          } relative`}
        >
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>

          {/* Badge */}
          {user.badge && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-1">
              {BadgeIcon && <BadgeIcon className="w-3 h-3 text-white" />}
              <span className="text-xs font-semibold text-white capitalize">
                {user.badge}
              </span>
            </div>
          )}

          {/* Menu */}
          <div className="absolute top-3 right-3">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all"
            >
              <MoreVertical className="w-4 h-4 text-white" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit User
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete User
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Avatar */}
        <div className="relative px-6 -mt-12 mb-4">
          <div className="relative inline-block">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-white"
            />
            <div
              className={`absolute bottom-1 right-1 w-5 h-5 ${
                user.status === "active" ? "bg-green-500" : "bg-gray-400"
              } rounded-full border-2 border-white`}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {user.name}
              </h3>
              <div
                className={`inline-flex items-center gap-1 px-2.5 py-1 ${getRoleBadgeColor(
                  user.role
                )} rounded-lg border text-xs font-semibold`}
              >
                <RoleIcon className="w-3 h-3" />
                {user.role}
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 shrink-0" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Joined {user.joinDate}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">
                {user.stats.entries}
              </div>
              <div className="text-xs text-gray-500">Entries</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">
                {user.stats.exits}
              </div>
              <div className="text-xs text-gray-500">Exits</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">
                {user.stats.products}
              </div>
              <div className="text-xs text-gray-500">Products</div>
            </div>
          </div>

          {/* Last Active */}
          <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Last active</span>
            </div>
            <span className="font-medium">{user.lastActive}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        {/* User Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCardGrid key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
