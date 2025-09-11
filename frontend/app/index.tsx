import "react-native-url-polyfill/auto";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Auth from "@/components/Auth";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Prevent overlapping fetches in React Strict Mode
  const fetchingRef = useRef<string | null>(null);

  // 1) One-time: get initial session and subscribe to auth changes
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (isMounted) setSession(session ?? null);
      } catch (e: any) {
        console.log("getSession error:", e);
      }
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // 2) When there is a session.user, get UserData
  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;

    // Avoid duplicate fetches while the previous one is in flight
    if (fetchingRef.current === userId) return;
    fetchingRef.current = userId;

    const run = async () => {
      setLoading(true);
      try {
        // query UserData
        const { data, error } = await supabase
          .from("UserData")
          .select("user_id, username")
          .eq("user_id", userId)
          .maybeSingle(); // expect single object, instead of array

        if (error) {
          Alert.alert("Failed to fetch user data", error.message);
          return;
        }

        if (!data) {
          Alert.alert(
            "No user row found",
            "We couldn't find your user record."
          );
          router.replace("/onboarding");
          return;
        }

        if (!data.username || data.username.trim().length === 0) {
          console.log("go to onboarding");
          router.replace("/onboarding");
        } else {
          console.log("go to home");
          router.replace("/home");
        }
      } catch (e: any) {
        console.log("Caught error:", e);
        Alert.alert("Unexpected error", e?.message ?? String(e));
      } finally {
        setLoading(false);
        fetchingRef.current = null;
      }
    };

    run();
    // re-run only when the user id changes
  }, [session?.user?.id, router]);

  const authed = !!session?.user;

  return (
    <View style={{ padding: 16, gap: 12 }}>
      {!authed && <Auth />}

      {authed && (
        <>
          <Text>Signed in as: {session!.user!.id}</Text>
          {loading && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <ActivityIndicator />
              <Text>Loading your profile…</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}
