import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (account) {
        token.id = profile.id;
      }
      return token;
    },
  },
  // secret: process.env.NEXT_AUTH_SECRET,
  // // adapter: FirebaseAdapter(firestore)
  // callbacks: {
  //   async signIn({ user }) {
  //     try {
  //       // Check if the user already exists in the database
  //       const existingUser = await db("user_information")
  //         .where("email", user.email)
  //         .first()

  //       if (existingUser) {
  //         // User already exists, log them in
  //         console.log("User signed in:", user.email)
  //       } else {
  //         // User doesn't exist, create a new user
  //         const newUser = await db("user_information")
  //           .insert({
  //             user_name: user.name,
  //             email: user.email,
  //           })
  //           .returning("*") // Return all columns;
  //       }
  //     } catch (error) {
  //       console.error("Error during sign-in:", error)
  //       return false
  //     }

  //     return true
  //   },

  //   async session({ session, user, token }) {
  //     // Fetch the user's data from the database
  //     const userData = await db("user_information")
  //       .where("email", session.user?.email)
  //       .first()

  //     // Update the session object with the user's ID and email
  //     session.user = {
  //       ...session.user,
  //       id: userData?.id,
  //       email: userData?.email,
  //       isSubscribed: userData?.is_subscribed === 1,
  //     }

  //     return session
  //   },
  //   async jwt({ token }) {
  //     return token
  //   },
  // },
};
