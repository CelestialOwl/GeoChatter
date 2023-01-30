module.exports = function (api) {
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      "react-native-classname-to-style",
      [
        "react-native-platform-specific-extensions",
        { extensions: ["scss", "sass"] },
      ],
    ],
  };
};
