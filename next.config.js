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
      config.resolve.alias = {
        ...config.resolve.alias,
        './runtimeConfig': './runtimeConfig.browser',
      }
      return config
    },
}
  return nextConfig
}