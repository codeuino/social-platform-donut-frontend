### **Problem**
new and robust schema needed for users, project and notification.
### **Issue this PR referred to**
Fixes issue number 146, Refer to this [link](https://github.com/codeuino/Social-Platform-Donut/issues/146) for more details_

### **Solution of problem**
I added some new fields to the schema of the user.js, project.js and notification.js

# in notification.js
- added field shortinfo(type:string) for short description about notification.
# in user.js
- added field website(type:string) for any personal website user has.
- added followerList and followingList(type:\[number]) to include the name of all the followers and following.
- add field status(type:string) for status of user.
- added field school(type:string) for user's schoolname.
- added field collegeTimeperiod and schoolTimeperiod (type:\[Date]) for time period of college and school respectively.
- added field blockedUser(type:\[Number]) for keeping track of all users blocked.
# in project.js
- added field endAt(type:\[Date]) as to when is the deadline.
- added field shortDesc(type:String) for one liner description of the project.
- added field linkedUser(type:\[Number]) for all the people linked with project.

### **Before and After Screenshots**

### **Type of Change**
- Small refactor

### **Checklist**
- My code follow the same style as the codebase
- My Code changed required change in documentation
- I have updated the Readme accordingly
- I made PR within **development branch only**
