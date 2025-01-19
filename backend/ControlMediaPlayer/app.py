from flask import Flask, jsonify
from flask_cors import CORS
import threading
import cv2
import mediapipe as mp
import pyautogui
import time

app = Flask(__name__)
CORS(app)

# Global variables to control the thread
running = False
thread = None


def count_fingers(lst):
    """Counts the number of fingers shown in the hand landmark data."""
    cnt = 0
    thresh = (lst.landmark[0].y * 100 - lst.landmark[9].y * 100) / 2

    if (lst.landmark[5].y * 100 - lst.landmark[8].y * 100) > thresh:
        cnt += 1

    if (lst.landmark[9].y * 100 - lst.landmark[12].y * 100) > thresh:
        cnt += 1

    if (lst.landmark[13].y * 100 - lst.landmark[16].y * 100) > thresh:
        cnt += 1

    if (lst.landmark[17].y * 100 - lst.landmark[20].y * 100) > thresh:
        cnt += 1

    if (lst.landmark[5].x * 100 - lst.landmark[4].x * 100) > 6:
        cnt += 1

    return cnt


def run_hand_gesture_detection():
    """Starts the hand gesture detection process."""
    global running
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Unable to access the camera.")
        running = False
        return

    drawing = mp.solutions.drawing_utils
    hands = mp.solutions.hands
    hand_obj = hands.Hands(max_num_hands=1)

    start_init = False
    prev = -1

    try:
        while running:
            end_time = time.time()
            ret, frm = cap.read()
            if not ret:
                print("Error: Unable to read from the camera.")
                break

            frm = cv2.flip(frm, 1)
            res = hand_obj.process(cv2.cvtColor(frm, cv2.COLOR_BGR2RGB))

            if res.multi_hand_landmarks:
                hand_keyPoints = res.multi_hand_landmarks[0]
                cnt = count_fingers(hand_keyPoints)

                if not (prev == cnt):
                    if not start_init:
                        start_time = time.time()
                        start_init = True
                    elif (end_time - start_time) > 0.2:
                        if cnt == 1:
                            pyautogui.press("right")
                        elif cnt == 2:
                            pyautogui.press("left")
                        elif cnt == 3:
                            pyautogui.press("up")
                        elif cnt == 4:
                            pyautogui.press("down")
                        elif cnt == 5:
                            pyautogui.press("space")

                        prev = cnt
                        start_init = False

                drawing.draw_landmarks(frm, hand_keyPoints, hands.HAND_CONNECTIONS)

            cv2.imshow("Hand Gesture Detection", frm)

            if cv2.waitKey(1) == 27:  # ESC key
                running = False
                break

    finally:
        cap.release()
        cv2.destroyAllWindows()


@app.route('/start', methods=['GET'])
def start_gesture_detection():
    """Starts the hand gesture detection thread."""
    global running, thread
    if not running:
        running = True
        thread = threading.Thread(target=run_hand_gesture_detection)
        thread.start()
        return jsonify({"status": "Gesture detection started"})
    else:
        return jsonify({"status": "Gesture detection already running"})


@app.route('/stop', methods=['GET'])
def stop_gesture_detection():
    """Stops the hand gesture detection thread."""
    global running, thread
    if running:
        running = False
        if thread is not None:
            thread.join()  # Ensure the thread finishes before proceeding
        return jsonify({"status": "Gesture detection stopped"})
    else:
        return jsonify({"status": "Gesture detection is not running"})


if __name__ == '__main__':
    app.run(debug=True)
