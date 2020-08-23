import EnvVarNBotFoundException from './exceptions/EnvVarNotFoundException';

export function env(key: string, defaultValue: string | null = null): string {
    if (typeof process.env[key] === 'undefined') {
        if (!defaultValue) {
            throw new EnvVarNBotFoundException(key);
        }
        
        return defaultValue;
    }
    
    return <string>process.env[key];
}

export function isDevelopment() {
    const nodeEnv = env('NODE_ENV', 'development');
    return nodeEnv !== 'production' && nodeEnv !== 'test';
}
