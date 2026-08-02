import { z } from "zod";

export const addressSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name is required")
    .max(100, "Full name is too long"),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10 digit mobile number"),

  addressType: z.enum(["Home", "Office", "Other"]),

  addressLine1: z
    .string()
    .trim()
    .min(5, "Address Line 1 is required"),

  addressLine2: z
    .string()
    .optional(),

  landmark: z
    .string()
    .optional(),

  city: z
    .string()
    .trim()
    .min(2, "City is required"),

  state: z
    .string()
    .trim()
    .min(2, "State is required"),

  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be 6 digits"),

  country: z
    .string()
    .trim()
    .min(2)
    .default("India"),
});