<template>
  <div class="content">
    <div class="header">
      <h1>My <span class="head">Collection ({{ count }})</span></h1>
      <h3 @click="goback" class="back">⇽ Back</h3>
    </div>
    <!-- <div class="gallery" > -->
    <transition-group name="gallery-list" tag="div" class="wholegallery" mode="out-in" >
      <div v-for="(value, name, index) in allpicture" :key="name" v-if="show">
        <h2 class="gallery-title"><nuxt-link class="nuxt-link-active" :to="{ path: `/${name}`}">{{ name }}</nuxt-link></h2>
        <transition-group name="picture-list" tag="div" class="gallery-2">
          <div class="gallery-brick-2" v-for="(picture, index) in value" :key="picture.id">
            <div class="photos" >
              <img loading="lazy" :src="picture.regular" :alt="picture.altdesc" @click="clickmodal(name,index)">
              <h5 class="user">{{ picture.name }}</h5>
              <svg @click="addlike(picture)" :class="{ saved : issaved(picture.id) }" class="love" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path class="lovefill" d="M24.85 10.126c2.018-4.783 6.628-8.125 11.99-8.125 7.223 0 12.425 6.179 13.079 13.543 0 0 .353 1.828-.424 5.119-1.058 4.482-3.545 8.464-6.898 11.503L24.85 48 7.402 32.165c-3.353-3.038-5.84-7.021-6.898-11.503-.777-3.291-.424-5.119-.424-5.119C.734 8.179 5.936 2 13.159 2c5.363 0 9.673 3.343 11.691 8.126z" fill="#c03a2b"/><path d="M6 18.078a1 1 0 01-1-1c0-5.514 4.486-10 10-10a1 1 0 110 2c-4.411 0-8 3.589-8 8a1 1 0 01-1 1z" fill="#ed7161"/></svg>
            </div>
          </div>
        </transition-group>
      </div>
    </transition-group>
    <modal :allpicture="allpicture" :currentmodal="modal"></modal>
  </div>
</template>

<script>
import Modal from '~/components/Modal'
export default {
  components:{ Modal },
  data(){
      return{
          modal: { show: false, index : 0},
          show: true
      }
  },
  transition: 'fade',
  computed: {
      count(){
        return this.$store.state.saved.count
      },
      picture(){
        return this.$store.state.saved.liked
      },
      allpicture(){
        const grouppicture = {}
        if(this.picture.length > 0){
        for (var i = 0; i < this.picture.length ; i ++){
          const temp = this.picture[i].searchterm
          if(grouppicture[temp] == undefined){ 
            grouppicture[temp] = [this.picture[i]]}
          else(grouppicture[temp].push(this.picture[i]))
        }  
        }
        const temp = Object.entries(grouppicture).sort()
        const temp2 = Object.fromEntries(temp)
        return temp2
      }
  },
  methods:{
    goback(){
          this.$router.back()
    },
    clickmodal(name, index){
      this.modal.show = true
      this.modal.index = index
      this.modal.name = name
    },
    issaved(id){
      const temp = this.$store.state.saved.liked.filter(data => {if(data.id == id) return data.id})
      if (temp.length > 0)
        return true
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
    resizeGridItem(item){
      const grid = document.getElementsByClassName("gallery-2")[0];
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowSpan = Math.ceil((item.querySelector('.photos').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
      item.style.gridRowEnd = "span "+rowSpan;
    },
    resizeAllGridItems(){
      const allItems = document.getElementsByClassName("gallery-brick-2");
      for(var x=0;x<allItems.length;x++){
          this.resizeGridItem(allItems[x]);
      }
    }
  },
  updated(){
    setTimeout(() => {
      this.resizeAllGridItems()
    }, 500);
  },
  mounted(){
    setTimeout(() => {
      this.resizeAllGridItems()
    }, 500);
  }
}
</script>

<style>
.back{
    cursor: pointer;
}
</style>