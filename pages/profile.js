import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: "/auth", permanent: false } };
  else return { props: { session } };
}
export default ProfilePage;