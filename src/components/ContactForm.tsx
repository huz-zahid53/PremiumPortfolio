import { useState, type FormEvent } from "react";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/utils/cn";

type Status = "idle" | "submitting" | "success" | "error";

const initial = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverNote, setServerNote] = useState("");

  const set =
    (key: keyof typeof initial) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: "" }));
    };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!values.email.trim()) next.email = "An email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "That email does not look valid.";
    if (!values.message.trim()) next.message = "Tell us a little about the work.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setServerNote("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("no-backend");
      setStatus("success");
      setValues(initial);
    } catch {
      setStatus("error");
      setServerNote(
        `This site is not connected to a server yet, so the message was not sent. Write to ${site.email} and we will reply.`,
      );
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Full name" required error={errors.name}>
          <input
            value={values.name}
            onChange={set("name")}
            autoComplete="name"
            className={inputClass(errors.name)}
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={set("email")}
            autoComplete="email"
            className={inputClass(errors.email)}
          />
        </Field>
        <Field label="Phone">
          <input
            value={values.phone}
            onChange={set("phone")}
            autoComplete="tel"
            className={inputClass()}
          />
        </Field>
        <Field label="Company">
          <input
            value={values.company}
            onChange={set("company")}
            autoComplete="organization"
            className={inputClass()}
          />
        </Field>
      </div>

      <Field label="Service">
        <select value={values.service} onChange={set("service")} className={cn(inputClass(), "bg-void")}>
          <option value="">Select a starting point</option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" required error={errors.message}>
        <textarea
          value={values.message}
          onChange={set("message")}
          rows={5}
          className={cn(inputClass(errors.message), "resize-none")}
          placeholder="What are you making, and what should it feel like?"
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          data-cursor="cta"
          className="group relative inline-flex h-14 min-w-[220px] items-center justify-center overflow-hidden bg-ivory px-8 text-[12px] tracking-[0.22em] text-void uppercase disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p className="max-w-sm text-xs leading-relaxed text-mute">
          Required fields are marked. We typically reply within a few working days.
        </p>
      </div>

      {status === "success" && (
        <p className="border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ivory" role="status">
          Message received. We will write back shortly.
        </p>
      )}
      {status === "error" && (
        <p className="border border-ivory/20 bg-void-3 px-4 py-3 text-sm text-ivory/90" role="alert">
          {serverNote}{" "}
          <a className="underline decoration-gold underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-3 flex items-center justify-between text-[11px] tracking-[0.22em] text-mute uppercase">
        <span>
          {label}
          {required && <span className="ml-1 text-gold">*</span>}
        </span>
        {error && <span className="normal-case tracking-normal text-gold">{error}</span>}
      </span>
      {children}
    </label>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full border-0 border-b bg-transparent py-3 font-sans text-[15px] text-ivory outline-none transition-colors placeholder:text-mute/50",
    error ? "border-gold" : "border-white/15 focus:border-ivory",
  );
}
