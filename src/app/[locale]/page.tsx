import Home from "../page";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["uk", "bg", "de"].map((locale) => ({ locale }));
}

export default function LocalePage() {
  return <Home />;
}
