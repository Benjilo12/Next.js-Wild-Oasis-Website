import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://afieotbnxywmqtcuelka.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaWVvdGJueHl3bXF0Y3VlbGthIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjAzNzQxMywiZXhwIjoyMDMxNjEzNDEzfQ.lljTZwgUCqp-d7hVJAleneaGupR1JSMe9CDOT6rhvcg"
);
