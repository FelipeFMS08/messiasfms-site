import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { t } from '@/languages/languages';
import { Button } from './button';

interface ContactFormProps {
  lang: 'pt' | 'en';
}

interface FormData {
  name: string;
  email: string;
  project: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  project?: string;
  budget?: string;
  message?: string;
}

export function ContactForm({ lang }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    project: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const projectTypes = lang === 'pt' ? [
    'Website/Landing Page',
    'E-commerce',
    'Aplicativo Mobile',
    'Sistema Web',
    'API/Backend',
    'Outro'
  ] : [
    'Website/Landing Page',
    'E-commerce',
    'Mobile App',
    'Web System',
    'API/Backend',
    'Other'
  ];

  const budgetRanges = lang === 'pt' ? [
    'R$ 2.000 - R$ 5.000',
    'R$ 5.000 - R$ 10.000',
    'R$ 10.000 - R$ 20.000',
    'R$ 20.000+',
    'Vamos discutir'
  ] : [
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000+',
    'Let\'s discuss'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = lang === 'pt' ? 'Nome é obrigatório' : 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = lang === 'pt' ? 'Email é obrigatório' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = lang === 'pt' ? 'Email inválido' : 'Invalid email';
    }

    if (!formData.project) {
      newErrors.project = lang === 'pt' ? 'Tipo de projeto é obrigatório' : 'Project type is required';
    }

    if (!formData.budget) {
      newErrors.budget = lang === 'pt' ? 'Orçamento é obrigatório' : 'Budget is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = lang === 'pt' ? 'Mensagem é obrigatória' : 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = lang === 'pt' 
        ? 'Mensagem deve ter pelo menos 20 caracteres' 
        : 'Message must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) return;

  setIsSubmitting(true);
  setSubmitStatus('idle');

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    
    
    setSubmitStatus('success');
    setFormData({ name: '', email: '', project: '', budget: '', message: '' });
    setErrors({});
  } catch (error) {
    console.error(error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 p-4 bg-green-600/20 border border-green-600/30 rounded-lg text-green-400"
        >
          <CheckCircle size={20} />
          <span className="text-sm">
            {lang === 'pt' 
              ? 'Mensagem enviada com sucesso! Retornarei em até 24 horas.' 
              : 'Message sent successfully! I\'ll get back to you within 24 hours.'}
          </span>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 p-4 bg-red-600/20 border border-red-600/30 rounded-lg text-red-400"
        >
          <AlertCircle size={20} />
          <span className="text-sm">
            {lang === 'pt' 
              ? 'Erro ao enviar mensagem. Tente novamente.' 
              : 'Error sending message. Please try again.'}
          </span>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            {t[lang].name} *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={lang === 'pt' ? 'Seu nome completo' : 'Your full name'}
            className={`w-full bg-zinc-800 border rounded-lg p-4 text-sm text-white placeholder-zinc-500 form-input focus:outline-none focus:ring-2 transition-all ${
              errors.name 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-zinc-700 focus:ring-red-600'
            }`}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            {t[lang].yourEmail} *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={lang === 'pt' ? 'seu@email.com' : 'your@email.com'}
            className={`w-full bg-zinc-800 border rounded-lg p-4 text-sm text-white placeholder-zinc-500 form-input focus:outline-none focus:ring-2 transition-all ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-zinc-700 focus:ring-red-600'
            }`}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            {lang === 'pt' ? 'Tipo de Projeto' : 'Project Type'} *
          </label>
          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            className={`w-full bg-zinc-800 border rounded-lg p-4 text-sm text-white form-input focus:outline-none focus:ring-2 transition-all ${
              errors.project 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-zinc-700 focus:ring-red-600'
            }`}
          >
            <option value="">{lang === 'pt' ? 'Selecione o tipo' : 'Select type'}</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.project && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.project}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            {lang === 'pt' ? 'Orçamento' : 'Budget'} *
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={`w-full bg-zinc-800 border rounded-lg p-4 text-sm text-white form-input focus:outline-none focus:ring-2 transition-all ${
              errors.budget 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-zinc-700 focus:ring-red-600'
            }`}
          >
            <option value="">{lang === 'pt' ? 'Selecione a faixa' : 'Select range'}</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          {errors.budget && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.budget}
            </motion.p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          {t[lang].message} *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          placeholder={lang === 'pt' 
            ? 'Descreva seu projeto em detalhes: objetivos, funcionalidades desejadas, prazo, etc.' 
            : 'Describe your project in detail: goals, desired features, timeline, etc.'}
          className={`w-full bg-zinc-800 border rounded-lg p-4 text-sm text-white placeholder-zinc-500 form-input focus:outline-none focus:ring-2 transition-all resize-none ${
            errors.message 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-zinc-700 focus:ring-red-600'
          }`}
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-xs mt-1"
          >
            {errors.message}
          </motion.p>
        )}
      </div>

      <div className="">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-500 hover:bg-red-700 text-white px-12 py-7 text-lg rounded-lg btn-ripple hover-glow disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span>
                {lang === 'pt' ? 'Enviando...' : 'Sending...'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send size={20} />
              <span>{t[lang].send}</span>
            </div>
          )}
        </Button>
      </div>

      <p className="text-xs text-zinc-500">
        {lang === 'pt' 
          ? 'Respondo todas as mensagens em até 24 horas. Vamos transformar sua ideia em realidade!' 
          : 'I respond to all messages within 24 hours. Let\'s turn your idea into reality!'}
      </p>
    </motion.form>
  );
}