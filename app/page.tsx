// 'use client'
// import { signIn, signOut, useSession } from "next-auth/react";
// import styles from './page.module.css'; // Import CSS module
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const handleLogin = () => {
//     router.push('/login');
//   };

//   const handleLogout = () => {
//     signOut();
//   };

//   return (
//     <div className={styles.homeContainer}>
//       <div className={styles.wrapper}>
//         {status !== "authenticated" ? (
//           <>
//             <h2 className={styles.heading}>Welcome to our website</h2>
//             <hr className={styles.hrLine} />
//             <p className={styles.paragraph}>Please sign in or create an account to continue.</p>
//             <button className={styles.btn} onClick={handleLogin}>Sign In / Sign Up</button>
//           </>
//         ) : (
//           <>
//             <h2 className={styles.heading}>Welcome, {session.user?.name}</h2>
//             <hr className={styles.hrLine} />
//             <p className={styles.paragraph}>Email: {session.user?.email}</p>
//             <button className={styles.btn} onClick={handleLogout}>Sign out</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import styles from './page.module.css'; // Ensure the CSS module file exists and is correctly configured
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signIn(); // Default sign-in redirects to your `/api/auth/signin` page
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Failed to sign in. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(); // Default sign-out redirects to your `/api/auth/signout` page
    } catch (error) {
      console.error("Error during sign-out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.wrapper}>
        {status === "loading" ? (
          <p className={styles.loading}>Loading...</p>
        ) : !session ? (
          <>
            <h2 className={styles.heading}>Welcome to our website</h2>
            <hr className={styles.hrLine} />
            <p className={styles.paragraph}>
              Please sign in or create an account to continue.
            </p>
            <button className={styles.btn} onClick={handleLogin}>
              Sign In / Sign Up
            </button>
          </>
        ) : (
          <>
            <h2 className={styles.heading}>Welcome, {session.user?.name}</h2>
            <hr className={styles.hrLine} />
            <p className={styles.paragraph}>Email: {session.user?.email}</p>
            <button className={styles.btn} onClick={handleLogout}>
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
