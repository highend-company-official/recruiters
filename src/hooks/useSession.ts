import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

const useSession = () => {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return session;
};

export default useSession;
