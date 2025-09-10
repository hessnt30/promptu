import { supabase } from "@/lib/supabase";
import { Button } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (!session) {
        router.replace('/')
      }
    });
  }, []);

  async function signOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.verticallySpaced]}>You are logged in! congrats</Text>
      {session && session.user && (
        <Text style={[styles.verticallySpaced, styles.mt20]}>
          {session.user.id} {session.user.email}
        </Text>
      )}
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" disabled={loading} onPress={() => signOut()} />
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
