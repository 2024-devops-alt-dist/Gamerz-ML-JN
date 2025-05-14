import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    motivation: z.string().min(10, 'Motivation must be at least 10 characters')
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const [serverError, setServerError] = useState<string>('');
    const registerUser = useAuth().register;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data.username, data.email, data.password, data.motivation);
            onSuccess();
        } catch (error) {
            if (error instanceof AxiosError) {
                setServerError(error.response?.data?.message || 'Registration failed. Please try again.');
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
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                    {...register('username')}
                    className="w-full rounded-md border p-2"
                    type="text"
                />
                {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username.message}</p>
                )}
            </div>

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

            <div>
                <label className="block text-sm font-medium mb-1">Motivation</label>
                <textarea
                    {...register('motivation')}
                    className="w-full rounded-md border p-2"
                    rows={3}
                />
                {errors.motivation && (
                    <p className="text-red-500 text-sm">{errors.motivation.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
            >
                {isSubmitting ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};