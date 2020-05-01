<template>
    <div>
        <transition-group name="search-list" tag="div" class="gallery" mode="out-in" > 
            <div class="gallery-brick" v-for="(picture, index) in allpicture" :key="picture.id" v-if="show">
                <div class="photos">
                <img loading="lazy" :src="picture.regular" :alt="picture.altdesc" @click="clickmodal(index)">
                <h5 class="user">{{ picture.name }}</h5>
                <svg @click="addlike(picture)" :class="{ saved : issaved(picture.id) }" class="love" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path class="lovefill" d="M24.85 10.126c2.018-4.783 6.628-8.125 11.99-8.125 7.223 0 12.425 6.179 13.079 13.543 0 0 .353 1.828-.424 5.119-1.058 4.482-3.545 8.464-6.898 11.503L24.85 48 7.402 32.165c-3.353-3.038-5.84-7.021-6.898-11.503-.777-3.291-.424-5.119-.424-5.119C.734 8.179 5.936 2 13.159 2c5.363 0 9.673 3.343 11.691 8.126z" fill="#c03a2b"/><path d="M6 18.078a1 1 0 01-1-1c0-5.514 4.486-10 10-10a1 1 0 110 2c-4.411 0-8 3.589-8 8a1 1 0 01-1 1z" fill="#ed7161"/></svg>
                </div>
            </div>
        </transition-group>
        <modal :allpicture="allpicture" :currentmodal="modal"></modal>
    </div>
</template>

<script>
import Modal from '~/components/Modal'

export default {
    components:{
        Modal,
    },
    props:{
        searchterm:{
            type: String,
            required: true
        },
        show:{
            type: Boolean,
            required: true
        }
    },
    data(){
        return{
            allpicture: [],
            pages: 1,
            infinite: false,
            modal: { show: false, index : 0},
        }
    },
    methods:{
    clickmodal(index){
      this.modal.show = true
      this.modal.index = index
    },
    async getdata(search){
       await this.$axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=30&query=${search}&order_by=popular`,{
            headers: {
              Authorization:
                `Client-ID ${process.env.UNSPLASH_KEY}`,
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
          name : "",
          userimg : "",
          userportfolio : "",
          // order: 0,
          searchterm : "",
        }
        
        picture.id = res.data.results[i].id
        picture.likes = res.data.results[i].likes
        // picture.desc = res.data.results[i].description
        picture.altdesc = res.data.results[i].alt_description
        picture.regular = res.data.results[i].urls.regular
        picture.full = res.data.results[i].urls.full
        picture.download = res.data.results[i].links.download_location
        picture.name = res.data.results[i].user.name
        picture.userimg = res.data.results[i].user.profile_image.medium
        picture.userportfolio = res.data.results[i].user.links.html
        picture.searchterm = search

        if(res.data.results[i].description != null){
          if(res.data.results[i].description.length <= 50){
            picture.desc = res.data.results[i].description
          }
          else{
            picture.desc = res.data.results[i].description.slice(0,50)
          }
        }

        this.allpicture.push(picture)
      }
      if(this.allpicture.length == 0){ this.empty = true} else {this.empty = false}
    }).then(() => {
      setInterval(() => {
        this.resizeAllGridItems()
      }, 100);
    }).catch(e => console.log(e))
    },
    async moredata(search,pages){
       await this.$axios.get(`https://api.unsplash.com/search/photos?page=${pages}&per_page=30&query=${search}&order_by=popular`,{
            headers: {
              Authorization:
                `Client-ID ${process.env.UNSPLASH_KEY}`,
                 "Accept-Version": "v1"
            }
          }).then( res => {
      console.log(res.data)
      for(var i = 0; i < res.data.results.length ; i ++){

        const picture = {
          id: "",
          likes : 0,
          desc : "",
          altdesc : "",
          regular : "",
          full : "",
          download : "",
          name : "",
          userimg : "",
          userportfolio : "",
          searchterm : "",
        }

        picture.id = res.data.results[i].id
        picture.likes = res.data.results[i].likes
        // picture.desc = res.data.results[i].description
        picture.altdesc = res.data.results[i].alt_description
        picture.regular = res.data.results[i].urls.regular
        picture.full = res.data.results[i].urls.full
        picture.download = res.data.results[i].links.download_location
        picture.name = res.data.results[i].user.name
        picture.userimg = res.data.results[i].user.profile_image.medium
        picture.userportfolio = res.data.results[i].user.links.html
        picture.searchterm = search

        if(res.data.results[i].description != null){
          if(res.data.results[i].description.length <= 50){
            picture.desc = res.data.results[i].description
          }
          else{
            picture.desc = res.data.results[i].description.slice(0,50)
          }
        }

        this.allpicture.push(picture)
        
      }
      if(this.allpicture.length == 0){ this.empty = true}
    }).catch(e => console.log(e))
    },
    resizeGridItem(item){
      const grid = document.getElementsByClassName("gallery")[0];
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowSpan = Math.ceil((item.querySelector('.photos').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
      item.style.gridRowEnd = "span "+rowSpan;
    },
    resizeAllGridItems(){
      const allItems = document.getElementsByClassName("gallery-brick");
      for(var x=0; x < allItems.length ; x++){
          this.resizeGridItem(allItems[x]);
      }
    },
    checkfinite(){
      if((document.documentElement.scrollTop + window.innerHeight) >= (Math.ceil(document.documentElement.offsetHeight)-750)){
        this.infinite = true
      }
      else { this.infinite = false }
    },
    infinitescroll(){   
        this.pages += 1
        this.moredata(this.searchterm, this.pages) 
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
  },
  mounted(){ 
    this.getdata(this.searchterm)   
    window.addEventListener('scroll', this.checkfinite)
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.checkfinite)
  },
  watch:{
    infinite(){
      if(this.infinite){
        this.infinitescroll()
      }
    },
    allpicture(){
        this.$emit("loaddata", this.allpicture)
    }
  },

}
</script>

<style>

</style>