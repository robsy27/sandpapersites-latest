"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Button, ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Frontend-only contact form. No backend is wired up yet — on submit it
 * validates, simulates a request and shows a success state. To go live,
 * replace `submitEnquiry` with a real POST (Formspree, a route handler,
 * Resend, etc.); nothing else needs to change.
 */

const businessTypes = [
  "Trade (plumber, electrician, builder…)",
  "Food & drink (café, takeaway, restaurant)",
  "Health & beauty (salon, barber, clinic)",
  "Instructor or coach",
  "Shop or studio",
  "Something else",
];

type Field = "name" | "email" | "businessType" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const emptyValues: Values = {
  name: "",
  email: "",
  businessType: "",
  message: "",
};

const labels: Record<Field, string> = {
  name: "Your name",
  email: "Email address",
  businessType: "Type of business",
  message: "What do you need?",
};

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name so I know who I’m replying to.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address so I can send you a quote.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "That doesn’t look like a valid email — check for typos.";
  }

  if (!values.businessType) {
    errors.businessType = "Pick the closest match so I can tailor the quote.";
  }

  if (!values.message.trim()) {
    errors.message = "Tell me a little about what you need.";
  } else if (values.message.trim().length < 15) {
    errors.message = "A sentence or two helps — what does your business do?";
  }

  return errors;
}

/** Thrown when the server has no mail provider configured yet. */
class NotConfiguredError extends Error {}

