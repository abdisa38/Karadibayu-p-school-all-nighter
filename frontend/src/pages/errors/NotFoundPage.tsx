import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../../components/common/Button.js';
import { KaradibayuSchoolLogo } from '../../components/logo/KaradibayuSchoolLogo.js';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface-100 flex flex-col justify-center items-center px-4 py-12">
      <div className="mb-6">
        <KaradibayuSchoolLogo size="lg" variant="full" theme="light" />
      </div>

      <div className="max-w-md w-full bg-white p-8 rounded-lg border border-surface-200 shadow-card text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-surface-100 flex items-center justify-center text-surface-500 mx-auto">
          <FileQuestion className="w-7 h-7 text-brand-900" />
        </div>

        <h1 className="text-2xl font-bold font-serif text-brand-900">
          Resource Not Found
        </h1>

        <p className="text-xs text-surface-600 leading-relaxed">
          The institutional resource or page you requested could not be located in the Karadibayu Primary School Management System.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="sm"
              className="w-full sm:w-auto"
              leftIcon={<Home className="w-4 h-4" />}
            >
              System Dashboard
            </Button>
          </Link>
          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              School Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
