import { AppState, Platform } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";

// env needed with React Native?
const supabaseUrl = "https://hnazisomtwukqklykvca.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuYXppc29tdHd1a3FrbHlrdmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Njk2NTYsImV4cCI6MjA3MzA0NTY1Nn0.EZbv5odoYLihGwypf1dhH-rKcrucXAmE5rfT3xi45js";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
if (Platform.OS !== "web") {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
