import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNav, navigationRef } from "./src/navigation/RootNav";
import { AppProvider } from "./src/state/AppProvider";

export function App() {
  const [ready] = useFonts({
    NotoSansDevanagari: require("./assets/fonts/NotoSansDevanagari-Regular.ttf"),
  });
  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FDF6E3" }}>
        <ActivityIndicator color="#7B1F2E" />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppProvider>
        <NavigationContainer ref={navigationRef}>
          <RootNav />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
