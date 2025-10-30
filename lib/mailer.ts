
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMeetupEmail({
  to,
  groupNames,
  cafe,
  date,
}: {
  to: string | string[]; // ✅ accept both string and string[]
  groupNames: string;
  cafe: { name: string; address: string };
  date: string;
}) {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
  });

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>☕ Your Coffee Meetup is Confirmed!</h2>
      <p>Hey ${groupNames},</p>
      <p>Your meetup is scheduled for <strong>${formattedDate}</strong>.</p>
      <p><strong>Café:</strong> ${cafe.name}</p>
      <p><strong>Address:</strong> ${cafe.address}</p>
      <p>Enjoy your coffee time and make new friends!</p>
      <p>— The Meetlyr Team ☕</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Meetlyr" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your Coffee Meetup Details ☕",
    html,
  });
}
