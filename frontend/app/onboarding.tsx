import { supabase } from "@/lib/supabase";
import { Button } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

export default function OnBoardingPage() {
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
        router.replace("/");
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
    <View>
      <Text>Onboarding here</Text>
      <View>
        <Button title="Sign Out" disabled={loading} onPress={() => signOut()} />
      </View>
    </View>
  );
}
