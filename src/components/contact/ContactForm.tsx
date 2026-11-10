"use client";

import { useState, type FormEvent } from "react";
import { SwapText } from "../SwapText";

type Field = {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
};

const rows: [Field, Field][] = [
  [
    {
      name: "name",
      label: "Your name",
      placeholder: "First and last name",
      required: true,
      autoComplete: "name",
    },
    { name: "partner", label: "Partner’s name", placeholder: "Optional" },
  ],
  [
    {
      name: "email",
      label: "Email address",
      placeholder: "Where we should reply",
      required: true,
      type: "email",
      autoComplete: "email",
    },
    {
      name: "date",
      label: "Wedding date",
      placeholder: "A rough month is fine",
      required: true,
    },
  ],
  [
    {
      name: "venue",
      label: "Venue or location",
      placeholder: "Where or what kind",
      required: true,
    },
    {
      name: "guests",
      label: "Guest count",
      placeholder: "An estimate is fine",
      required: true,
      autoComplete: "off",
    },
  ],
  [
    {
      name: "style",
      label: "What would you like us to style?",
      placeholder: "Mood, colours, ideas",
      required: true,
    },
    { name: "source", label: "How did you find us", placeholder: "Optional" },
  ],
];

const fields = rows.flat();
// Terra & Tent is a fictional studio: the form checks what was entered and
// confirms on the page, but never sends anything anywhere.

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = String(data.get(field.name) ?? "").trim();
      if (field.required && !value)
        next[field.name] = "Please fill this in so we can plan around it.";
      else if (field.type === "email" && value && !/^\S+@\S+\.\S+$/.test(value))
        next[field.name] = "This email address does not look complete.";
    }
    setErrors(next);
    const first = fields.find((f) => next[f.name]);
    if (first) {
      form.querySelector<HTMLInputElement>(`[name="${first.name}"]`)?.focus();
      return;
    }

    // A brief pause so the confirmation feels considered, not instant.
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 700);
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex min-h-[320px] flex-col justify-end gap-5 lg:min-h-[420px] lg:pr-8"
      >
        <p className="text-body opacity-65">Message sent</p>
        <p className="max-w-[560px] font-display text-display-s font-light uppercase">
          Thank you, we have your message. Expect a reply from us within two
          working days.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        {rows.map((row) => (
          <div key={row[0].name} className="flex flex-col gap-8 md:flex-row">
            {row.map((field) => {
              const id = `field-${field.name}`;
              const error = errors[field.name];
              return (
                <div
                  key={field.name}
                  className="flex min-w-0 flex-1 flex-col gap-8"
                >
                  <label htmlFor={id} className="text-body">
                    {field.label}
                    {field.required && <span aria-hidden>*</span>}
                  </label>
                  <div className="field relative">
                    <input
                      id={id}
                      name={field.name}
                      type={field.type ?? "text"}
                      required={field.required}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? `${id}-error` : undefined}
                      onInput={() =>
                        error && setErrors((e) => ({ ...e, [field.name]: "" }))
                      }
                      className="field-input box-border h-[59.5px] w-full bg-transparent pt-[13px] pr-6 pb-[17px] pl-4 font-display text-display-s font-light uppercase outline-none placeholder:text-ink/60"
                    />
                    <span aria-hidden className="field-line" />
                  </div>
                  {error && (
                    <p
                      id={`${id}-error`}
                      className="-mt-5 text-body opacity-70"
                    >
                      {error}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group press inline-flex items-center justify-center rounded-[25px] bg-ink px-6 py-4 text-body text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:opacity-60"
        >
          <SwapText>
            {status === "sending" ? "Sending" : "Begin your story"}
          </SwapText>
        </button>
      </div>
    </form>
  );
}
