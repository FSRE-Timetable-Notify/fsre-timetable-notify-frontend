# FSRE Timetable Notifier Frontend

Frontend for the FSRE Timetable Notifier project. Made with Typescript, React, and Tailwind.

## Components

The web app is made up of 2 main components: the timetable view and the sign-up form.

### Timetable view

The timetable view serves 2 purposes: to verify that the backend is receiving the correct information, and to serve an alternative, more modern UI which displays the timetable events.

There are additional controls which allow you to select the study program to view, and the week of the year.

### Sign-up form

The sign-up form is where users can input their email address to receive notifications about timetable changes. The changes are detected by the backend and propagated to each email, depending on the study program. Each email can correspond to multiple study programs, allowing users to listen to multiple timetables.
