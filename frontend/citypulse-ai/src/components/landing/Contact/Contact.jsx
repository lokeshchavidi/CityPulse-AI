import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import toast from "react-hot-toast";

import Input from "@/components/forms/Input/Input";
import Textarea from "@/components/forms/Textarea/Textarea";
import Button from "@/components/common/Button/Button";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";

import LightPlate from "@/components/common/LightPlate";
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

    // Client-only acknowledgment until a contact API exists.
    setTimeout(() => {
      setSubmitting(false);
      setForm(initialForm);
      toast.success("Message sent. Our team will get back to you shortly.");
    }, 900);
  };

  return (
    <section id="contact" className="bg-surface py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionTitle
          eyebrow="Contact"
          title="Need help with CityPulse AI?"
          description="Reach our support team for platform access, technical issues, or department onboarding."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="flex flex-col"
          >
            <div className="relative mx-auto w-full max-w-sm lg:mx-0">
              <div className="absolute inset-8 rounded-full bg-brand-100/40 blur-3xl" />
              <LightPlate
                padding="lg"
                rounded="rounded-2xl"
                className="relative z-10 w-full"
              >
                <img
                  src={ContactSupport}
                  alt="Contact CityPulse AI support"
                  className="mx-auto w-full object-contain"
                  draggable={false}
                />
              </LightPlate>
            </div>

            <div className="mt-8 space-y-3">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-canvas p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
                      <Icon size={18} aria-hidden="true" />
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border border-slate-200 bg-canvas p-6 shadow-soft-sm sm:p-8"
            noValidate
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
              rightIcon={<Send size={18} aria-hidden="true" />}
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
