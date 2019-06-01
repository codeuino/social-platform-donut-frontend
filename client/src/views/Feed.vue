<template>
    <div>
        <div>
        <b-jumbotron  :header="Welcome">
        </b-jumbotron>
        </div>

        <!-- div for create post button -->
        <div>
            <b-container>
                <b-button v-b-modal.modal-1 class="bg-primary btn-lg">Create a Post </b-button>
                <b-modal size="xl" id="modal-1"  title="Create A Post">
                    <CreatePost />
                </b-modal>
            </b-container>
        </div>

        <b-container >
        <b-row v-for="(group , index ) in posts" v-bind:key="index">
            <b-col class="mt-3" cols md="6">
                <Post v-bind:post="group[0]" />
            </b-col >
            <b-col class="mt-3" cols md="6">
                <Post v-bind:post="group[1]" />
            </b-col>
        </b-row>
        </b-container>
        
    </div>
</template>

<script>
import CreatePost from '@/components/CreatePost.vue'
import Post from '@/components/Post.vue'
export default {
    name:'Feed',
    components:{
        Post,
        CreatePost
    },
    data(){
        return {
            username:"Batman",
            posts:[], // in future it will be replaces by a empty array, and first data will be fetched from server then grouped in twos :) , then added to this state.
        }
    },
    computed: {
        Welcome(){
            return "Welcome, " + this.username
        }
    },
    mounted() {
        let myarr=[
                {
                    card_title:"Project 1",
                    card_text:"This is project 1, a simple machine which fetches news according to time.",
                    card_img:"https://cdn.vuetifyjs.com/images/cards/desert.jpg",
                    card_author:"User 12321",
                    card_author_id:"12232323",
                    comments:[
                        {
                    
                            author:"User 1",
                            author_id:1,
                            comment:"Nice project!",
                            date:'1/22/12', // We can change into date() but for now keep it a string :)

                        },
                        {
                            author:"User 2",
                            author_id:2,
                            comment:"Can you repair my printer",
                            date:'1/22/12', 
                        },
                        {
                            author:"User 3",
                            author_id:3,
                            comment:"JIITians don't pm me",
                            date:"3/12/25"
                        }
                    ]

                },
                {
                    card_title:"Project 2",
                    card_text:"This is project 2, a simple machine which fetches news according to time.",
                    card_img:"https://cdn.vuetifyjs.com/images/cards/desert.jpg",
                    card_author:"User 12321",
                    card_author_id:12232323,
                    comments:[
                        {
                    
                            author:"User 2",
                            author_id:1,
                            comment:"Nice project!",
                            date:'1/22/12', // We can change into date() but for now keep it a string :)

                        },
                        {
                            author:"User 2",
                            author_id:2,
                            comment:"Can you repair my printer",
                            date:'1/22/12', 
                        },
                        {
                            author:"User 3",
                            author_id:3,
                            comment:"JIITians don't pm me",
                            date:"3/12/25"
                        }
                    ]

                },
                {
                    card_title:"Project 3",
                    card_text:"This is project 3, a simple machine which fetches news according to time.",
                    card_img:"https://cdn.vuetifyjs.com/images/cards/desert.jpg",
                    card_author:"User 12321",
                    card_author_id:12232323,
                    comments:[
                        {
                    
                            author:"User 1",
                            author_id:1,
                            comment:"Nice project!",
                            date:'1/22/12', // We can change into date() but for now keep it a string :)

                        },
                        {
                            author:"User 2",
                            author_id:2,
                            comment:"Can you repair my printer",
                            date:'1/22/12', 
                        },
                        {
                            author:"User 3",
                            author_id:3,
                            comment:"JIITians don't pm me",
                            date:"3/12/25"
                        }
                    ]

                }
            ]
            var index=0
            var groups=[]
            var group=[]
            myarr.forEach(function(i){
            if(index%2==0){
                group=[]
                group.push(i)
                groups.push(group)
            }else{
                group.push(i)
            }
            index++
            })
            this.posts=groups // in the above code i took a array of objects (posts), and grouped them into group of two, so I can inject them as props easily. Grid issues in Vue bootstrap :)
    },
}
</script>

