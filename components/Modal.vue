<template>
    <div class="modal" @click="closemodalwindow">
      <span class="close" @click="closemodal">&times;</span>
      <div class="modalcontent">
        <svg class="arrow left"  @click="left()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M423.386 248.299l-256-245.327c-4.208-4.021-10.833-3.958-14.927.167l-64 63.998a10.655 10.655 0 00.219 15.291L272.47 256.007 88.678 429.586a10.655 10.655 0 00-.219 15.291l64 63.998a10.634 10.634 0 007.542 3.125c2.656 0 5.313-.979 7.385-2.958l256-245.327a10.696 10.696 0 000-15.416z"/></svg>
        <svg class="arrow right" @click="right()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M423.386 248.299l-256-245.327c-4.208-4.021-10.833-3.958-14.927.167l-64 63.998a10.655 10.655 0 00.219 15.291L272.47 256.007 88.678 429.586a10.655 10.655 0 00-.219 15.291l64 63.998a10.634 10.634 0 007.542 3.125c2.656 0 5.313-.979 7.385-2.958l256-245.327a10.696 10.696 0 000-15.416z"/></svg>
        <img v-on:dblclick="addlike(modaldata)" class="modalimg" :src="modaldata.regular" :alt="modaldata.altdesc">
        <div class="modaltext">
          <h4 @click="golink(modaldata.userportfolio)" class="modaluser">{{ modaldata.name }}</h4>
          <h1 class="modaldesc">{{ modaldata.desc }}</h1>
          <svg @click="addlike(modaldata)" :class="{ saved : issaved(modaldata.id) }" class="love modallove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path class="lovefill" d="M24.85 10.126c2.018-4.783 6.628-8.125 11.99-8.125 7.223 0 12.425 6.179 13.079 13.543 0 0 .353 1.828-.424 5.119-1.058 4.482-3.545 8.464-6.898 11.503L24.85 48 7.402 32.165c-3.353-3.038-5.84-7.021-6.898-11.503-.777-3.291-.424-5.119-.424-5.119C.734 8.179 5.936 2 13.159 2c5.363 0 9.673 3.343 11.691 8.126z" fill="#c03a2b"/><path d="M6 18.078a1 1 0 01-1-1c0-5.514 4.486-10 10-10a1 1 0 110 2c-4.411 0-8 3.589-8 8a1 1 0 01-1 1z" fill="#ed7161"/></svg>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
      return{
          modaldata: {},
      }
  },
  props:{
      allpicture: [Array,Object],
      currentmodal: {
          type: Object,
          default:{
              show: {
                type: Boolean,
                default: false
              },
              index: {
                type: Number,
                default: 0
              },
              name: {
                type: String,
                required : false,
              }
          }
      }
  },
  watch:{
      'currentmodal.show': function(){
          if(this.currentmodal.show == true){
          this.openmodal(this.currentmodal.index)
          window.onkeyup = event => this.keyevent(event)
          }
          else{
          window.onkeyup = null
          }
      },
  },
  methods:{
    keyevent(event){
      if( event.code === "ArrowRight"){
        this.right()
      }
      if( event.code === "ArrowLeft"){
        this.left()
      }
      if( event.code === "Escape"){
        this.closemodal()
      }
    },
    openmodal(index){
      document.querySelector(".modal").style.display = "block"
      document.querySelector("body").style.overflow = "hidden"

      

      if(this.currentmodal.name == undefined || this.currentmodal.name == null ){
        this.modaldata = this.allpicture[index]
        this.currentmodal.index = index

        if(this.currentmodal.index == this.allpicture.length - 1){
        document.querySelector('.right').style.display = 'none'
        }
        else{
          document.querySelector('.right').style.display = 'block'
        }
      }
      else{
        this.modaldata = this.allpicture[this.currentmodal.name][index]
        this.currentmodal.index = index

        if(this.currentmodal.index == this.allpicture[this.currentmodal.name].length - 1){
        document.querySelector('.right').style.display = 'none'
        }
        else{
          document.querySelector('.right').style.display = 'block'
        }
      }

      if(this.currentmodal.index == 0){
        document.querySelector('.left').style.display = 'none'
      }
      else{
        document.querySelector('.left').style.display = 'block'
      }
    },
    closemodal(){
      this.modaldata = {}
      this.currentmodal.show = false
      document.querySelector(".modal").style.display = "none"
      document.querySelector("body").style.overflow = "visible"
    },
    closemodalwindow(e){
      if(e.target === document.querySelector(".modal")){
        this.closemodal()
      }
    },
    issaved(id){
      const temp = this.$store.state.saved.liked.filter(data => {if(data.id == id) return data.id})
      if (temp.length > 0)
        return true
    },
    left(){
      if(this.currentmodal.index > 0 ){
        this.openmodal(this.currentmodal.index - 1)
      }
    },
    right(){
      if(this.currentmodal.name == undefined || this.currentmodal.name == null ){
        if(this.currentmodal.index < this.allpicture.length -1){
          this.openmodal(this.currentmodal.index + 1)
        }
      }
      else{
        if(this.currentmodal.index < this.allpicture[this.currentmodal.name].length - 1){
          this.openmodal(this.currentmodal.index + 1)
        }
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
    golink(link){
      window.open(link)
    },       
    },
}
</script>

<style>

</style>