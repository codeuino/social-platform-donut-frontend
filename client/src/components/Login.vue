<template>
            <b-container>
                    <b-card class="shadow-lg">
                        <b-card-header class="text-center bg-transparent"><h3 class="card-head">Login</h3></b-card-header>
                        <b-card-body class="my-3">
                            <b-form>
                                <b-form-group
                                label="Email"
                                >
                                <b-form-input
                                size="lg"
                                v-model="email"
                                type="email"
                                placeholder="Enter email"
                                ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                label="Password"
                                >
                                <b-form-input
                                size="lg"
                                v-model="password"
                                type="password"
                                placeholder="Enter Password"
                                ></b-form-input>

                                
                                </b-form-group>

                                <b-form-group class="text-center mt-5">
                                    <b-button type="submit" variant="primary" class="mr-2 btn-lg btn-block">Login</b-button>
                                </b-form-group>

                                <b-form-group class="text-right">
                                    <div>
                                        Not a member? <a href="/welcome?source=signup">Click Here</a>
                                    </div>
                                </b-form-group>
                            </b-form>
                        </b-card-body>
                    </b-card>
            </b-container>
</template>

<script>
export default {
    data () {
        return {
            email:null,
            password:null
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 600px;
    position: relative;
    top:70px;

}
</style>
