export const state = () => ({
    liked : [],
    count : 0,
})

export const mutations = {
    saved (state, data){
        state.liked.push(data)
        state.count++
    },
    remove (state, id){
        state.liked.splice(state.liked.indexOf(id),1)
        state.count--
    }
}

export const getters = {
    getsaved (state){
        return state.liked
    }
}