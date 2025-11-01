export class InputValidator {
    static getEmailValidationError(email: string): string {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return 'Invalid email format';
        }
        return '';
    }

    static getPasswordValidationError(password: unknown): string {
        if (typeof password !== 'string') return 'Password must be a string';
        if (password.length === 0) return 'Password should not be empty';
        if (password.length > 72) return 'Password must be at most 72 characters long';

        if (password.length < 8) return 'Password must be at least 8 characters long';
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
        if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password)) return 'Password must contain at least one symbol';

        return '';
    }
}