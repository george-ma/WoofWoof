# WoofWoof - Team 4

## Iteration 3 - Review & Retrospect

- When: Nov 30
- Where: BA 3200

#### Decisions that turned out well

- Pair Programming
  - After we all had a chance to work on the pair programming assignment, we decided working this way would help improve productivity.
  - Tasks could be assigned to pairs such that each task would have one expert working on it. For instance, we had paired programming sessions that helped guide the backend team to make meaningful contributions to the frontend.
- Switching app to be a native mobile app.
  - We wanted to take advantage of the native features of the phone and using cordova was the easiest way to do it.
  - We are now able to use the camera and the photo library of the phone to upload photos for the "Add New Dog" and "Create New Event" forms.

#### Decisions that did not turn out as well as we hoped

- Roles and Responsibilities
  - Reflecting on our experience after 2 deliverables, we realized that it would have been easier to have split roles by individual views, instead of splitting roles by front end and backend.
  - This way, progress on getting functional views would not be slowed down by miscommunication with the backend.
  - By allowing people to work on individual views, this would allow each person to take sole responsibility of the functionality of each page, and allow them to make sure for instance, that end points were connected and communicating properly with the frontend.
- Using Spring-Boot
  - It turns out we could have used a lighter and simpler webserver such as flask or node.
  - This way data persistance and loading could have been implemented much simpler between the front end and database.


#### Planned changes

List any process-related changes you are planning to make (if there are any)

- Migrate this app over to ionic 4.
  > Ionic 4 has many new features that take advantage of the existing features of angular which it is built on. (routing, lifecycle hooks, etc)
- Create tests
  > We realized that more bugs were showing up the bigger our app gets. We were also reusing older components which started to expose many bugs we didn't see before. This could be solved by writing tests.
  - e2e tests
  - unit tests
  - integration tests

## Product - Review

#### Goals and/or tasks that were met/completed:

- Allowed users to add new dogs and upload picture of their dog from either the camera or photo library.
- Allowed users to modify events they are hosting.
- Show all events user is attending/hosting (not part of original plan)
- Implemented the skeleton for a newsfeed/forum section for our app (not part of original plan)

#### Goals and/or tasks that were planned but not met/completed:

- Did not get to implement invite other guests to events.
    - This was a low priority task that could only be done after we finished all the other tasks.
    - Since we cut it late, we just didn't get to implement this feature.

## Meeting Highlights

Going into the next iteration, our main insights are:

- Allow users to invite other users to events.
- Implement a newsfeed/forum that will act like the 'discover' page on websites like Twitter and Instagram. This will allow users to interact with their community at large and explore events they may not normally have seen.
