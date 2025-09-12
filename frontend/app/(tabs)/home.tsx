import { supabase } from "@/lib/supabase";
import { Button } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, View, Text, StyleSheet, ActivityIndicator } from "react-native";

export type UserData = {
  user_id: string;
  created_at: string;
  updated_at: string;
  email: string;
  username?: string;
  full_name?: string;
};

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  const router = useRouter();

  // ---- Auth bootstrap + subscription (with cleanup)
  useEffect(() => {
    let isMounted = true;

    // Prime session from cache
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      setSession(session);
      if (!session) router.replace("/");
    });

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!isMounted) return;
        setSession(newSession);
        if (!newSession) {
          router.replace("/");
        }
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe?.();
    };
  }, [router]);

  const userId = useMemo(() => session?.user?.id ?? null, [session]);

  // ---- Fetch current user's row once we have a real userId
  useEffect(() => {
    let cancelled = false;

    async function fetchUser(uid: string) {
      setLoading(true);
      try {
        const { data, error, status } = await supabase
          .from("UserData")
          .select("*")
          .eq("user_id", uid)
          .maybeSingle();

        if (cancelled) return;

        if (error && status !== 406) {
          // 406 can happen when no rows; treat as "no data"
          Alert.alert("Error loading profile", error.message);
          setUser(null);
        } else if (!data) {
          // Row might not exist yet (race after sign-up). Keep null; you could poll/retry here if desired.
          setUser(null);
        } else {
          setUser(data as UserData);
        }
      } catch (e: any) {
        if (!cancelled)
          Alert.alert("Unexpected error", String(e?.message ?? e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (!userId) {
      // No session / user yet; keep loading spinner until auth settles
      setLoading(Boolean(session) ? false : true);
      setUser(null);
      return;
    }

    fetchUser(userId);

    return () => {
      cancelled = true;
    };
  }, [userId, session]);

  async function signOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={[styles.verticallySpaced]}>
          <ActivityIndicator />
          <Text style={{ marginTop: 8 }}>Loading…</Text>
        </View>
      )}

      {!loading && session?.user && (
        <>
          <Text style={[styles.verticallySpaced]}>You are logged in! 🎉</Text>

          {user ? (
            <Text style={[styles.verticallySpaced, styles.mt20]}>
              {user.full_name} @{user.username} {user.email} {user.created_at}{" "}
              {user.updated_at}
            </Text>
          ) : (
            <Text style={[styles.verticallySpaced, styles.mt20]}>
              Profile not found yet. If you just signed up, it may appear in a
              moment.
            </Text>
          )}
        </>
      )}

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" disabled={loading} onPress={signOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
