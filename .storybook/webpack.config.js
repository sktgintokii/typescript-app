module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        },
      },
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {
          enforce: 'pre',
        },
      },
    ]
  }),

  config.resolve.extensions.push(".ts", ".tsx")

  return config
}
