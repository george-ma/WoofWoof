# WoofWoof - Team 4

## Iteration 2

* Start date: Oct 18
* End date: Oct 25

#### Roles & responsibilities

The team kept the same roles same as before with Malavan, Tiger, and George on the back-end and Rohan, Grace, and Matthew on the front end.

In addition to our assigned roles, there were times when someone who was working on the frontend would help out someone working on the back-end and vice versa. This was necessary for times when individuals came across blockers they could not get through on there own.

#### Events

Tutorial Meetings (Monday)

* Review what everyone has accomplished over the weekend.
* Address blockers anyone might have.
* Hear feedback from TA and see how to apply this to the upcoming sprint.

Prepare for Weekend Meetings (Thursday)

* Check everyone's schedule for any upcoming deadlines not related to 301.
  * Assign tasks accordingly.
* Address blockers anyone might have with tasks assigned.
* Review any major changes/direction of the app.
* Reprioritize tasks according to any changes/discussion we have during this meeting.

#### Artifacts

* To-Do List: Github Issues
  * These items were then moved to the Kanban board after being assigned.
* Task Boards: Github Projects Kanban Board
  * Task priorities and assignments done on Thursday were recorded here.

#### Git / GitHub workflow

Our workflow began with creating issues on github for work that needed to be done such as features, fixes, etc. One of our team members may choose to work on one or more issues. Typically, we would then create a new branch. Issues that are similar to or have dependency to code written in the new branch would then also work on that branch. When it is felt that it is appropriate to merge the branch onto master, such as when major features are completed, another team member reviews the code and merges the pull request. The other team member should ideally be someone who also works on the same role, either front-end or back-end, but did not work directly on.

## Product

#### Goals and tasks

Backend
* Setup MongoDB cloud instance.
* Setup rest endpoints to load and persist data.
  * Events (Controller, Model, Service)
  * Users (Controller, Model, Service)

Frontend
* Setup the map homepage.
  * Users should be able see near by parks around them.
  * Users should be able to click on the park markers and see upcoming/current events.
  * Users should be able to create new events from the park details page.
* Setup event page.
  * Users should be able to see/search through all events.
  * Users should be able to see a map of the location event through a map.
* Setup user profile
  * View all dogs and be able to change user profile information.

#### Artifacts

* Video
  * Shows primary uses of application
* Wireframes
  * Mock up of final front end
* REST api created with Spring Boot
  * Used MongoDB as database
* Front end created as an Ionic Application.
  * Used google maps api to populate map screen