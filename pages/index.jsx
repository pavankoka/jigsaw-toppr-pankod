import React, { useState, useEffect } from "react";
import useWindowSize from "hooks/useWindowSize";
import Input from "src/utils/input";
import { useRouter } from "next/router";

import styles from "./index.module.scss";

function Index() {
    const router = useRouter();
    const size = useWindowSize();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pointerX, setPointerX] = useState(-20);
    const [pointerY, setPointerY] = useState(-20);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowLogin(true);
        }, 500);
    }, []);

    function onMouseMove(e) {
        const newPointerX = e.nativeEvent.offsetX / size.width;
        const newPointerY = e.nativeEvent.offsetY / size.height;
        setPointerX(-newPointerX * 20);
        setPointerY(-newPointerY * 20);
    }

    function handleSubmit() {
        if (email === password) {
            localStorage.setItem("email", email);
            localStorage.setItem("timer", 0);
            router.push("/puzzle");
        }
    }

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.image}
                style={{ left: `${pointerX}px`, top: `${pointerY}px` }}
            >
                <img layout="fill" src="/images/itachi.jpg" alt="itachi" />
            </div>
            <div className={styles.content} onMouseMove={onMouseMove}>
                <h1 className={styles.title}>
                    If you have to ask, you’ll never know. If you know, you need
                    only ask
                </h1>
                <div
                    style={{
                        height: showLogin ? "430px" : "0",
                    }}
                    className={styles.boxWrapper}
                >
                    <div className={styles.login}>
                        <p className={styles.header}>Login</p>
                        <Input
                            value={email}
                            placeholder="Email"
                            styles={{ marginBottom: "50px" }}
                            onChange={({ value }) => setEmail(value)}
                        />
                        <Input
                            value={password}
                            placeholder="Password"
                            type="password"
                            styles={{ marginBottom: "50px" }}
                            onChange={({ value }) => setPassword(value)}
                        />
                        <p className={styles.button} onClick={handleSubmit}>
                            submit
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
