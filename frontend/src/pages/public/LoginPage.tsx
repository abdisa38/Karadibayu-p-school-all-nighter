import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { KaradibayuSchoolLogo } from '../../components/logo/KaradibayuSchoolLogo.js';
import { FormField } from '../../components/forms/FormField.js';
import { Input } from '../../components/forms/Input.js';
import { Button } from '../../components/common/Button.js';
import { useAuth } from '../../context/AuthContext.js';
import { useToast } from '../../hooks/useToast.js';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Institutional email is required')
    .email('Please provide a valid institutional email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await login(data.email, data.password);
      success('Institutional identity verified. Welcome to the Academic Management System.');
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Authentication failed. Please verify institutional credentials.';
      setErrorMessage(msg);
      error(msg, 'Access Denied');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setValue('email', 'admin@karadibayu.edu.et');
    setValue('password', 'Karadibayu@2026');
  };

  return (
    <div className="min-h-screen bg-surface-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Institutional Branding */}
        <div className="flex justify-center mb-4">
          <KaradibayuSchoolLogo size="lg" variant="full" theme="light" />
        </div>
        <h2 className="text-center text-xl sm:text-2xl font-bold font-serif text-brand-900 tracking-tight">
          Institutional Academic Portal
        </h2>
        <p className="mt-1 text-center text-xs text-surface-500">
          Sign in to access authorized educational records and school administration
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-card rounded-lg sm:px-10 border border-surface-200">
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5"
            >
              <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Authentication Error</p>
                <p className="mt-0.5 text-red-700">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4.5" noValidate>
            <FormField
              label="Institutional Email"
              id="email"
              error={errors.email?.message}
              required
            >
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@karadibayu.edu.et"
                error={!!errors.email}
                leftIcon={<Mail className="w-4 h-4" />}
                {...register('email')}
              />
            </FormField>

            <FormField
              label="Institutional Password"
              id="password"
              error={errors.password?.message}
              required
            >
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter password"
                error={!!errors.password}
                leftIcon={<Lock className="w-4 h-4" />}
                {...register('password')}
              />
            </FormField>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-surface-500">Authorized personnel only</span>
              <Link
                to="/forgot-password"
                className="font-medium text-teal-700 hover:text-teal-900 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                isLoading={isSubmitting}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In
              </Button>
            </div>
          </form>

          {/* Institutional Test Account Helper */}
          <div className="mt-6 pt-5 border-t border-surface-200">
            <div className="p-3 bg-surface-50 rounded-md border border-surface-200 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-surface-700 mb-1">
                <Info className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                <span>Default Foundation Administrator</span>
              </div>
              <p className="text-[11px] text-surface-500 mb-2 font-mono leading-relaxed">
                admin@karadibayu.edu.et &bull; Karadibayu@2026
              </p>
              <button
                type="button"
                onClick={handleFillDemoAdmin}
                className="text-[11px] text-teal-700 hover:text-teal-900 font-medium underline focus:outline-none"
              >
                Auto-fill credentials
              </button>
            </div>
          </div>
        </div>

        {/* Back to Public Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs text-surface-500 hover:text-surface-800 transition-colors font-medium"
          >
            &larr; Return to School Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
