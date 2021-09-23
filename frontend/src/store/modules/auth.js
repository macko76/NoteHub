import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import http from "@/includes/http";

export default {
  state: {
    isAuthenticated: false,
    currentUser: null,
  },
  getters: {
    currentUser: (state) => {
      return state.currentUser;
    },
    getIdToken: (state) => {
      return state.currentUser ? null : state.currentUser.user.getIdToken();
    },
  },
  mutations: {
    toggleAuth: (state, isAuthenticated) => {
      state.isAuthenticated = isAuthenticated;
    },
    setUser: (state, user) => {
      state.currentUser = user;
    },
  },
  actions: {
    async signup({ commit, state, getters }, payload) {
      const { email, password, firstName, lastName } = payload;
      try {
        // Firebase signup
        const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
        // insert a new user into Database
        const { userId } = await http.post(
          "user/insert-user/",
          {
            email,
            firstName,
            lastName,
          },
          { headers: { authorization: `Bearer ${userCredential.user.getIdToken()}` } }
        );
        commit("setUser", {
          userId,
          firstname: firstName,
          lastname: lastName,
          email,
          avatarUrl: null,
          subtitle: "New User",
          user: userCredential.user,
        });
        console.log(state.currentUser);
        commit("toggleAuth", true);

        return true;
      } catch (e) {
        console.log(e.message);
      }
      // const idToken = await userCredential.user.getIdToken();
      return false;
    },
    async login({ commit }, payload) {
      const { email, password } = payload;
      try {
        const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
        const res = await http.post(
          "user/get-user-by-email/",
          { email },
          { headers: { authorization: `Bearer ${userCredential.user.getIdToken()}` } }
        );
        const { userId, firstName, lastName, avatarUrl, subtitle } = res.data;
        commit("setUser", {
          userId: userId,
          firstname: firstName,
          lastname: lastName,
          email,
          avatarUrl,
          subtitle,
          user: userCredential.user,
        });
        commit("toggleAuth", true);

        return true;
      } catch (e) {
        console.log(e.message);
      }
      return false;
    },
    async logout({ commit }, { router, route }) {
      await signOut(getAuth());
      commit("toggleAuth", false);
      console.log(route);
      if (route.meta.requireAuth) {
        router.push({ name: "auth" });
      }
    },
    async initialLogin({ commit, state }) {
      try {
        const user = getAuth().currentUser;
        if (user) {
          const res = await http.post(
            "user/get-user-by-email/",
            { email: user.email },
            { headers: { authorization: `Bearer ${user.getIdToken()}` } }
          );
          const { userId, firstName, lastName, avatarUrl, subtitle } = res.data;
          commit("setUser", {
            userId: userId,
            firstname: firstName,
            lastname: lastName,
            email: user.email,
            avatarUrl,
            subtitle,
            user,
          });
          console.log(state.currentUser);
          commit("toggleAuth", true);
        }
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
