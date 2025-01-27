# Hand Gesture Recognition for Keyboard Control

This project leverages **OpenCV**, **MediaPipe**, and **PyAutoGUI** to recognize hand gestures and translate them into keyboard inputs. By counting the number of fingers held up, the program can trigger different keypress events, making it possible to control applications or games without a keyboard. A React-based front-end is also included for better visualization and interaction.

## Features

- **Gesture Recognition:** Detects the number of fingers held up using MediaPipe's hand landmarks.
- **Keyboard Control:** Maps each gesture to a different keypress (e.g., one finger = right arrow key, two fingers = left arrow key, etc.).
- **Real-time Processing:** Processes webcam input in real-time, offering immediate response to gestures.
- **React Dashboard:** A front-end interface displays live camera input, recognized gestures, and corresponding keypress actions.

---

## How It Works

1. **Hand Detection:** MediaPipe detects and tracks hand landmarks using the webcam feed.
2. **Finger Counting:** A custom function calculates the number of extended fingers based on landmark positions.
3. **Key Pressing:** The program triggers specific keypress events using PyAutoGUI, depending on the number of fingers detected.
4. **React Visualization:** The front-end built with React displays live video, recognized gestures, and mappings.

### Key Mappings

- **1 Finger:** Right arrow key  
- **2 Fingers:** Left arrow key  
- **3 Fingers:** Up arrow key  
- **4 Fingers:** Down arrow key  
- **5 Fingers:** Space key  

---

## Installation

To run this project, you need Python, Node.js, and npm installed. Follow the instructions below:

### Backend Installation (Python)

1. Install the required Python libraries:

```bash
pip install opencv-python mediapipe pyautogui flask
```

2. Run the Python backend:

```bash
python main.py
```

### Frontend Installation (React)

1. Navigate to the `react-app` folder:

```bash
cd react-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

---

## Usage

1. Clone the repository:

```bash
git clone https://github.com/yourusername/hand-gesture-keyboard-control.git
```

2. Navigate to the project directory:

```bash
cd hand-gesture-keyboard-control
```

3. Follow the installation instructions for both the backend and frontend.

4. Access the React app in your browser (default: [http://localhost:3000](http://localhost:3000)) to see live video, detected gestures, and key mappings in action.

---

## Example Images

Here are some screenshots of the application in action:

**Backend Hand Detection:**

![1_clagIwqV2gdz-UoAcpOKAg](https://github.com/user-attachments/assets/7899fccb-ff3d-429c-b783-08572cc42bf2)

*Figure 1: The program detects points in the hand.*

**React Front-End Visualization:**

![hand](https://github.com/user-attachments/assets/b2a82f4d-3e5b-4811-82ec-1a1821befe2e)

*Figure 2: Front-end displaying hand gesture and corresponding key.*

---

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Contributions are always welcome!

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
