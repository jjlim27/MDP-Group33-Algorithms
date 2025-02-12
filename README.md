# MDP-Group33-Algorithms

## Setup Instructions

### Simulator (React Application)

> **Prerequisite:** Ensure that you have `yarn` installed.

1. Navigate to the `/sim` directory and install the required dependencies:
   ```sh
   yarn
   ```
2. In the same directory, start the application:
   ```sh
   yarn start
   ```
3. The Algorithm Simulator will now be running at [http://localhost:3000](http://localhost:3000).
   - The page will reload automatically when you make changes.

---

### Algorithm Server (Python)

> **Prerequisite:** Ensure that you have Python installed.

1. Navigate to the `/algor` directory.
2. Create a Python virtual environment and activate it:
    ```
   `python -m venv .venv
    . .venv/Scripts/activate
     ```
4. Install the required packages:
   ```sh
   pip install -r requirements.txt
   ```
5. Start the application:
   ```sh
   uvicorn main:app --reload
   ```
6. The Algorithm Server will now be running at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

## Quick Startup Script

Run the following commands to quickly start the algorithm server:
```sh
cd algorithms-python
. .venv/Scripts/activate
uvicorn main:app --reload
