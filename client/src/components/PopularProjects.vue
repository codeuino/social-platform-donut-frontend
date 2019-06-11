<template>
	<div>
		<b-card>
			<b-card-title>Popular Projects<b-card-title/>
			<b-card-text>
				<b-list-group>
				<b-list-group-item></b-list-group-item>
				</b-list-group>
			</b-card-text>
		</b-card>
	</div>
</template>
<script>
	export default {
		name:"Popularprojects",
		data() {
			return {
				projects:[]
			}
		},
		mounted() {
			//fetch from backend :)
			this.projects=[{
				test:'test'
			}]
		},
	}

</script>
