"use client";

import { generateAccessToken } from "@/actions/db/auth";
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
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function RequestTokenForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState("");

  const requestToken = async () => {
    try {
      if (!executeRecaptcha) {
        console.error("ReCAPTCHA not available");
        return;
      }

      const gRecaptchaToken = await executeRecaptcha("requestToken");
      await generateAccessToken(email, gRecaptchaToken);
    } catch (e) {
      console.error("Something went wrong");
      console.error(e);
    }
  };

  return (
    <Card className="w-1/3 mx-auto">
      <CardHeader>
        <CardTitle>Request access token</CardTitle>
        <CardDescription>
          An KLM FA email address is required to request an access token.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={requestToken}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="flex flex-row">
                <Input
                  id="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                  <span className="ms-2 leading-8">@st.klmfa.nl</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={requestToken}>Request token</Button>
      </CardFooter>
    </Card>
  );
}
