"use server";

import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY!,
});

const sentFrom = new Sender("performance@danielkappelle.com", "Performance");

export const sendTokenMail = async (token: string, email: string) => {
  console.log(`Email: ${email}, token: ${token}`);
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const recipients = [new Recipient(email)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("[Performance] Access Token")
    .setHtml(
      `<p>Hi, you've requested an access token to use the Performance tool. Find your access token below.</p><p><strong>${token}</strong></p>`
    )
    .setText(
      `Hi, you've requested an access token to use the Performance tool. Find your access token here: ${token}`
    );

  await mailerSend.email.send(emailParams);
};
