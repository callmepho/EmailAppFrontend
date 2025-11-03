import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useLoginUser, useRegisterUser } from "@/query/useUserQueries";
import { SpinLoader } from "../ui/spinLoader";

const Login = () => {
  return (
    <div>
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your email and password below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create new account by entering a new email and password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;

const loginFormSchema = z.object({ email: z.email(), password: z.string() });

const signupFormSchema = z
  .object({
    email: z.email(),
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const LoginForm = () => {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useLoginUser();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    // GET login
    login(data, {
      onSuccess: (userToken) => {
        localStorage.setItem("token", userToken.token);
        navigate("/email");
      },
      onError: (e) => {
        form.setError("email", { message: e.message.split(":")[0] });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPending ? (
          <SpinLoader />
        ) : (
          <Button type="submit" className="flex">
            Login
          </Button>
        )}
      </form>
    </Form>
  );
};

const SignupForm = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegisterUser();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    // Post create new user
    register(data, {
      onSuccess: (userToken) => {
        localStorage.setItem("token", userToken.token);
        navigate("/email");
      },
      onError: (e) => {
        form.setError("email", { message: e.message.split(":")[0] });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPending ? (
          <SpinLoader />
        ) : (
          <Button type="submit" className="flex">
            Sign Up
          </Button>
        )}
      </form>
    </Form>
  );
};
