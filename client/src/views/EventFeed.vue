<template>
    <div class="feed-wrapper">
        <b-container>
            <h1 class="feed-heading">Events for you</h1>
            <hr>
            <div class="feed-content">
                <div class="event-card">
                    <span>Thu, 26 July 2018</span>
                    <h3>Event Name</h3>
                    <h5>By Organiser Name</h5>
                    <hr>
                    <p>
                    <v-icon class="mr-2">fa-map-marker</v-icon> XYZ Road, Delhi
                    </p>
                    <div class="detail-btn bg-primary">
                        <center>
                            <button>View</button>
                        </center>
                    </div>
                </div>
                <div class="event-card">
                    <span>Thu, 26 July 2018</span>
                    <h3>Event Name</h3>
                    <h5>By Organiser Name</h5>
                    <hr>
                    <p>
                    <v-icon class="mr-2">fa-map-marker</v-icon> XYZ Road, Delhi
                    </p>
                    <div class="detail-btn bg-primary">
                        <center>
                            <button>View</button>
                        </center>
                    </div>
                </div>
                <div class="event-card">
                    <span>Thu, 26 July 2018</span>
                    <h3>Event Name</h3>
                    <h5>By Organiser Name</h5>
                    <hr>
                    <p>
                    <v-icon class="mr-2">fa-map-marker</v-icon> XYZ Road, Delhi
                    </p>
                    <div class="detail-btn bg-primary">
                        <center>
                            <button>View</button>
                        </center>
                    </div>
                </div>
                <div class="event-card">
                    <span>Thu, 26 July 2018</span>
                    <h3>Event Name</h3>
                    <h5>By Organiser Name</h5>
                    <hr>
                    <p>
                    <v-icon class="mr-2">fa-map-marker</v-icon> XYZ Road, Delhi
                    </p>
                    <div class="detail-btn bg-primary">
                        <center>
                            <button>View</button>
                        </center>
                    </div>
                </div>
                <div class="event-card">
                    <span>Thu, 26 July 2018</span>
                    <h3>Event Name</h3>
                    <h5>By Organiser Name</h5>
                    <hr>
                    <p>
                    <v-icon class="mr-2">fa-map-marker</v-icon> XYZ Road, Delhi
                    </p>
                    <div class="detail-btn bg-primary">
                        <center>
                            <button>View</button>
                        </center>
                    </div>
                </div>
                <div class="event-card">
                    <span>Thu, 26 July 2018</span>
                    <h3>Event Name</h3>
                    <h5>By Organiser Name</h5>
                    <hr>
                    <p>
                    <v-icon class="mr-2">fa-map-marker</v-icon> XYZ Road, Delhi
                    </p>
                    <div class="detail-btn bg-primary">
                        <center>
                            <button>View</button>
                        </center>
                    </div>
                </div>
                <div class="event-card">
                    <span>Thu, 26 July 2018</span>
                    <h3>Event Name</h3>
                    <h5>By Organiser Name</h5>
                    <hr>
                    <p>
                    <v-icon class="mr-2">fa-map-marker</v-icon> XYZ Road, Delhi
                    </p>
                    <div class="detail-btn bg-primary">
                        <center>
                            <button>View</button>
                        </center>
                    </div>
                </div>

            </div>
        </b-container>
    </div>
</template>

<script>
export default {
  name: 'EventFeed'
}
</script>

<style scoped>
h1 {
    font-size:48px;
}
.feed-content {
    margin-top:50px;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-row-gap: 20px;
}
.event-card {
    position: relative;
    width: 350px;
    padding: 5px;
    border: 1px solid rgb(50, 50, 231);
    border-radius: 10px;
    min-height: 250px;
    max-height: 250px;
}
.event-card > h5 {
    font-weight: 200;
    font-size: 14px;
}
.event-card > p {
    margin-top: 30px;
}
.detail-btn {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px 0;
    left: 0;
    color:white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.event-card > span {
    color:grey;
    font-weight: 900;
}
</style>
