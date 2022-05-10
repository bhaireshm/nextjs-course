import { getSession } from "next-auth/react";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  return <AuthForm />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) return { redirect: { destination: "/", permanent: false } };
  else return { props: {} };
}

export default AuthPage;
