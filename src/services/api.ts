import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gnbzazyzixgflrxtrdbg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduYnphenl6aXhnZmxyeHRyZGJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDQ3NzE2NSwiZXhwIjoyMDQ2MDUzMTY1fQ.XLrytRxIOUhhrnssluYH_FFtF59R0SnlAtdYkYf12aA";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchCountries() {
  const { data: countries, error } = await supabase
    .from("countries")
    .select("*");

  if (error) console.error("Error fetching countries:", error);
  return countries || [];
}
  export async function fetchCountriesByname(name:string) {
    const { data: countries, error } = await supabase
      .from("countries")
      .select("*")
      .eq("name", name)
      .single();

      if (error) console.error("Error fetching countries:", error);
      return countries || [];
  }
