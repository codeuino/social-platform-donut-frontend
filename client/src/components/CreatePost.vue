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
                            <b-card-footer class="bg-light text-white mt-2">
                                <b-row >
                                    <b-col cols="6">  
                                          <b-form-file v-model="image" class="mt-1" plain></b-form-file>
                                    </b-col>
                                    <b-col cols="6">
                                        <button  @click="reset" class="btn btn-danger mr-1">Reset</button>
                                        <button :disabled="checkText" @click="makePreviewPost" class="btn btn-success mr-1">Preview</button>
                                        <button :disabled="checkText" @click="addPost" class="btn btn-primary">Submit</button>
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
import FrontendValidation from '@/services/ValidationService'
import Post from './Post.vue'
export default {
    name:'CreatePost',
    components:{
        Post,
        VueEditor
    },
    data(){
        return {
            image:'',
            newPost:{
                card_title:'', // So changes can only be seen on clicking preview
                content:'',
                card_author: this.$store.state.userDetails.username,
                card_author_id: this.$store.state.userDetails.id,
                card_image:''
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
            test:{ // This object goes to Post module, we can't send newPost directly to Post module cause first we need to render the file send via form using Reader()
                    card_title:"",
                    card_text:"",
                    card_img:"",
                    card_author: this.$store.state.userDetails.username,
                    card_author_id: this.$store.state.userDetails.id,
                    
            }
        }

    },
    computed:{
        checkText(){
            return (this.newPost.card_title=='' || this.newPost.content=='')
        }
    },
    methods: {
        makePreviewPost(){
            this.test.card_text=this.newPost.content
            this.test.card_title=this.newPost.card_title
            var reader= new FileReader()
            if(this.image){
                reader.readAsDataURL(this.image)
                reader.addEventListener('loadend', ()=> {  
                this.test.card_img= reader.result
                this.newPost.card_image= reader.result
            },false)    
            }
            
            
        },
        reset(){
            this.newPost.card_title=""
            this.newPost.content=""
            this.test.card_title=""
            this.test.card_text=""
            this.test.card_img=""

        },
        addPost(){
            console.log(this.newPost)
            //Here we will send to backend XD
        }
    },
}
</script>


<style scoped>

</style>
