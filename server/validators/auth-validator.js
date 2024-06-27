const { z } = require("zod");

const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(255, { message: "Name must be at most 255 characters" }),

    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Email must be a valid email address" })
        .trim()
        .max(255, { message: "Email must be at most 255 characters" }),

    phone: z
        .string({ required_error: "Phone number is required" })
        .trim()
        .min(10, { message: "Phone number must be at least 10 characters" })
        .max(255, { message: "Phone number must be at most 255 characters" }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(255, { message: "Password must be at most 255 characters" }),
});

module.exports = signupSchema;
