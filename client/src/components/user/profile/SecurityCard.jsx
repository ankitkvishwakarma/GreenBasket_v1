import { motion } from "framer-motion";
import {
  ShieldCheck,
  BadgeCheck,
  CalendarDays,
  UserCog,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const SecurityCard = ({ user }) => {
  const securityItems = [
    {
      id: 1,
      title: "Email Verification",
      description: user?.email || "No email",
      value: user?.isVerified ? "Verified" : "Not Verified",
      icon: BadgeCheck,
      success: user?.isVerified,
    },
    {
      id: 2,
      title: "Account Status",
      description: "Current account status",
      value: user?.isActive !== false ? "Active" : "Inactive",
      icon: ShieldCheck,
      success: user?.isActive !== false,
    },
    {
      id: 3,
      title: "Role",
      description: "Current user role",
      value: user?.role || "Customer",
      icon: UserCog,
      success: true,
    },
    {
      id: 4,
      title: "Member Since",
      description: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : "-",
      value: "Registered",
      icon: CalendarDays,
      success: true,
    },
    {
      id: 5,
      title: "Last Updated",
      description: user?.updatedAt
        ? new Date(user.updatedAt).toLocaleDateString()
        : "-",
      value: "Latest",
      icon: Clock,
      success: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Security
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          Security & account information
        </p>
      </div>

      {/* Security Items */}
      <div className="space-y-3">
        {securityItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-none last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                  <Icon
                    size={18}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-900">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {item.success ? (
                  <>
                    <CheckCircle2
                      size={16}
                      className="text-green-600"
                    />

                    <span className="text-xs font-medium text-green-600">
                      {item.value}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle
                      size={16}
                      className="text-red-500"
                    />

                    <span className="text-xs font-medium text-red-500">
                      {item.value}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 rounded-xl bg-green-50 border border-green-100 p-3">
        <p className="text-xs text-green-700">
          <span className="font-semibold">
            Security Tip:
          </span>{" "}
          Use a strong password and update it regularly to
          keep your account secure.
        </p>
      </div>
    </motion.div>
  );
};

export default SecurityCard;