<template>
    <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card >
        <v-subheader>마이페이지</v-subheader>
        <v-list-tile avatar>
            <v-list-tile-content>
                <v-list-tile-title>First Name</v-list-tile-title>
                <v-list-tile-sub-title>{{userInfo.first_name}}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile avatar>
            <v-list-tile-content>
                <v-list-tile-title>Last Name</v-list-tile-title>
                <v-list-tile-sub-title>{{userInfo.last_name}}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile >
            <v-list-tile-content>
                <v-list-tile-title>Avatar</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-card pa-5>
            <v-img 
            :src=userInfo.avatar
            aspect-ratio="2.75"
            >   
            </v-img>
        </v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex"
export default{
    computed: {
       ...mapState(["userInfo"])
    }
}
</script>