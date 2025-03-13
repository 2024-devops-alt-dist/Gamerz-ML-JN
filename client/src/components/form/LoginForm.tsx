// client/src/components/form/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = ({
    onSuccess,
    onRegisterClick
}: {
    onSuccess: () => void;
    onRegisterClick: () => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const [serverError, setServerError] = useState<string>('');

    const onSubmit = async (data: LoginFormData) => {
        try {
            await axios.post('http://localhost:3000/api/auth/login', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            onSuccess();
        } catch (error) {
            if (error instanceof AxiosError) {
                setServerError(error.response?.data?.message || 'Invalid email or password');
            } else {
                setServerError('An unexpected error occurred');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {serverError}
                </div>
            )}
            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    {...register('email')}
                    className="w-full rounded-md border p-2"
                    type="email"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                    {...register('password')}
                    className="w-full rounded-md border p-2"
                    type="password"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
            >
                {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
                No account yet?{' '}
                <button
                    type="button"
                    onClick={onRegisterClick}
                    className="link-secondary"
                >
                    Register here
                </button>
            </p>
        </form>
    );
};