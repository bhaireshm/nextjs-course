import { GenericFetch } from "../../lib/helper";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   getSession().then((s) => {
  //     if (!s) window.location.href = "/auth";
  //     else setIsLoading(false);
  //   });
  // }, []);
  // if (isLoading) return <p className={classes.profile}>Loading...</p>;

  async function changePasswordHandler(payload) {
    const result = await GenericFetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    console.log("result", result);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
