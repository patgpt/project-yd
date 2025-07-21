import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  try {
    const { email } = await readBody(event);

    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email is required",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID || "",
      unsubscribed: false,
    });

    if (error) {
      console.error({ error });
      throw createError({
        statusCode: 500,
        statusMessage: "Error adding contact to Resend",
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "An error occurred",
    };
  }
});
