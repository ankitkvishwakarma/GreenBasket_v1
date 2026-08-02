import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import { loginAdmin } from "../../services/authApi";

const schema = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await loginAdmin(data);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      if (res.user.role !== "Admin") {
        toast.error("Access Denied");
        return;
      }

      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("admin", JSON.stringify(res.user));

      toast.success("Login Successful");

      navigate("/admin");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl rounded-3xl bg-white shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left */}

        <div className="hidden lg:flex bg-gradient-to-br from-green-600 to-green-500 text-white p-12 flex-col justify-center">

          <Leaf size={60} />

          <h1 className="text-5xl font-bold mt-8">
            GreenBasket
          </h1>

          <p className="mt-6 text-lg opacity-90">
            Welcome Back Admin
          </p>

        </div>

        {/* Right */}

        <div className="p-10 flex items-center">

          <div className="w-full">

            <h2 className="text-4xl font-bold">
              Login
            </h2>

            <p className="text-gray-500 mt-2 mb-8">
              Continue to Admin Dashboard
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >

              <div>

                <label>Email</label>

                <div className="relative mt-2">

                  <Mail
                    className="absolute left-4 top-4 text-gray-400"
                    size={20}
                  />

                  <input
                    {...register("email")}
                    placeholder="admin@gmail.com"
                    className="w-full rounded-xl border py-3.5 pl-12"
                  />

                </div>

                <p className="text-red-500 text-sm mt-1">
                  {errors.email?.message}
                </p>

              </div>

              <div>

                <label>Password</label>

                <div className="relative mt-2">

                  <Lock
                    className="absolute left-4 top-4 text-gray-400"
                    size={20}
                  />

                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="w-full rounded-xl border py-3.5 pl-12 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-4"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

                <p className="text-red-500 text-sm mt-1">
                  {errors.password?.message}
                </p>

              </div>

              <button
                disabled={loading}
                className="w-full rounded-xl bg-green-600 py-3.5 text-white font-semibold hover:bg-green-700 transition"
              >
                {loading ? "Signing In..." : "Login"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;