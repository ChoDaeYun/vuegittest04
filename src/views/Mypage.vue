<template>
    <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card >
        <v-subheader>마이페이지</v-subheader>
        <v-list-tile avatar>
            <v-list-tile-content>
                <v-list-tile-title>First Name</v-list-tile-title>
                <v-list-tile-sub-title>{{first_name}}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile avatar>
            <v-list-tile-content>
                <v-list-tile-title>Last Name</v-list-tile-title>
                <v-list-tile-sub-title>{{last_name}}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile >
            <v-list-tile-content>
                <v-list-tile-title>Avatar</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-card pa-5>
            <v-img 
            :src=avatar
            aspect-ratio="2.75"
            >   
            </v-img>
        </v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios"
export default{
    data() {
        return {
            first_name:null,
            last_name:null,
            avatar:""
        }
    },
    created() {
        axios
          .get("https://reqres.in/api/users/2")
          .then(response => {
              this.first_name = response.data.data.first_name
              this.last_name = response.data.data.last_name
              this.avatar = response.data.data.avatar
          })
          .catch(() => {

          })
    },
}
</script>