'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

const contactSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Tell us a little more — at least 10 characters'),
});

type ContactValues = z.infer<typeof contactSchema>;

const FIELD_CLASS =
  'peer w-full border-b border-navy/20 bg-transparent py-3 text-body text-navy placeholder-transparent focus:border-mustard-dark focus:outline-none';

const LABEL_CLASS =
  'pointer-events-none absolute left-0 top-3 text-body text-navy/40 transition-all duration-200 peer-focus:-top-3 peer-focus:text-[0.625rem] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-mustard-dark peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[0.625rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]';

/**
 * Floating-label fields (label sits inline until the field has focus or a
 * value, then rises out of the way) with RHF + Zod validation. Submits to
 * /api/contact, which emails the studio via Resend.
 */
export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactValues): Promise<void> => {
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setSubmitError(
          'Message could not be sent — please try again or email us directly.',
        );
        return;
      }

      setIsSubmitted(true);
      reset();
    } catch {
      setSubmitError(
        'Message could not be sent — please try again or email us directly.',
      );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.expo }}
          className="rounded-lg border border-mustard/40 bg-cream p-10 text-center"
        >
          <p className="text-subtitle text-navy">Message sent.</p>
          <p className="mt-3 text-small text-navy/60">
            We reply within one business day.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-6 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-mustard-dark hover:text-navy"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6 sm:space-y-8"
        >
          <div className="relative">
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder=" "
              className={FIELD_CLASS}
              {...register('name')}
            />
            <label htmlFor="name" className={LABEL_CLASS}>
              Full name
            </label>
            {errors.name && (
              <p className="mt-2 text-[0.6875rem] text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder=" "
              className={FIELD_CLASS}
              {...register('email')}
            />
            <label htmlFor="email" className={LABEL_CLASS}>
              Email
            </label>
            {errors.email && (
              <p className="mt-2 text-[0.6875rem] text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder=" "
              className={FIELD_CLASS}
              {...register('phone')}
            />
            <label htmlFor="phone" className={LABEL_CLASS}>
              Phone (optional)
            </label>
          </div>

          <div className="relative">
            <textarea
              id="message"
              rows={4}
              placeholder=" "
              className={cn(FIELD_CLASS, 'resize-none')}
              {...register('message')}
            />
            <label htmlFor="message" className={LABEL_CLASS}>
              Tell us about your project
            </label>
            {errors.message && (
              <p className="mt-2 text-[0.6875rem] text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>

          {submitError && (
            <p className="text-[0.6875rem] text-red-600">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-navy px-8 py-4 text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-white transition-colors duration-normal ease-expo hover:bg-mustard hover:text-navy disabled:opacity-50"
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
