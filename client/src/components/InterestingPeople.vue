
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
		name:"InterestingPeople",
		data() {
			return {
				profiles:[]
			}
		},
		mounted() {
			//fetch from backend :)
			this.profiles=[{
				test:'test'
			}]
		},
	}

</script>
