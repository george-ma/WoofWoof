# WoofWoof (Team 04)

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 01

 * Start date: October 4
 * End date: October 13

## Process

_This entire section is optional. Note that you will have to fill it out and more for the next 3 deliverables so it's good to start soon and get feedback._ 

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

* **Backend (SpringBoot)**
  * Malavan
  * Tiger
  * George
* **Frontend (Ionic)**
  * Grace
  * Rohan
  * Matthew
#### Events

Describe meetings (and other events) you are planning to have:

* When and where? In-person or online?
* What's the purpose of each meeting?
  * **Thursday (Morrison)**: 
    * What is everyone doing over the weekend?
  * **Monday (Tutorial)**: 
    * Review what we did over the weekend.
      * Did we finish everything?
      * Who needs help?
      * How was your weekend?
    * Get TA feedback.
  * **Daily Scrum**:
    * Do you have any blockers?
    * Do you need help?
* Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.
  * **Iteration 1 (Oct 4)**: 
    * Demoed wireframes made by **Grace** and **George** to the rest of the group for critique and feedback.
    * Figured out team roles and meeting dates.
    * Looked over when certain people will be busy (assignments, midterms, etc.).
  * **Iteration 1 Review (OCt 5)**:
    * Solidify our deliverable 1.
    * Polish up the wireframes.
#### Artifacts

List/describe the artifacts you will produce in order to organize your team.       

* Artifacts can be To-do lists, Task boards, schedule(s), etc.
  * Trello:
    * Task management
    * Task prioritization
  * Daily check-in:
    * Checkup on everyone so there are no surprises for the tea meetings.
  * Iteration 1 plan:
    * High-level overview of the features for the MVP.
* We want to understand:
  * How do you keep track of what needs to get done?
  * How do you prioritize tasks?
  * How do tasks get assigned to team members?

## Product

_This entire section is mandatory._

#### Goals and tasks

 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.

Map
* Find events on the map.
* Create new events from picking locations on the map (bring up event management/creation page).
* Map will have the following mechanisms:
  * Pins for every park/off leash dog park.
  * Pins specify if there is an event at the park or not.
  * Check-in mechanism for when someone goes to a park event or non-event related.


Event Management/Creation Page
* Browse events in events page.
* Events have the following attributes:
  * Location
  * Date
  * People going
  * public/private

User Account/Profile
* Theres should be a user profile page that shows what your profile looks like to others.
* There should also be an option to edit your profile.
* User profiles have the following attributes:
  * username
  * picture
  * email 
  * dog (optional)

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.

Mockup Tools
* UML
* Wireframes

Tech Stack
* Backend
  * SpringBoot
  * MongoDB
* Frontend
  * Ionic

High-level Tasks (MVP)
* Setup MongoDB by defining our collections (users, events, dog parks).
* Setup REST endpoints with SpringBoot.
* Setup google map for ionic frontend (retrieve current locations/dog parks around).
* Host backend/frontend so that it is publicly accessible. 