"use server";

export const validateRecaptcha = async (token: string) => {
  const secret = process.env.RECAPTCHA_SECRET!;

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: "POST",
    }
  );

  if (response.ok) {
    const result = await response.json();
    return result.success && result.action === "requestToken";
  } else {
    return false;
  }
};
