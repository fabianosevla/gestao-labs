/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                path: false,
                os: false,
            };
        }
        return config;
    },
    // Desativa o Turbopack
    experimental: {
        turbopack: false,
    },
    // Suprime warnings de hidratação (use com cuidado, apenas para debugging)
    // logging: {
    //     level: 'error', // Mostra apenas erros, ignora warnings
    // },
};

export default nextConfig;