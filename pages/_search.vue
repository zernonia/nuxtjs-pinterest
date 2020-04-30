<template>
  <div class="content">
    <div class="header">
      <h1>Welcome to <span class="head">{{ $route.params.search}}</span></h1>
      <div class="search">
        <input type="text" @focus="dropbox" @blur="blurbox" class="searchtext" placeholder="Search keywords" v-model="searchterm" @keyup.enter="submit">
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
    <!-- <transition-group name="search-list" tag="div" class="gallery" mode="out-in"> 
      <div class="gallery-brick" v-if="show" v-for="(picture, index) in allpicture" :key="picture.id">
        <div class="photos">
          <img :src="picture.regular" :alt="picture.altdesc" @click="clickmodal(index)">
          <h5 class="user">{{ picture.name }}</h5>
          <svg @click="addlike(picture)" :class="{ saved : issaved(picture.id) }" class="love" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path class="lovefill" d="M24.85 10.126c2.018-4.783 6.628-8.125 11.99-8.125 7.223 0 12.425 6.179 13.079 13.543 0 0 .353 1.828-.424 5.119-1.058 4.482-3.545 8.464-6.898 11.503L24.85 48 7.402 32.165c-3.353-3.038-5.84-7.021-6.898-11.503-.777-3.291-.424-5.119-.424-5.119C.734 8.179 5.936 2 13.159 2c5.363 0 9.673 3.343 11.691 8.126z" fill="#c03a2b"/><path d="M6 18.078a1 1 0 01-1-1c0-5.514 4.486-10 10-10a1 1 0 110 2c-4.411 0-8 3.589-8 8a1 1 0 01-1 1z" fill="#ed7161"/></svg>
        </div>
      </div>
    </transition-group> -->
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
      searchterm: this.$route.params.search,
      collection : this.$store.state.saved.liked,
      empty: false,
      show: true,
    }
  },
  transition (to,from){
      return from.name === 'collection' ? 'fade' : 'none'
  },
  computed:{
    recent(){
      return this.$store.state.saved.recent
    },
  },
  watch:{
    infinite(){
      if(this.infinite){
        this.infinitescroll()
      }
    }
  },
  methods:{
    loaddata(params){
      this.allpicture = params
    },
    clickmodal(index){
      this.modal.show = true
      this.modal.index = index
    },
    submit(){
      const str = this.searchterm.replace(/\s+/g, '-').toLowerCase();
      // this.getdata(str)
      this.$router.push({ path: `/${str}`})

      if(this.$store.state.saved.recent.includes(this.searchterm) != true){
        this.$store.commit('saved/recentsearch', this.searchterm)}
      document.querySelector('.searchtext').blur()
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
    },
    blurbox(){
      const search = document.querySelector('.searchtext')
      search.style.borderBottomLeftRadius = "1.2em"
      search.style.borderBottomRightRadius = "1.2em"
    },
    golink(link){
      window.open(link)
    },
  },
  beforeRouteUpdate (to, from, next){
    this.show = false
    setTimeout(() => {
        next()
    }, 100);
  } 

}
</script>
