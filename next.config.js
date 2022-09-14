module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "kagjkwomsitfugyxfvlj.supabase.in",
      "kagjkwomsitfugyxfvlj.supabase.co",
    ],
  },
  webpack: (config, options, pluginOptions) => {
    config.module.rules.push({
      test: /\.png$/,
      loader: "raw-loader",
    });

    return config
  },
};
