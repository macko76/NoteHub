<template>
  <v-card
    :color="getRandomColor()"
    dark
    width="100%"
    elevation="4"
    class="d-flex flex-column justify-space-between"
  >
    <div class="d-flex px-3 pt-3 pb-2">
      <UserAvatar :firstname="'B'" :lastname="'C'" :size="40" />
      <v-list-item-content class="ml-2">
        <v-list-item-title class="font-weight-bold">{{
          `${comment.user.firstName} ${comment.user.lastName}`
        }}</v-list-item-title>
      </v-list-item-content>
    </div>
    <v-card-text
      class="community-note-comment-content d-inline-block lighten-1 px-3 py-0 text-subtitle-1 font-weight-medium"
    >
      "{{ comment.content }}"
    </v-card-text>
    <div class="d-flex ma-0 px-3 pb-2 pt-2 align-center">
      <v-icon class="mr-1" :size="18">
        favorite
      </v-icon>
      <span class="subheading mr-4">{{ comment.likeCount || 0 }}</span>
    </div>
  </v-card>
</template>

<script>
import { getRandomColor } from "@/includes/utils";
import UserAvatar from "./UserAvatar.vue";

export default {
  name: "CommentCard",
  components: { UserAvatar },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getRandomColor,
  },
};
</script>

<style>
.community-note-comment-content {
  overflow-y: scroll;
}

.community-note-comment-content::-webkit-scrollbar {
  display: none;
}
</style>
