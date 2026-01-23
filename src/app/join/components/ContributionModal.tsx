"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ContributionCategory, FormField } from "./ContributionCards";

interface ContributionModalProps {
  category: ContributionCategory | null;
  onClose: () => void;
}

// Dynamic schema generator based on form fields
function generateSchema(fields: FormField[]) {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case "email":
        fieldSchema = z.string().email("Please enter a valid email address");
        break;
      case "textarea":
        fieldSchema = z.string();
        if (field.required) {
          fieldSchema = z.string().min(10, "Please provide more detail");
        }
        break;
      case "multiselect":
        fieldSchema = z.array(z.string());
        if (field.required) {
          fieldSchema = z.array(z.string()).min(1, "Please select at least one option");
        }
        break;
      default:
        fieldSchema = z.string();
    }

    if (field.required && field.type !== "multiselect" && field.type !== "textarea") {
      fieldSchema = z.string().min(1, `${field.label} is required`);
    }

    if (!field.required && field.type !== "multiselect") {
      fieldSchema = z.string().optional();
    }

    schemaShape[field.name] = fieldSchema;
  });

  // Add honeypot field
  schemaShape.website = z.string().max(0, "Bot detected");

  return z.object(schemaShape);
}

export default function ContributionModal({
  category,
  onClose,
}: ContributionModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const schema = category ? generateSchema(category.formFields) : z.object({});

  type FormData = Record<string, string | string[]>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema) as never,
    defaultValues: category?.formFields.reduce((acc, field) => {
      if (field.type === "multiselect") {
        acc[field.name] = [];
      } else {
        acc[field.name] = "";
      }
      return acc;
    }, {} as FormData),
  });

  // Reset form when category changes
  useEffect(() => {
    if (category) {
      setIsSubmitted(false);
      setSubmitError(null);
      setSelectedMulti([]);
      reset();
    }
  }, [category, reset]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (category) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [category]);

  const toggleMultiSelect = (fieldName: string, option: string) => {
    const newSelected = selectedMulti.includes(option)
      ? selectedMulti.filter((s) => s !== option)
      : [...selectedMulti, option];
    setSelectedMulti(newSelected);
    setValue(fieldName, newSelected);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    if (!category) return;

    // Check honeypot
    if (data.website) {
      setSubmitError("Submission failed. Please try again.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category.title,
          categoryId: category.id,
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!category) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-900/90 backdrop-blur-sm"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl
            bg-plum-800
            ${
              category.accentColor === "teal"
                ? "border-teal-500/30"
                : "border-gold-400/30"
            }`}
        >
          {/* Header */}
          <div
            className={`sticky top-0 z-10 px-6 py-4 border-b bg-plum-800
              ${
                category.accentColor === "teal"
                  ? "border-teal-500/20"
                  : "border-gold-400/20"
              }`}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-plum-700 transition-colors"
            >
              <X className="w-5 h-5 text-cream-300" />
            </button>

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center
                  ${
                    category.accentColor === "teal"
                      ? "bg-teal-500/20"
                      : "bg-gold-400/20"
                  }`}
              >
                <category.icon
                  className={`w-5 h-5 ${
                    category.accentColor === "teal"
                      ? "text-teal-400"
                      : "text-gold-400"
                  }`}
                />
              </div>
              <div>
                <span
                  className={`text-xs uppercase tracking-wider ${
                    category.accentColor === "teal"
                      ? "text-teal-400"
                      : "text-gold-400"
                  }`}
                >
                  {category.subtitle}
                </span>
                <h2 className="text-xl font-serif text-cream-200">
                  {category.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div
                  className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center
                    ${
                      category.accentColor === "teal"
                        ? "bg-teal-500/20"
                        : "bg-gold-400/20"
                    }`}
                >
                  <CheckCircle
                    className={`w-8 h-8 ${
                      category.accentColor === "teal"
                        ? "text-teal-400"
                        : "text-gold-400"
                    }`}
                  />
                </div>
                <h3 className="text-2xl font-serif text-cream-200 mb-2">
                  Thank You!
                </h3>
                <p className="text-cream-300/80 mb-6">
                  We&apos;ve received your application. Our team will review it and
                  get back to you soon.
                </p>
                <Button onClick={onClose} variant="outline">
                  Close
                </Button>
              </motion.div>
            ) : (
              <>
                <p className="text-cream-300/80 text-sm mb-6">
                  {category.description}
                </p>

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Honeypot field */}
                  <input
                    type="text"
                    {...register("website")}
                    className="absolute -left-[9999px] opacity-0"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {category.formFields.map((field) => (
                    <div key={field.name}>
                      {field.type === "select" ? (
                        <div>
                          <label className="block text-sm font-medium text-cream-200 mb-2">
                            {field.label}
                            {field.required && (
                              <span className="text-red-400 ml-1">*</span>
                            )}
                          </label>
                          <select
                            {...register(field.name)}
                            className="w-full px-4 py-3 rounded-lg bg-plum-700 border border-plum-600
                              text-cream-200 focus:outline-none focus:ring-2 focus:ring-teal-500
                              focus:border-transparent transition-all"
                          >
                            <option value="">Select an option</option>
                            {field.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          {errors[field.name] && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors[field.name]?.message as string}
                            </p>
                          )}
                        </div>
                      ) : field.type === "multiselect" ? (
                        <div>
                          <label className="block text-sm font-medium text-cream-200 mb-2">
                            {field.label}
                            {field.required && (
                              <span className="text-red-400 ml-1">*</span>
                            )}
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {field.options?.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() =>
                                  toggleMultiSelect(field.name, option)
                                }
                                className={`px-3 py-1.5 rounded-full text-sm transition-all
                                  ${
                                    selectedMulti.includes(option)
                                      ? category.accentColor === "teal"
                                        ? "bg-teal-500 text-white"
                                        : "bg-gold-400 text-plum-900"
                                      : "bg-plum-700 text-cream-300 hover:bg-plum-600"
                                  }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          {errors[field.name] && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors[field.name]?.message as string}
                            </p>
                          )}
                        </div>
                      ) : field.type === "textarea" ? (
                        <div>
                          <label className="block text-sm font-medium text-cream-200 mb-2">
                            {field.label}
                            {field.required && (
                              <span className="text-red-400 ml-1">*</span>
                            )}
                          </label>
                          <textarea
                            {...register(field.name)}
                            rows={4}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 rounded-lg bg-plum-700 border border-plum-600
                              text-cream-200 placeholder-cream-300/40 focus:outline-none focus:ring-2
                              focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                          />
                          {errors[field.name] && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors[field.name]?.message as string}
                            </p>
                          )}
                        </div>
                      ) : (
                        <Input
                          {...register(field.name)}
                          type={field.type}
                          label={field.label}
                          placeholder={field.placeholder}
                          error={errors[field.name]?.message as string}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
