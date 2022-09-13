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
    future: {
      webpack5: true,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      if (!isServer) {
        // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.resolve.fallback = {
          util: false,
          process: false,
          buffer: false
        }
      }
      return config
    },
}
  return nextConfig
}