async function submitEnquiry(
  values: Values,
  honeypot: string,
): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, company: honeypot }),
  });

  if (response.ok) return;

  const data = await response.json().catch(() => ({}));

  if (response.status === 503 && data.error === "not_configured") {
    throw new NotConfiguredError();
  }
  if (response.status === 429) {
    throw new Error(
      "That's a few messages in a short time — give it a few minutes, or ring me instead.",
    );
  }
  throw new Error(
    "Something went wrong sending that. Try again, or email me directly.",
  );
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "unavailable"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  /* Honeypot value. Hidden from people, irresistible to bots. */
  const [company, setCompany] = useState("");

  const summaryRef = useRef<HTMLDivElement>(null);

  /* Focus after the failed-submit render commits — the summary doesn't
     exist in the DOM yet at the moment handleSubmit runs. */
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const pendingFocus = useRef<"summary" | Field | null>(null);

  useEffect(() => {
    if (submitAttempt === 0) return;
    const target = pendingFocus.current;
    if (!target) return;
    pendingFocus.current = null;

    if (target === "summary") {
      summaryRef.current?.focus();
    } else {
      document.getElementById(target)?.focus();
    }
  }, [submitAttempt]);

  const setValue = (field: Field, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    /* Clear an existing error as soon as the user fixes it. */
    if (errors[field]) {
      const next = validate({ ...values, [field]: value });
      setErrors((previous) => ({ ...previous, [field]: next[field] }));
    }
  };

  /* Validate on blur, not on every keystroke. */
  const handleBlur = (field: Field) => {
    setTouched((previous) => ({ ...previous, [field]: true }));
    const next = validate(values);
    setErrors((previous) => ({ ...previous, [field]: next[field] }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, businessType: true, message: true });

    const errorFields = Object.keys(nextErrors) as Field[];
    if (errorFields.length > 0) {
      /* Multiple errors: focus the linked summary. Single: focus the field. */
      pendingFocus.current = errorFields.length > 1 ? "summary" : errorFields[0];
      setSubmitAttempt((count) => count + 1);
      return;
    }

    setStatus("sending");
    try {
      await submitEnquiry(values, company);
      setStatus("sent");
    } catch (cause) {
      if (cause instanceof NotConfiguredError) {
        setStatus("unavailable");
        return;
      }
      setErrorMessage(
        cause instanceof Error && cause.message
          ? cause.message
          : "Something went wrong sending that.",
      );
      setStatus("error");
    }
  };

  /* Delivery isn't set up yet. Rather than pretend the message was sent,
     hand the visitor the details and pre-fill an email for them. */
  if (status === "unavailable") {
    const subject = encodeURIComponent(
      `Website enquiry — ${values.name || "new enquiry"}`,
    );
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nBusiness type: ${values.businessType}\n\n${values.message}`,
    );

    return (
      <div
        role="alert"
        className="rounded-2xl border border-amber-400/35 bg-amber-500/10 p-8 sm:p-9"
      >
        <h3 className="font-display text-xl font-bold text-white">
          Let&rsquo;s get this to me another way
        </h3>
        <p className="mt-4 text-body leading-relaxed text-mist-300">
          The form isn&rsquo;t connected to my inbox just yet, and I&rsquo;d
          rather tell you that than lose your message. Your answers are still
          filled in below — send them straight over instead:
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={`mailto:${site.email}?subject=${subject}&body=${body}`}
            size="lg"
            icon="mail"
          >
            Email it to me
          </ButtonLink>
          <ButtonLink
            href={`tel:${site.phone}`}
            variant="secondary"
            size="lg"
            icon="phone"
          >
            {site.phoneDisplay}
          </ButtonLink>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 cursor-pointer text-sm text-mist-300 underline underline-offset-4 transition-colors hover:text-accent"
        >
          Back to the form
        </button>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-accent/30 bg-accent/8 p-8 text-center sm:p-10"
      >
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold text-white">
          Thanks — that’s with me.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-body leading-relaxed text-mist-300">
          I read every enquiry myself and usually reply within one working day.
          If it’s urgent, give me a ring instead — the number’s just below.
        </p>
        <div className="mt-8">
          <Button
            variant="secondary"
            onClick={() => {
              setValues(emptyValues);
              setErrors({});
              setTouched({});
              setStatus("idle");
            }}
          >
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  const visibleErrors = (Object.keys(errors) as Field[]).filter(
    (field) => errors[field] && touched[field],
  );

  return (
    <form noValidate onSubmit={handleSubmit} className="relative space-y-6">
      {/* Error summary — focusable, each item links to its field */}
      {visibleErrors.length > 1 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-400/40 bg-red-500/10 p-5"
        >
          <h3 className="font-display text-sm font-bold text-red-200">
            There {visibleErrors.length === 1 ? "is" : "are"}{" "}
            {visibleErrors.length} thing
            {visibleErrors.length === 1 ? "" : "s"} to fix:
          </h3>
          <ul className="mt-3 space-y-1.5">
            {visibleErrors.map((field) => (
              <li key={field}>
                <a
                  href={`#${field}`}
                  className="text-sm text-red-200 underline underline-offset-4 hover:text-white"
                >
                  {labels[field]}: {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          field="name"
          value={values.name}
          error={touched.name ? errors.name : undefined}
          onChange={setValue}
          onBlur={handleBlur}
          autoComplete="name"
          placeholder="Jane Cooper"
        />
        <TextField
          field="email"
          type="email"
          inputMode="email"
          value={values.email}
          error={touched.email ? errors.email : undefined}
          onChange={setValue}
          onBlur={handleBlur}
          autoComplete="email"
          placeholder="jane@yourbusiness.co.uk"
        />
      </div>

      {/* Business type */}
      <div>
        <FieldLabel htmlFor="businessType">{labels.businessType}</FieldLabel>
        <select
          id="businessType"
          name="businessType"
          required
          value={values.businessType}
          onChange={(event) => setValue("businessType", event.target.value)}
          onBlur={() => handleBlur("businessType")}
          aria-invalid={touched.businessType && !!errors.businessType}
          aria-describedby={
            touched.businessType && errors.businessType
              ? "businessType-error"
              : undefined
          }
          className={cn(
            fieldClasses,
            "appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11",
            values.businessType ? "text-white" : "text-mist-300",
            touched.businessType && errors.businessType
              ? errorFieldClasses
              : "border-navy-700",
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="">Select the closest match…</option>
          {businessTypes.map((type) => (
            <option key={type} value={type} className="bg-navy-800 text-white">
              {type}
            </option>
          ))}
        </select>
        <FieldError id="businessType-error" message={touched.businessType ? errors.businessType : undefined} />
      </div>

      {/* Message */}
      <div>
        <FieldLabel htmlFor="message">{labels.message}</FieldLabel>
        <p id="message-hint" className="mb-2 text-xs text-mist-300">
          What your business does, whether you have a site already, and roughly
          what you’re after.
        </p>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={(event) => setValue("message", event.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={cn(
            "message-hint",
            touched.message && errors.message ? "message-error" : "",
          ).trim()}
          placeholder="We’re a family-run café in Whitby. No website at the moment, just a Facebook page — we need somewhere to put the menu and take bookings."
          className={cn(
            fieldClasses,
            "resize-y",
            touched.message && errors.message
              ? errorFieldClasses
              : "border-navy-700",
          )}
        />
        <FieldError id="message-error" message={touched.message ? errors.message : undefined} />
      </div>

      {/* Honeypot. Off-screen rather than display:none, which some bots skip.
          Never announced, never tabbable, never autofilled. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-300">
          {errorMessage} You can also ring me on {site.phoneDisplay}.
        </p>
      )}

      {/* Button and note share one line, the button holding its width so its
          label never wraps and the note taking whatever is left. */}
      <div className="flex items-center gap-4 pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={status === "sending"}
          icon={status === "sending" ? undefined : "arrowRight"}
          className="shrink-0 whitespace-nowrap"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="min-w-0 flex-1 text-xs leading-relaxed text-mist-300">
          I’ll only use these details to reply to you. No lists, no sharing.
        </p>
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------- pieces -- */

const fieldClasses =
  "w-full min-h-12 rounded-xl border bg-navy-800/60 px-4 py-3 text-base text-white " +
  "placeholder:text-mist-300/60 transition-colors duration-200 " +
  "focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const errorFieldClasses = "border-red-400/70";

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block font-display text-sm font-semibold text-white"
    >
      {children}
      <span className="ml-1 text-accent" aria-hidden="true">
        *
      </span>
      <span className="sr-only"> (required)</span>
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex gap-2 text-sm text-red-300">
      <Icon name="close" className="mt-0.5 size-3.5 shrink-0" />
      {message}
    </p>
  );
}

function TextField({
  field,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  ...props
}: {
  field: Field;
  value: string;
  error?: string;
  onChange: (field: Field, value: string) => void;
  onBlur: (field: Field) => void;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onBlur" | "value" | "type">) {
  return (
    <div>
      <FieldLabel htmlFor={field}>{labels[field]}</FieldLabel>
      <input
        id={field}
        name={field}
        type={type}
        required
        value={value}
        onChange={(event) => onChange(field, event.target.value)}
        onBlur={() => onBlur(field)}
        aria-invalid={!!error}
        aria-describedby={error ? `${field}-error` : undefined}
        className={cn(
          fieldClasses,
          error ? errorFieldClasses : "border-navy-700",
        )}
        {...props}
      />
      <FieldError id={`${field}-error`} message={error} />
    </div>
  );
}
