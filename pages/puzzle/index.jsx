import React, { useState, useEffect } from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import styles from "./index.module.scss";

function Puzzle() {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setTimer(currentTimer => {
                const updatedTime = parseInt(currentTimer, 10) + 1;
                localStorage.setItem("timer", updatedTime);
                return updatedTime;
            });
        }, 1000);
        setTimer(localStorage.getItem("timer"));
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.timer}>
                <p className={styles.digit}>
                    {parseInt(parseInt(timer / 60, 10) / 10, 10) % 10}
                </p>
                <p className={styles.digit}>{parseInt(timer / 60, 10) % 10}</p>
                <p className={styles.pointer}>:</p>
                <p className={styles.digit}>
                    {parseInt(parseInt(timer % 60, 10) / 10, 10) % 10}
                </p>
                <p className={styles.digit}>{(timer % 60) % 10}</p>
            </div>
            <div className={styles.puzzle}>
                <JigsawPuzzle
                    imageSrc="https://images.unsplash.com/photo-1641494281169-9670fffcd52e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
                    rows={4}
                    columns={4}
                    onSolved={() => alert("Solved!")}
                />
            </div>
        </div>
    );
}

export default Puzzle;
