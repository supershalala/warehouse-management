

![License](https://img.shields.io/badge/License-mit-green.svg)

# SMS Powered Warehouse Management Tool

[![Application homepage](https://drive.google.com/uc?export=view&id=1tXtty4tQnGgOEM1dc1ZagJ_06x5Hb7nX)](https://drive.google.com/file/d/1tXtty4tQnGgOEM1dc1ZagJ_06x5Hb7nX/view?usp=sharing)

## Deployed Application

The SMS Powered Warehouse Management Tool is deployed on Heroku. You can access the application using the following link:

[Heroku App](https://pure-badlands-83368-dd42fcea0889.herokuapp.com/)


or vistit the repo for more information

[GitHub Repo](https://github.com/supershalala/warehouse-management)

## Description

- To build my first Full-Stack MERN application

### Why
- I wanted to test my skills using the MERN stack and make something useful for work since they provided the opportunity for me to the boot camp

### Problem this app solves
- I hate having my staff constantly download different management apps, so I thought why not just use the phone number as that is the only constant

### Learnings
- Twilio API, MERN, Apollo, HEROKU Deployment

## Table of contents:

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Installation

- Code editor (e.g. Visual Studio Code)
- Modern web browser (e.g. Google Chrome, Mozilla Firefox)

## Usage

Before using the SMS Powered Warehouse Management Tool, you need to follow these steps:

1. **Twilio API Integration**:
   - Sign up for a Twilio account: To utilize the SMS functionality of the application, you need to sign up for a Twilio account. Visit the Twilio website (https://www.twilio.com/) to create an account and obtain your Twilio credentials.
   - Set up Twilio in the application: Once you have your Twilio credentials (Account SID, Auth Token, and Twilio Phone Number), open the `.env` file in the root directory of the application and add the following variables:

     ```
     TWILIO_ACCOUNT_SID=<your_twilio_account_sid>
     TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
     TWILIO_PHONE_NUMBER=<your_twilio_phone_number>
     ```

     Replace `<your_twilio_account_sid>`, `<your_twilio_auth_token>`, and `<your_twilio_phone_number>` with your actual Twilio credentials.

2. **Installation**:
   - Ensure you have Node.js and npm installed on your machine.
   - Open the terminal and navigate to the root directory of the application.
   - Run the following command to install the required dependencies:

     ```
     npm install
     ```

3. **Running the Application**:
   - Once the dependencies are installed, you can start the application by running the following command:

     ```
     npm run dev
     ```

   This command will concurrently run the server and the client, making the application accessible in your web browser.

4. **Using the Application**:
   - Open your web browser and go to the following URL to access the application:

     ```
     http://localhost:3000
     ```

   - Upon opening the application, you will be prompted to sign up using your phone number. Enter the required information and click the "Sign Up" button.
   - After signing up, you will receive an SMS verification code on the provided phone number. Enter the code to complete the verification process.
   - Once verified, you will have access to the warehouse management features provided by the application.
   - Use the SMS functionality to send commands and receive updates regarding warehouse tasks and inventory management. For example, you can send a command to check the status of a specific task or update the inventory count for a particular item.
   - The application will process your commands and provide relevant information and updates via SMS notifications.

## Contributing

### To contribute to our project, please follow these steps:

- Fork the repository and create a new branch for your changes.
- Make your changes and commit them to your branch.
- Push your changes to your forked repository.
- Submit a pull request to our repository.
- Please provide a clear and descriptive title for your pull request, along with a detailed description of the changes you have made. We also ask that you include any relevant tests or documentation updates with your changes.

## License

This project is licensed under the MIT License.

![License](https://img.shields.io/badge/License-mit-green.svg)

## Questions

If you have any questions or feedback on the project, feel free to reach out to me at:

- Email: ashalala93@gmail.com
- GitHub: https://github.com/supershalala
