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
    webpack(config) {
      config.resolve.alias = {
        ...config.resolve.alias,
        './runtimeConfig': './runtimeConfig.browser',
      }
    },
}
  return nextConfig
}