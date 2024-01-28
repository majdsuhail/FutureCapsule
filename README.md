# FutureCapsule

FutureCapsule is a web app that allows users to create their own time capsule by providing information such as capsule name, description, content, and the date and time the capsule should be opened. The capsule opens on the specified date and reveals its content, which can be accessed by pressing on the capsule after the shown date has passed. The app utilizes SQLite3 as the database, Flask as the backend server, and a combination of HTML, CSS, JavaScript, jQuery, AJAX, and Bootstrap for the frontend.

## Features

- **Create a Time Capsule:** Fill in the capsule name, description, content, and the required future date and time using the provided form.
- **Capsule Viewing Options:** The app offers three viewing options: "All," "Opened," and "Closed." These buttons display the last 50 capsules from the SQLite3 database based on their status.
- **Search Feature:** Search for capsules using either the capsule name or ID. Choose between searching by name or ID by pressing the respective buttons before typing into the search bar.

## Capsule Details

Each capsule displays the following information:

- Content (only after it opens)
- Date Published
- Open Date
- Name
- Description
- Capsule ID

## Usage

1. Visit [FutureCapsule](https://majdsuhail.pythonanywhere.com/).
2. Explore existing capsules by clicking on "All," "Opened," or "Closed."
3. Use the search feature to find specific capsules by name or ID.
4. Create a new time capsule by clicking on the "Create a Time Capsule" button.

## Deployment

The app is deployed using [PythonAnywhere](https://www.pythonanywhere.com/). Access the live app at [FutureCapsule](https://majdsuhail.pythonanywhere.com/).

## Requirements

- Flask
- SQLite3
- jQuery
- Bootstrap

## Installation

To run the app locally, make sure you have the required dependencies installed. You can install them using:

```bash
pip install Flask
pip install jquery
pip install bootstrap
```

```bash
pip install -r requirements.txt
```

## Code Overview

- **app.py**: Flask backend with SQLite3 database interactions.
- **static/**: Folder containing CSS and JavaScript files.
- **templates/**: HTML templates for different pages.

## License

This project is licensed under the MIT License.
