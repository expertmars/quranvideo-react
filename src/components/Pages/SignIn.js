import firebase from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

function SignInPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLogged);

  const signInWithFirebase = () => {
    console.log("sign in to google");
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        const uId = result.user.uid;
        const providerData = result.user.providerData;
        const lastSignInTime = new Date(result.user.metadata.lastSignInTime);
        const expireTime = new Date(lastSignInTime.getTime() + 60 * 60000);

        const expireTimeString = expireTime.toISOString();

        let loadedData = {};
        for (const key in providerData) {
          loadedData = {
            uId: uId,
            name: providerData[key].displayName,
            email: providerData[key].email,
            avatar: providerData[key].photoURL,
            expireOn: expireTimeString,
          };
        }
        dispatch(authActions.updateUserData(loadedData));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const signOutFirebase = () => {
    dispatch(authActions.logoutHandler());
    firebase.auth().signOut();
  };

  return (
    <div>
      <h3>Sign in to your account</h3>
      <button onClick={signInWithFirebase}>Sign in</button>
      {isLoggedIn && <button onClick={signOutFirebase}>Sign out</button>}
    </div>
  );
}

export default SignInPage;
