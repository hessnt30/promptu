import { supabase } from "@/lib/supabase";
import { Button, Input } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, StyleSheet, View } from "react-native";

export default function OnBoardingPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (!session) {
        router.replace("/");
      }
    });
  }, []);

  async function updateUsername() {
    if (!session?.user) {
      Alert.alert("Not signed in");
      return;
    }

    const userId = session.user.id;
    const name = username.trim();
    if (!name) {
      Alert.alert("Please enter a username");
      return;
    }
    setLoading(true);

    try {
      const { data: updated, error: updateErr } = await supabase
        .from("UserData")
        .update({ username: name })
        .eq("user_id", userId)
        .select("user_id")
        .maybeSingle();

      if (updateErr) throw updateErr;

      if (!updated) {
        const { error: upsertErr } = await supabase
          .from("UserData")
          .upsert(
            { user_id: userId, username: name },
            { onConflict: "user_id" }
          )
          .select("user_id")
          .maybeSingle();

        if (upsertErr) Alert.alert(upsertErr.message);
      }

      router.replace("/home");
    } catch (e: any) {
      console.error(e);
      Alert.alert(e);
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Username"
          //   leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="username"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Next"
          disabled={loading}
          onPress={() => updateUsername()}
        />
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
