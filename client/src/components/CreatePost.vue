<template>
    <div>
            <b-row>
                <b-col>
                    <div>
                        <b-card  >
                            <b-card-header>
                                <b-form-input size="lg"
                                v-model="newPost.card_title"
                                type="text"
                                required
                                placeholder="Enter Title"
                                ></b-form-input>
                            </b-card-header>
                            <br>
                            <vue-editor id="editor"  v-model="newPost.content" :editorToolbar="customToolbar"> </vue-editor>  
                            <b-card-footer class="bg-primary text-white mt-2">
                                <b-row >
                                    <b-col cols="7">  
                                          <b-form-file v-model="newPost.image" class="mt-1" plain></b-form-file>
                                    </b-col>
                                    <b-col cols="5">
                                        <button @click="reset" class="btn btn-danger mr-2">Reset</button>
                                        <button @click="makePreviewPost" class="btn btn-success">Preview</button>
                                    </b-col>
                                </b-row>
                                
                            </b-card-footer>
                        </b-card>
                    </div>
                </b-col>
                <b-col>
                    <b-card>
                    <div class="my-2">
                    <h1>Preview</h1>
                    <br>
                    <Post v-if="showPreview" v-bind:preview="true" :post="test"/>
                    </div>
                    
                    </b-card>

                </b-col>
            </b-row>
            <div>
            
            </div>      
    </div>
</template>


<script>
import { VueEditor } from "vue2-editor";

import Post from './Post.vue'
export default {
    name:'CreatePost',
    components:{
        Post,
        VueEditor
    },
    data(){
        return {
            newPost:{
                card_title:'', // So changes can only be seen on clicking preview
                content:'',
            },
            customToolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["code-block"],
                    [{ 'script': 'sub'}, { 'script': 'super' }],     
                    [{ 'indent': '-1'}, { 'indent': '+1' }],          
                    [{ 'direction': 'rtl' }],                         
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                ],
            showPreview:true, // This variable is imp, have a look in Post module doc to understand 
            test:{ // This object goes to Post module
                    card_title:"",
                    card_text:"",
                    card_img:"",
                    card_author: this.$store.state.username,
                    card_author_id: this.$store.state.id,
                    
            }
        }

    },
    methods: {
        makePreviewPost(){
            this.test.card_text=this.newPost.content
            this.test.card_title=this.newPost.card_title
            var reader= new FileReader()
            reader.readAsDataURL(this.newPost.image)
            reader.addEventListener('loadend', ()=> {  
             this.test.card_img= reader.result
        },false)
            
        },
        reset(){
            this.newPost.card_title=""
            this.newPost.content=""
            this.test.card_title=""
            this.test.card_text=""
            this.test.card_img=""
            this.test.card_author=""
            this.test.card_author_id=""

        },
        addPost(){
            // Here We can add axios call to add post and reload the page :)
        }
    },
}
</script>


<style scoped>

</style>
