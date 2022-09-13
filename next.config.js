module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [
        "kagjkwomsitfugyxfvlj.supabase.in",
        "kagjkwomsitfugyxfvlj.supabase.co",
      ],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      if (!isServer) {
        // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.resolve.fallback = {
          'util/types': false
        }
    }
      config.resolve.alias = {
        ...config.resolve.alias,
        './runtimeConfig': './runtimeConfig.browser',
      }
      return config
    },
}
  return nextConfig
}