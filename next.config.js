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
  }
  return nextConfig
}