"use server";
import { getDb } from "@/db/drizzle";
import { AccessToken } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";
import { validateRecaptcha } from "./captcha";
import { sendTokenMail } from "./mail";
import { signIn, signOut } from "@/auth";

export const validateToken = async (token: string) => {
  const result = await getDb()
    .select()
    .from(AccessToken)
    .where(eq(AccessToken.token, token));

  if (!result.length || result[0].used) {
    return null;
  }

  await getDb()
    .update(AccessToken)
    .set({ used: true })
    .where(eq(AccessToken.token, token));

  return result[0];
};

export const generateAccessToken = async (
  emailPrefix: string,
  reCaptchaToken: string
) => {
  // Validate recaptcha
  if (!validateRecaptcha(reCaptchaToken)) {
    return redirect("/");
  }

  const email = `${emailPrefix}@st.klmfa.nl`;
  const token = randomBytes(3).toString("hex");

  await getDb().insert(AccessToken).values({ email, token });

  await sendTokenMail(token, email);
  redirect("/validate-token");
};

export const login = async (credentials: { token: string }) => {
  return signIn("credentials", credentials);
};

export const logout = async () => {
  await signOut();
};
