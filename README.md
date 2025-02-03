# MEDIDRONE - A Node.js JavaScript Project

This document provides instructions on how to set up and run MEDIDRONE locally.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)

## Setup Instructions

### 1. Clone the Repository

```sh
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the required environment variables:

```sh
PORT=3000
MONGO_URI=<mongo_uri>
```

Modify values as needed.

### 4. Run the Project

#### To run API endpoints and database (Backend)

```sh
npm run dev
```

#### To start User Interface

```sh
cd client
npm start
```

## Additional Notes

- Ensure MongoDB is running before starting the project.

## Assumptions

1. **Maximum Drone Carrying Capacity**: 1kg
2. **Battery Capacity**:
   - Minimum: 2,000mAh
   - Maximum: 10,000mAh
3. **Battery Drainage**:
   - The drone's battery drains linearly from 100% to 0%.
   - A background scheduled job runs every **minute**, reducing battery level by **2%** for drones are in **DELIVERING** or **RETURNING** states, regardless of drone capacity.
4. **Order Delivery**:
   - All orders are transported from **Source A** to **Destination B**.
5. **Order Status Flow**:
   - **LOADING → DELIVERING → DELIVERED**
6. The system will select a drone for the given orders based on the weight of the medication and the availability of drones.

## Features

1. **Drone Management**
   - Create and view drones.
2. **Medication Management**
   - Create and view medication details.
3. **Order Management**
   - Create and view orders.
   - Orders start in **LOADING** state and can transition to **DELIVERING** and **DELIVERED** via UI.
4. **Dashboard**
   - Provides an overview of the system with summary charts:
     - **Drone count by status** (LOADING, DELIVERING, DELIVERED, etc.).
     - **Battery levels of drones**.
5. **Report Generation**
   - **Drone Status Report**: View the status of all drones.
   - **Battery Level Log Report**: Generate a PDF report of battery levels within a user-specified time range.

## Technology Stack

- **Frontend**: ReactJS + Ant Design (UI Framework)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
