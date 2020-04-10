<template>
  <div class="content">
    <div class="header">
      <h1>Welcome to <span class="head">Pinterest</span></h1>
      <div class="search">
        <input type="text" class="searchtext" placeholder="Search keywords" v-model="searchterm" @keyup.enter="submit">
        <div v-if="recent != 0" class="searchdrop">
          <div class="recent" v-for="(search, index) in recent" :key="index" ><div @click="searchrecent(search)" style="flex-grow: 1;cursor:pointer;">{{ search }}</div>
            <svg @click="removerecent(search)" height="682.656" viewBox="0 0 511.992 511.992" class="removesearch" xmlns="http://www.w3.org/2000/svg"><path d="M415.402 495.422l-159.406-159.41L96.59 495.422c-22.098 22.094-57.922 22.094-80.02 0-22.093-22.098-22.093-57.922 0-80.02l159.41-159.406L16.57 96.59c-22.093-22.098-22.093-57.922 0-80.02 22.098-22.093 57.922-22.093 80.02 0l159.406 159.41L415.402 16.57c22.098-22.093 57.922-22.093 80.02 0 22.094 22.098 22.094 57.922 0 80.02l-159.41 159.406 159.41 159.406c22.094 22.098 22.094 57.922 0 80.02-22.098 22.094-57.922 22.094-80.02 0zm0 0"/></svg>
          </div>
        </div>
      </div>
    </div>

      <transition-group name="gallery-list" tag="div" class="gallery">
        <div class="photos" v-for="(picture, index) in allpicture" :key="picture.id " >
          <img :src="picture.regular" :alt="picture.altdesc" @click="openmodal(index)">
          <h5 class="user">{{ picture.name }}</h5>
          <svg @click="addlike(picture)" :class="{ saved : issaved(picture.id) }" class="love" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path class="lovefill" d="M24.85 10.126c2.018-4.783 6.628-8.125 11.99-8.125 7.223 0 12.425 6.179 13.079 13.543 0 0 .353 1.828-.424 5.119-1.058 4.482-3.545 8.464-6.898 11.503L24.85 48 7.402 32.165c-3.353-3.038-5.84-7.021-6.898-11.503-.777-3.291-.424-5.119-.424-5.119C.734 8.179 5.936 2 13.159 2c5.363 0 9.673 3.343 11.691 8.126z" fill="#c03a2b"/><path d="M6 18.078a1 1 0 01-1-1c0-5.514 4.486-10 10-10a1 1 0 110 2c-4.411 0-8 3.589-8 8a1 1 0 01-1 1z" fill="#ed7161"/></svg>
        </div>
      </transition-group>

    <div class="modal" @click="closemodalwindow">
      <span class="close" @click="closemodal">&times;</span>
      <div class="modalcontent">
        <img class="modalimg" :src="modaldata.full" :alt="modaldata.altdesc">
        <div class="modaltext">
          <h5 class="modaluser">{{ modaldata.name }}</h5>
          <h1 class="modaldesc">{{ modaldata.desc }}</h1>
          <svg @click="addlike(modaldata)" :class="{ saved : issaved(modaldata.id) }" class="love modallove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path class="lovefill" d="M24.85 10.126c2.018-4.783 6.628-8.125 11.99-8.125 7.223 0 12.425 6.179 13.079 13.543 0 0 .353 1.828-.424 5.119-1.058 4.482-3.545 8.464-6.898 11.503L24.85 48 7.402 32.165c-3.353-3.038-5.84-7.021-6.898-11.503-.777-3.291-.424-5.119-.424-5.119C.734 8.179 5.936 2 13.159 2c5.363 0 9.673 3.343 11.691 8.126z" fill="#c03a2b"/><path d="M6 18.078a1 1 0 01-1-1c0-5.514 4.486-10 10-10a1 1 0 110 2c-4.411 0-8 3.589-8 8a1 1 0 01-1 1z" fill="#ed7161"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      allpicture: [],
      searchterm: "",
      modaldata: {},
      collection : this.$store.state.saved.liked,
    }
  },
  computed:{
    recent(){
      return this.$store.state.saved.recent
    },
  },
  methods:{
    async getdata(search){
       await this.$axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=30&query=${search}&order_by=popular`,{
            headers: {
              Authorization:
                "Client-ID LI0gjYfm3P1sbM2ld_2fBXjcwswHM6TZDg442pJEdtw",
                 "Accept-Version": "v1"
            }
          }).then( res => {
      this.allpicture = []
      for(var i = 0; i < res.data.results.length ; i ++){

        const picture = {
          id: "",
          likes : 0,
          desc : "",
          altdesc : "",
          regular : "",
          full : "",
          download : "",
          name : ""
        }

        picture.id = res.data.results[i].id
        picture.likes = res.data.results[i].likes
        picture.desc = res.data.results[i].description
        picture.altdesc = res.data.results[i].alt_description
        picture.regular = res.data.results[i].urls.regular
        picture.full = res.data.results[i].urls.full
        picture.download = res.data.results[i].links.download_location
        picture.name = res.data.results[i].user.name

        this.allpicture.push(picture)
      }

      console.log(this.allpicture)
    }).catch(e => console.log(e))
    },
    submit(){
      const str = this.searchterm.replace(/\s+/g, '-').toLowerCase();
      this.getdata(str)

      if(this.$store.state.saved.recent.includes(this.searchterm) != true){
        this.$store.commit('saved/recentsearch', this.searchterm)}
      document.querySelector('.searchtext').blur()
      this.searchterm = ""
    },
    openmodal(index){
      document.querySelector(".modal").style.display = "block"
      document.querySelector("body").style.overflow = "hidden"

      this.modaldata = this.allpicture[index]
    },
    closemodal(){
      this.modaldata = {}
  
      document.querySelector(".modal").style.display = "none"
      document.querySelector("body").style.overflow = "visible"
    },
    closemodalwindow(e){
      if(e.target === document.querySelector(".modal")){
        this.closemodal()
      }
    },
    addlike(picture){
      const temp = this.$store.state.saved.liked.filter(data => {if(data.id == picture.id) return data.id})
      if (temp.length == 0 ){
        this.$store.commit('saved/saved', picture)}
      else {this.$store.commit('saved/remove', picture)}
    },
    issaved(id){
      const temp = this.$store.state.saved.liked.filter(data => {if(data.id == id) return data.id})
      if (temp.length > 0)
        return true
    },  
    removerecent(data){
      this.$store.commit('saved/removesearch', data)
    },
    searchrecent(data){
      this.getdata(data)
    }
  },
  mounted(){
    this.getdata('tree')   
  }
}
</script>

<style>





</style>