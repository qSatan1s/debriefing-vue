import firebase from "firebase/app";
var x = 0;
export default {
  actions: {
    async data(
      { dispatch, commit, getters },
      { email, name, items_1, items_2, items_3 },
    ) {
      try {
        const uid = await dispatch("getUid");
        const answer = await firebase
          .database()
          .ref(`users/${x} /info`)
          .set({ email, name });
        firebase
          .database()
          .ref(`users/${x} /polls`)
          .set({ items_1, items_2, items_3 });
        x++;
        return { x, items_1, items_2, items_3, id: answer.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },

    async getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
};
