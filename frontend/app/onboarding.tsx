import { supabase } from "@/lib/supabase";
import { Button, Input } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, StyleSheet, View } from "react-native";

export default function OnBoardingPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
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

  async function updateNames() {
    if (!session?.user) {
      Alert.alert("Not signed in");
      return;
    }

    const userId = session.user.id;
    const trimmedUsername = username.trim();
    const trimmedFullName = fullName.trim();

    if (!trimmedUsername) {
      Alert.alert("Please enter a username");
      return;
    }

    if (!trimmedFullName) {
      Alert.alert("Please enter your name");
    }
    setLoading(true);

    try {
      const { data: updated, error: updateErr } = await supabase
        .from("UserData")
        .update({ username: trimmedUsername, full_name: trimmedFullName })
        .eq("user_id", userId)
        .select("user_id")
        .maybeSingle();

      if (updateErr) Alert.alert(updateErr.message);

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
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Name"
          //   leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          placeholder="name"
          autoCapitalize={"words"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Next" disabled={loading} onPress={() => updateNames()} />
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
