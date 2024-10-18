"use client";
import RequestTokenForm from "@/components/auth/request-token-form";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function RequestTokenPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC!}
      useEnterprise={true}
    >
      <RequestTokenForm />
    </GoogleReCaptchaProvider>
  );
}
