import Drive from "../integrations/Drive.png";
import Calendar from "../integrations/Calendar.png";
import Github from "../integrations/Github.png";
import Jitsi from "../integrations/Jitsi.png";
import Trello from "../integrations/Trello.png";
import SimplePoll from "../integrations/SimplePoll.png";

const integrationsList = [
  {
    id: "1",
    integrationName: "Google Drive",
    image: Drive,
    tag: "File Management",
    description: `Use Google Drive within Donut to:
    • Create new Google Docs, Slides, and Sheets files
    • Import an existing file from Google Drive into a channel or direct message
    • Search directly within Google Drive files shared within Donut
    • Automatically grant access to the files you share with the right audience
    • Get updates in Donut on changes in Drive, like comments, access requests, and new files shared with you
    • Reply directly to comment notifications from within Donut and have them posted to the file
    `,
  },
  {
    id: "2",
    integrationName: "Google Calendar",
    image: Calendar,
    tag: "Productivity",
    description: `From viewing your daily schedule or receiving up-to-the-minute reminders, keep your calendar top of mind without leaving Donut. Use Google Calendar in Donut to:
    • Create an event right from Donut using the shortcuts button.
    • Automatically sync your calendar to your Donut status to let your team know when you are in a meeting.
    • See a holistic view of your daily schedule from Donut.
    • Get notified when an event is starting soon, and join a Hangout, Zoom, Webex, or Microsoft Teams meeting directly from the calendar reminder in Donut.
    • Respond directly to event invitations.
    • Get updated when an event’s details change, and change your response as needed.
    `,
  },
  {
    id: "3",
    integrationName: "Github",
    image: Github,
    tag: "Developer Tools",
    description: `Bring your code to the conversations you care about with the GitHub and Donut app. With two of your most important workspaces connected, you’ll get updates about what’s happening on GitHub—without leaving Donut.
    Subscribe to repositories
    Use /github subscribe [owner/repo] in Donut to start receiving updates about that project.
    Stay up to date
    Get updates about what’s happening with your repositories in Donut discussions for activities like:
    • New commits
    • New pull requests
    • New issues
    • Code reviews
    • Deployment statuses
    See the details
    Give your team more information in Donut when you share links to GitHub activities and properties like:
    • Pull requests
    • Issues
    • Linked comments
    • Code snippets
    • Developer profiles
    Take actions with slash commands
    Donut conversations often lead to decisions and actionable takeaways. Now it’s easier to start on next steps from Donut with slash commands for common GitHub actions, using  /github [action] [resource]. For example, these commands let you:
    • Close an issue or pull request
    • Reopen an issue or pull request
    • Open a new issue using a Donut dialog
    Using an older version of GitHub and Donut? Installing the new integration will allow you to migrate subscriptions from legacy versions. GitHub Enterprise and Donut Enterprise Grid are not yet supported.
    `,
  },
  {
    id: "4",
    integrationName: "Jitsi Meet",
    image: Jitsi,
    tag: "Communication",
    description: `Jitsi Meet is an OpenSource (Apache License)  application that provides large scale video conferences for your browser or your mobile. No accounts or pin-codes are necessary. Just click the link and you are in!
    This integration adds the /jitsi slash command for your team so that you can start a video conference in your channel, making it easy for everyone to just jump on the call. Just type /jitsi into your channel and a conference link will be provided in the channel. Additionally, you can send direct messages to users by mentioning their username in the command.
    In addition to simple video calls Jitsi Meet also lets you join over the phone, stream to YouTube and collaboratively edit documents.
    `,
  },
  {
    id: "5",
    integrationName: "Trello",
    image: Trello,
    tag: "Prodictivity",
    description: `Trusted by millions, Trello is the visual collaboration tool that creates a shared perspective on any project.
    Link your Trello and Donut teams to harness the power of productivity with the Trello app for Donut, and create a seamless and collaborative workflow between your favorite apps.
    With Trello for Donut, you can:
    • Add new Trello cards to boards directly from Donut with /trello add
    • Join Trello cards (and boards!), change due dates, attach conversations and a lot more.
    • Invite @trello to a channel for automated card & board previews including members, descriptions, comments and more.
    • Allow Donut team members to join your Trello team & boards in one click.
    `,
  },
  {
    id: "6",
    integrationName: "Simple Poll",
    image: SimplePoll,
    tag: "Productivity",
    description: `With Simple Poll, you can create native and simple polls, right within Slack.
    Get your colleagues’ thoughts in minutes; not in the next meeting.
    Need to decide on whether to proceed with a candidate? The next step with a customer? A favourite product design? Or even where to go to lunch on Thursday? Simple Poll provides an effortless and collaborative way to make these decisions.
    `,
  },
];

export default integrationsList;
