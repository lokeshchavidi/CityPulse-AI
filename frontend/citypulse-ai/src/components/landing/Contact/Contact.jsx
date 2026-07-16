import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

import Input from "@/components/forms/Input/Input";
import Textarea from "@/components/forms/Textarea/Textarea";
import Button from "@/components/common/Button/Button";

import ContactSupport from "@/assets/illustrations/contact-support.svg";

const contactDetails = [
  {
    icon: Phone,
    label: "Helpline",
    value: "1800-123-4567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@citypulse.gov.in",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Municipal Corporation HQ, Hyderabad",
  },
];

const initialForm = { name: "", email: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    // TODO: wire to a real support/contact endpoint once available.
    setTimeout(() => {
      setSubmitting(false);
      setForm(initialForm);
      toast.success("Message sent. Our team will get back to you shortly.");
    }, 900);
  };

  return (
    <section id="contact" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
            <MessageCircle size={18} />
            Get in Touch
          </div>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Questions About
            <span className="block text-blue-800">CityPulse AI?</span>
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Reach out to our support team for platform access, technical
            issues, or department onboarding.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="relative mx-auto w-full max-w-sm lg:mx-0">
              <div className="absolute inset-0 rounded-full bg-blue-100/40 blur-3xl" />
              <img
                src={ContactSupport}
                alt="Contact CityPulse AI Support"
                className="relative z-10 mx-auto w-full object-contain"
                draggable={false}
              />
            </div>

            <div className="mt-8 space-y-4">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                      <Icon className="text-blue-700" size={20} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <Input
              label="Full Name"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Textarea
              label="Message"
              name="message"
              placeholder="How can we help?"
              value={form.message}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={submitting}
              rightIcon={<Send size={18} />}
            >
              Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
