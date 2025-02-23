import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import * as z from "zod"; 
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// ✅ Updated Validation Schema (Only Email)
const formSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Password Reset Request Sent:", data);
    alert("A password reset link has been sent to your email.");
  };

  return (
    <div className="w-full px-8 py-6 flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold text-center">Forgot Password?</h2>
      <p className="text-sm text-center text-gray-400 mb-4">
        Enter your email, and we'll send you a reset link.
      </p>

      {/* ✅ Constrained Width */}
      <div className="w-full max-w-[25rem]"> 
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button className="w-full" type="submit">Reset Password</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
