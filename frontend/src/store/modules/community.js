// import http from "@/includes/http";
import { communities } from "@/includes/fake_data.js";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, ref } from "@/includes/firebase";

export default {
  state: {
    communities: [],
  },
  getters: {
    communities: (state) => {
      return state.communities;
    },
  },
  mutations: {
    setCommunities: (state, communities) => {
      state.communities = communities;
    },
  },
  actions: {
    initCommunityState({ commit }) {
      commit("setCommunities", communities);
      // ...
    },
    /* eslint-disable */
    async createCommunityByUser({ commit }, payload) {
      const { name, description, photoFile, ownerId } = payload;
      const storageRef = ref(storage);
      const fileName = `${Math.floor(Date.now() / 1000)}-${photoFile.name}`;
      const communityPhotoRef = ref(storageRef, `community_photos/${fileName}`);
      const task = uploadBytesResumable(communityPhotoRef, photoFile);
      task.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        async (success) => {
          const photo = await getDownloadURL(task.snapshot.ref);
          const community = {
            name,
            description,
            photo,
            ownerId,
          };
          // ...
          console.log(community);
        }
      );
    },
    /* eslint-disable */
    async leaveCommunityById({ commit }, payload) {
      const { communityId, userId } = payload;
      console.log(communityId, userId);
      // ...
    },
  },
};
