import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
    FaEnvelope,
    FaLinkedinIn,
    FaLock,
    FaPaperPlane,
    FaGithub
} from "react-icons/fa6";
import Card from "../components/Cards";
import { contactContent, contactLinks, directEmail } from "../data/contact";

// Chaves lidas do arquivo .env (que NÃO vão para o GitHub)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;

const icons = {
    email: FaEnvelope,
    linkedin: FaLinkedinIn,
    github :FaGithub,
};

const fields = [
    { id: "name", type: "text", autoComplete: "name" },
    { id: "email", type: "email", autoComplete: "email" },
    { id: "message", textarea: true },
];

const initialValues = { name: "", email: "", message: "", website: "" };

// Devolve só as CHAVES dos erros (o texto é traduzido na hora de mostrar)
const validate = (values) => {
    const errors = {};
    if (values.name.trim().length < 2) errors.name = "nameError";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        errors.email = "emailError";
    }
    if (values.message.trim().length < 10) errors.message = "messageError";
    return errors;
};

export default function Contact({ language }) {
    const content = contactContent[language];

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: undefined }));
        if (status !== "sending") setStatus("idle");
    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Campo-armadilha contra robôs (humanos não veem nem preenchem)
    if (values.website) {
        setStatus("success");
        return;
    }

    setStatus("sending");
    try {
        const params = { name: values.name.trim(), email: values.email.trim(), message: values.message.trim(),};

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, {
            publicKey: PUBLIC_KEY,
        });

        // Resposta automática() se falhar, o envio principal continua valendo)
        if (AUTOREPLY_TEMPLATE_ID) {
            try {
                await emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, params, {
                    publicKey: PUBLIC_KEY,
                });
            } catch (error) {
                console.error("Falha na resposta automática:", error);
            }
        }

        setStatus("success");
        setValues(initialValues);
    } catch {
        setStatus("error");
    }
    };

    return (
        <section id="ContactMe" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 pb-10 md:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Coluna esquerda (texto + links) */}
            <div>
            <p className="text-xs font-medium tracking-widest text-violet-300">
                {content.label}
            </p>
            <h2 className="mt-4 bg-gradient-to-r from-violet-100 via-violet-300 to-sky-300 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl lg:text-7xl">
                {content.title}
            </h2>
            <p className="mt-4 max-w-xl text-slate-300">{content.subtitle}</p>

            <p className="mt-6 flex items-center gap-2 text-sm text-teal-300">
                <span className="h-2 w-2 rounded-full bg-teal-300" />
                {content.status}
            </p>

            <p className="mt-1 text-sm text-slate-500">{content.replyTime}</p>

            <ul className="mt-10 flex flex-wrap gap-6">
                {contactLinks.map((link) => {
                const Icon = icons[link.id];
                return (
                    <li key={link.id}>
                    <a href={link.href} aria-label={link.label[language]}
                        {...(link.external && { target: "_blank", rel: "noopener noreferrer",})} className="group flex flex-col items-center gap-2" >
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#2a2a33] bg-[#14141e]/90 text-violet-300 transition-all group-hover:border-violet-400/50 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(167,139,250,0.35)]">
                        <Icon size={22} />
                        </span>
                        <span className="text-xs text-slate-400">
                        {link.label[language]}
                        </span>
                    </a>
                    </li>
                );
                })}
            </ul>
            </div>

            {/* Coluna direita (formulário) */}
            <Card>
                <h3 className="text-2xl font-semibold text-white">
                    {content.formTitle}
                </h3>

                <form onSubmit={handleSubmit} noValidate className="relative mt-6 space-y-5">
                    {fields.map((field) => {
                    const Tag = field.textarea ? "textarea" : "input";
                    const hasError = Boolean(errors[field.id]);

                    return (
                        <div key={field.id}>
                            <label htmlFor={field.id} className="text-sm font-medium text-slate-200" >
                                {content[`${field.id}Label`]}
                            </label>
                            <Tag id={field.id} name={field.id} type={field.textarea ? undefined : field.type} rows={field.textarea ? 5 : undefined} maxLength={field.textarea ? 1000 : 120} autoComplete={field.autoComplete} value={values[field.id]} onChange={handleChange} placeholder={content[`${field.id}Placeholder`]} aria-invalid={hasError} aria-describedby={hasError ? `${field.id}-error` : undefined} className={`mt-2 w-full rounded-xl border bg-[#0d0d16] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none ${
                                field.textarea ? "resize-none" : "" } ${ hasError ? "border-rose-400/60" : "border-[#2a2a33] focus:border-violet-400/60"}`}/>
                            {hasError && (
                                <p id={`${field.id}-error`} role="alert" className="mt-1 text-xs text-rose-300" >
                                    {content[errors[field.id]]}
                                </p>
                            )}
                        </div>
                    );
                    })}

                    {/* Campo-armadilha (honeypot), escondido de pessoas */}
                    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                        <label htmlFor="website">Website</label>
                        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
                    </div>

                    <button type="submit" disabled={status === "sending"} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-300 to-indigo-400 px-5 py-3 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60" >
                        {status === "sending" ? content.sending : content.send}
                        <FaPaperPlane size={14} />
                    </button>

                    {status === "success" && (
                        <p role="status" className="text-sm text-teal-300">
                            {content.success}
                        </p>
                    )}
                    {status === "error" && (
                        <p role="alert" className="text-sm text-rose-300">
                            {content.error}
                        </p>
                    )}

                    <p className="flex items-center gap-2 text-xs text-slate-500">
                        <FaLock size={12} />
                        {content.privacy}
                    </p>
                </form>
            </Card>
        </div>
        </section>
    );
}