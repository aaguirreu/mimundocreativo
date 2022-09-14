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
    webpack: function (config, options) {
      console.log(options.webpack.version); // 5.18.0
      config.experiments = {
        layers: true,
      };
      return config;
  }
}
  return nextConfig
}