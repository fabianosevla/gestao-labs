/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Ignora módulos do Node.js no lado do cliente
            config.resolve.fallback = {
                fs: false,
                path: false,
                os: false,
            };
        }
        return config;
    },
};

export default nextConfig;