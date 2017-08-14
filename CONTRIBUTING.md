# Contributing to this project

We recommend you adhere to the following steps when committing your changes:

### Committing changes:

1.  When working on a new feature, or an update to an existing feature, make sure to do your work on a branch other than `master`.
2.  Once you are on your new branch run `git pull --rebase origin master`.  This will ensure you have the most current version of the master branch before you begin working on any changes.
3.  When you are finished with your feature, add and commit your changes, and push using `git push origin <branch-name>` (without the angle brackets).
4.  Another member of your team will take a look at your code, notify you of any merge conflicts.  Once all conflicts are resolved, that team member will merge your branch into the master branch.
5.  Change back to your local master branch and run `git pull` to update your master with the merged changes.

### On commit size
Try to keep your commits as small as possible.  You are welcome to group multiple files into one commit if the changes to those files are all relevant to the same feature.  Avoid including more than one feature change in one commit.

### Dependencies
Be careful when adding new dependencies to your project.  When your project has unexpected bugs and/or broken features after running `git pull`, one likely cause is a dependency change.  If you decide to add or remove a dependency, make sure to notify the rest of your team so that they know to re-run `npm install` after they pull the latest version of master.

### Ideas for new features
*  Back-end
  *  Add email verification on signup
  *  Improve CRON job to send periodic reminders if a capsule has not yet been opened
  *  Add a new CRON job to remind users X weeks ahead of unearth date
*  Front-end
  *  Add a tutorial capsule for new users
  *  Add calendar to bury modal
  *  Add the ability to send capsules to other users
  *  Add the ability to send capsules to non-users, including some kind of unique access token to securely access capsules via email or some other means. 
  *  Add the ability to videa/audio/image/word files to a capsule. Also the ability to access the webcam, microphone, and camera on your local device to be able to record audio or video messages or take a picture to then add directly to the capsule. 
