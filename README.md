Working of Contact App

First I have created component file to store all the components.
1.Index.tsx
I have a index.tsx file to use store to store the data of contacts and give the access of store to entire app and also have the appRouter for single page application.

2.App.tsx
Added aal components and added paths to it using react router.

3.Dashboard.tsx
I have created a simple dashboard 

4.Sidebar.tsx
This component is used for render sidebar for every component.This the is the best practice to render for reacct router.

5.Contact.tsx
This is the main component that manages the state and interactions between the various subcomponents (ContactList and Modal). It handles adding, editing, viewing, and deleting contacts.

6.Modal.tsx
This component provides a form for creating, editing, or viewing a contact. It is rendered as a modal dialog.

7. ContactList.tsx
This component displays a list of contacts and provides buttons to edit, view details, or delete each contact.
The component renders a list of contact items.
For each contact, it displays the first and last name, and three buttons (View Details, Edit, Delete).
If there are no contacts, it displays a message indicating that no contacts were found.

8.Store.tsx,contactSlice.tsx
This 2 files are used to manage storage for contact data
 configureStore is used to set up the Redux store with reducers and middleware.
 The store is configured with a single reducer for managing contact data, which is wrapped with persistence capabilities using redux-persist

contactSilice  is used to create a slice of the Redux store. A slice includes a reducer and actions for managing a part of the Redux state.

This is the working of the contact application



Map and Chart
To render the chart and map with the covid data I created one component named as Graphs.tsx…react-leaflet is used to display the covid map.
Leaflet is a popular open-source JavaScript library for interactive maps, and react-leaflet wraps this functionality in React components, making it easier to use Leaflet with React.

This component have imported 2 components one is to render the chart and another one is for Map.

MapComponent.tsx
 is a React functional component that displays a map using Leaflet and overlays markers for COVID-19 data of various countries. It utilizes React Query for fetching data from an external API and manages the data's loading and error states.
https://disease.sh/v3/covid-19/countries
This api is used to fetch the countires from api 


LineChartComponent.tsx
The LineChartComponent is a React component that displays a line chart of COVID-19 case fluctuations over time. It uses the recharts library for chart rendering and react-query for data fetching.
https://disease.sh/v3/covid-19/historical/all?lastdays=all
This api is used to fetch the data for cases over days

This how the Map and chart component works…


