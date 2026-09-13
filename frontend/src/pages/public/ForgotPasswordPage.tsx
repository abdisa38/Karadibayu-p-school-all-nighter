import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { KaradibayuSchoolLogo } from '../../components/logo/KaradibayuSchoolLogo.js';
import { FormField } from '../../components/forms/FormField.js';
import { Input } from '../../components/forms/Input.js';
import { Button } from '../../components/common/Button.js';
import { apiClient } from '../../services/apiClient.js';
import { ApiResponseEnvelope } from '../../types/index.js';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Institutional email is required')
    .email('Please provide a valid institutional email format'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await apiClient.post<ApiResponseEnvelope>('/auth/forgot-password', {
        email: data.email,
      });
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch {
      setErrorMessage('Unable to process recovery request at this time. Please contact the school registrar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <KaradibayuSchoolLogo size="lg" variant="full" theme="light" />
        </div>
        <h2 className="text-center text-xl sm:text-2xl font-bold font-serif text-brand-900 tracking-tight">
          Password Recovery
        </h2>
        <p className="mt-1 text-center text-xs text-surface-500">
          Karadibayu Primary School Institutional Verification
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-card rounded-lg sm:px-10 border border-surface-200">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-surface-900">
                Recovery Request Dispatched
              </h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                If an institutional record exists for <span className="font-semibold text-brand-900">{submittedEmail}</span>,
                instructions have been generated. Please coordinate with the School Registrar or IT Administrator to finalize the credentials reset.
              </p>
              <div className="pt-3">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4.5" noValidate>
              <p className="text-xs text-surface-600 leading-relaxed mb-4">
                Enter your registered institutional email address. We will verify your account status with the academic directory.
              </p>

              {errorMessage && (
                <div role="alert" className="p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-800">
                  {errorMessage}
                </div>
              )}

              <FormField
                label="Institutional Email"
                id="email"
                error={errors.email?.message}
                required
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="name@karadibayu.edu.et"
                  error={!!errors.email}
                  leftIcon={<Mail className="w-4 h-4" />}
                  {...register('email')}
                />
              </FormField>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  isLoading={isSubmitting}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Password Reset
                </Button>
              </div>

              <div className="pt-3 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
