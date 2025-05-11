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
import { useDispatch } from "react-redux";
import { register } from "@/State/Auth/Action";
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    fullName: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  

const SignupForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange", 
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleFormSubmit = form.handleSubmit(
    (data) => {
      // console.log("✅ Form submitted!");
      console.log("Signup Data:", data);
      dispatch(register(data));
      navigate("/");
    },
    (errors) => {
      console.log("Validation errors:", errors);
    }
  );
  
  
  return (
    <div className="px-10 py-2 w-full ">
      <h1 className="text-xl text-center font-bold mb-4">Create New Account</h1>
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={fieldState.error ? "text-red-500" : ""}>
                  Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={fieldState.error ? "text-red-500" : ""}>
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={fieldState.error ? "text-red-500" : ""}>
                  Password
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Submit Button */}
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
}  

export default SignupForm;
