// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
module.exports = (() => {
  // 1. 기본 엑스포 메트로 설정 가져오기
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  // 2. SVG 트랜스포머 설정 추가
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  // 3. SVG를 자산(asset)이 아닌 소스 코드(source)로 인식하도록 수정
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  // 4. NativeWind 설정과 함께 내보내기
  return withNativeWind(config, { input: "./app/global.css" });
})();