process.env.TAMAGUI_TARGET = "native";
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "transform-inline-environment-variables",
        {
          include: ["TAMAGUI_TARGET"],
        },
      ],
      require.resolve("expo-router/babel"),
    ],
  };
};
