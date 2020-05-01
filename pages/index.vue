<template>
  <div class="content">
    <div class="header">
      <h1>Welcome to <span class="head">Pinterest</span></h1>
      <div class="search">
        <input type="text" @focus="dropbox" @blur="blurbox" class="searchtext" :placeholder="this.tempsearch" v-model="searchterm" @keyup.enter="submit">
        <div v-if="recent != 0" class="searchdrop">
          <div class="recent" v-for="(search, index) in recent" :key="index" ><div @click="searchrecent(search)" style="flex-grow: 1;cursor:pointer;">{{ search }}</div>
            <svg @click="removerecent(search)" height="682.656" viewBox="0 0 511.992 511.992" class="removesearch" xmlns="http://www.w3.org/2000/svg"><path d="M415.402 495.422l-159.406-159.41L96.59 495.422c-22.098 22.094-57.922 22.094-80.02 0-22.093-22.098-22.093-57.922 0-80.02l159.41-159.406L16.57 96.59c-22.093-22.098-22.093-57.922 0-80.02 22.098-22.093 57.922-22.093 80.02 0l159.406 159.41L415.402 16.57c22.098-22.093 57.922-22.093 80.02 0 22.094 22.098 22.094 57.922 0 80.02l-159.41 159.406 159.41 159.406c22.094 22.098 22.094 57.922 0 80.02-22.098 22.094-57.922 22.094-80.02 0zm0 0"/></svg>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <h2 v-if="empty">No result found...</h2>
    </transition>
    <gallery :searchterm="searchterm" :show="show" :loaddata="loaddata"></gallery>
  </div>
</template>

<script>
import { mutations, state } from '../store/saved'
import Gallery from '~/components/Gallery'

export default {
  components:{
    Gallery
  },
  data(){
    return{
      allpicture: [],
      searchterm: "tree",
      collection : this.$store.state.saved.liked,
      empty: false,
      show: true,
      tempsearch: '',
    }
  },
  transition (to,from){
    if (from != undefined ){
      return from.name === 'collection' ? 'fade' : 'none'}
    else {return 'none'}
  },
  computed:{
    recent(){
      return this.$store.state.saved.recent
    },
  },
  methods:{
    loaddata(params){
      this.allpicture = params
    },
    submit(){
      const str = this.searchterm.replace(/\s+/g, '-').toLowerCase();
      this.$router.push({ path: `/${str}`})

      document.querySelector('.searchtext').blur()
      setTimeout(() => {
        if(this.$store.state.saved.recent.includes(this.searchterm) != true){
          this.$store.commit('saved/recentsearch', this.searchterm)}
      }, 1000);
    },
    removerecent(data){
      this.$store.commit('saved/removesearch', data)
    },
    searchrecent(data){
      // this.getdata(data)
      this.$router.push({ path: `/${data}`})
      this.searchterm = data
    },
    dropbox(){
      const search = document.querySelector('.searchtext')
      if(this.recent != 0){ 
        search.style.borderBottomLeftRadius = "0"
        search.style.borderBottomRightRadius = "0"
        }
      else {
        search.style.borderBottomLeftRadius = "1.2em"
        search.style.borderBottomRightRadius = "1.2em"
      }
      if(this.searchterm != ''){
        this.tempsearch = this.searchterm
        this.searchterm = ''
      }
    },
    blurbox(){
      const search = document.querySelector('.searchtext')
      search.style.borderBottomLeftRadius = "1.2em"
      search.style.borderBottomRightRadius = "1.2em"
    }
  },
  beforeRouteLeave (to, from, next){
    this.show = false
    next()
  },

}
</script>
