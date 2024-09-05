# Ecommerce Store - Angular Project

This is an **Ecommerce Store** built using **Angular**. The project showcases an ecommerce platform with product CRUD, category filtering, search functionality, pagination, add, remove to cart and checkout page. It connects to a mock backend (JSON server) for managing product data.



## Project Setup

### Prerequisites
Make sure you have the following installed:
- **Node.js** 
- **npm** (Node Package Manager)
- **Angular CLI** 

### Installation

1. **Clone the repository:**
   
   ```bash
   https://github.com/muhammadshajjar/ecommerce-app-angular.git
   cd ecommerce-app-angular
   ```

3. **Install dependencies:**
   
   ```bash
   npm install
    ```
### Running the Application

1. **Start the JSON Server:**
   
    We use a JSON server to simulate a backend for product data. Run the following command to start the server:
   
   ```bash
   npx json-server --watch db.json
    ```
   This will serve the db.json file located in the root directory, which contains mock product data.


2. **Start the Angular Application:**

   After installing dependencies, start the application using:
   
   ```bash
    npm start
    ```
    This will run the Angular app on `http://localhost:4200/`.
   
### Running the Test

1. **Unit Test:**
   
   To run the unit tests, use the following command:
   
   ```bash
    ng test
    ```
   This will launch the test runner in the browser and run all the tests.

### Demo

  Please find demo video below

https://github.com/user-attachments/assets/9047659b-8ee4-489a-88c1-b8f40bd5aa64

