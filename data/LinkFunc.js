import { Linking } from "react-native";

export const _goToURL = url =>
  Linking.canOpenURL(url).then(supported => supported && Linking.openURL(url));
