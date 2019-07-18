<template>
    <div class="event-wrapper">
        <div class="event-heading-wrapper">
            <b-container>

                <div class="event-heading">
                    <h1>EVENT NAME - 12/22/2019 </h1>
                    <h4><b>Organised By</b> Organiser Name</h4>
                    <h5><b>Venue -</b> XYZ Road, Delhi</h5>
                </div>
            </b-container>
        </div>
        <div class="event-body-wrapper">
            <b-container>
                <div class="event-body">
                    <div class="event-content">
                        <h2>Description</h2>
                        <hr>
                        <div class="Content">
                            <p>
                            Lorem ipsumdolor sit amet, consectetur adipisicing elit. Temporibus alias voluptatibus pariatur velit consequatur! Blanditiis eligendi vero harum officiis autem sit voluptatem aliquam placeat commodi atque, eaque eveniet voluptates fugiat!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem nihil officia unde fugit! Nobis nihil illo dolores sint quae labore recusandae dolorem vel, blanditiis perspiciatis? Recusandae quisquam dolorum laborum placeat.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptatem cum autem? Ut, sit dolorum. Incidunt, culpa sit. Hic aut voluptatum nobis veritatis architecto eligendi dolore error nesciunt placeat harum.
                            </p>
                            <ul>
                                <li>test</li>
                                <li>test</li>
                                <li>test</li>
                                <li>test</li>
                                <li>test</li>
                            </ul>
                        </div>
                        <div class="event-img">
                            <img src="@/assets/meeting.jpg" alt="">
                        </div>
                        <div class="invitation">
                            <b-container>
                                <h4>Are  you attending?</h4>
                            </b-container>
                            <div class="ResponseDiv">
                                <button class="response-btn">Yes</button>
                                <button class="ml-2 response-btn">No</button>
                            </div>
                        </div>
                    </div>
                    <div class="event-venue">
                        <h2>Venue</h2>
                        <hr>
                        <div class="detailFlex">
                            <div class="detail-icon">
                                <v-icon>fa-clock</v-icon>
                            </div>
                            <div class="detail-content">
                                Friday 30th August 2019
                            </div>
                        </div>
                        <br>
                        <div class="detailFlex">
                            <div class="detail-icon">
                                <v-icon>fa-map-marker</v-icon>
                            </div>
                             <div class="detail-content">
                                XYZ Road, Delhi
                             </div>
                        </div>
                        <br>
                        <h4>For More information, Contact</h4>
                        <hr>
                        <div class="detailFlex">
                            <div class="detail-icon">
                                <v-icon>fa-phone</v-icon>
                            </div>
                             <div class="detail-content">
                                +91-xxx-xxx-xxx
                             </div>
                        </div>
                        <br>
                        <div class="detailFlex">
                            <div class="detail-icon">
                                <v-icon>fa-envelope</v-icon>
                            </div>
                             <div class="detail-content">
                                test@gmail.com
                             </div>
                        </div>
                        <div class="map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.001101633675!2d77.3698669155167!3d28.629729082418816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce551491b3ce7%3A0x7335d9fcfd4d9db0!2sJAYPEE+INSTITUTE+OF+INFORMATION+TECHNOLOGY!5e0!3m2!1sen!2sin!4v1563196412718!5m2!1sen!2sin"  frameborder="0" style="border:0" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </b-container>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Event'
}
</script>

<style scoped>
.event-heading > h4, h5{
    font-weight: 200
}
.event-heading-wrapper {
    background-color: rgb(25, 26, 99);
    color: white;
    padding-bottom: 10px;
    position: fixed;
    box-shadow: 0px 3px 8px rgb(10, 11, 44);
    width: 100%;
}
.event-body {
    margin-top: 200px;
    display: grid;
    grid-template-columns: 60% auto;
    grid-gap: 20px;
}
 .event-venue {
    padding:10px;
    max-height:480px;
    border: 1px solid rgba(0,0,0,0.6);
    border-radius: 10px;
}
.event-content {
    padding: 10px;
    border: 1px solid rgba(0,0,0,0.6);
    border-radius: 10px;
}
.ResponseDiv {
    display: flex;
    justify-content: center;
}
.response-btn {
    padding: 8px 40px;
    color: white;
    background-color: grey;

}
.event-img {
    margin: 0 2px;
}
.event-img > img {
    width: 100%;
    max-height: 600px;
}
.detailFlex {
    display: grid;
    grid-template-columns: 10% auto;
    grid-gap: 2px;
}
.map > iframe {
    margin-top: 10px;
    width: 100%;
}
</style>
