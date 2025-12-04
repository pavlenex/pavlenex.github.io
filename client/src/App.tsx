import { ThemeProvider } from "next-themes";
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
