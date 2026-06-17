"use client";

import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { sendLead } from "../_lib/leads-actions";

function FooterCTA() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(data) {
    const formData = new FormData(formRef.current);

    startTransition(async () => {
      const response = await sendLead(formData);
      if (!response.success) console.error(response.error);
      if (response?.success) {
        reset();
      }
    });
  }
  return (
    <div className="footer-cta">
      <h4>
        Curious about the magic we can create? <br /> Let’s bring your vision to
        life
      </h4>

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="no-margin"
      >
        <input
          type="text"
          name="name"
          id=""
          placeholder="Your Name"
          {...register("name", { required: "Name is required" })}
        />

        <input
          type="email"
          name="email"
          id=""
          placeholder="Your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email",
            },
          })}
        />

        <input
          type="text"
          name="phone"
          id=""
          placeholder="Your phone number"
          {...register("phone", { required: "Phone number is required" })}
        />

        <textarea
          name="message"
          id=""
          placeholder="Your Masterpiece Starts Here"
          {...register("message", { required: "Message is required" })}
        ></textarea>

        <button className="btn-secondary" disabled={isPending}>
          {isPending ? "Sending..." : "Send It!"}
        </button>
      </form>
    </div>
  );
}

export default FooterCTA;
