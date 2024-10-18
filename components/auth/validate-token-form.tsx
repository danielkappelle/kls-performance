"use client";

import { login } from "@/actions/db/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RequestTokenForm() {
  const [token, setToken] = useState("");
  const router = useRouter();

  const validateToken = async () => {
    try {
      await login({ token });
      router.push("/");
    } catch (e) {
      console.error(e);
      console.error("Something went wrong");
    }
  };

  return (
    <Card className="w-1/3 mx-auto">
      <CardHeader>
        <CardTitle>Validate access token</CardTitle>
        <CardDescription>
          If your email address is valid, you should have received an access
          token. It is possible the email landed in your spam folder, double
          check there and mark it as not spam.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={validateToken}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="token">Token</Label>
              <Input
                id="token"
                placeholder="Your email"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={validateToken}>Validate token</Button>
      </CardFooter>
    </Card>
  );
}
