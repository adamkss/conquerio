import LayoutSetup from "../components/layoutSetup"
import React, { useRef, useEffect, useState } from 'react';
import SecondaryButton from "../components/SecondaryButton";
import PrimaryButton from "../components/PrimaryButton";
import {SillyHandwritingWithOption} from '../components/visual/SillyHandwriting';

export default () => {
    const mainContentRef = useRef(null);
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);

    useEffect(() => {
        const scrollEventListener = () => {
            const scrollTop = mainContentRef.current.scrollTop;
            if (scrollTop >= 50) {
                setIsHeaderSticky(true);
            } else {
                setIsHeaderSticky(false);
            }
        };

        mainContentRef.current.addEventListener('scroll', scrollEventListener);
        return () => {
            mainContentRef.current.removeEventListener('scroll', scrollEventListener);
        }
    }, []);

    return (
        <>
            <LayoutSetup />
            <header className={`${isHeaderSticky ? "sticky" : ""}`}>
                <h1>Quizio</h1>
                <nav>
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>The flow</a></li>
                        <li><a>About us</a></li>
                        <li><a>Login</a></li>
                    </ul>
                </nav>
            </header>
            <main ref={mainContentRef}>
                <section className="entry-stuff-container">
                    <h1>Quizio</h1>
                    <p className="subtitle">Design the most beautiful quizzes</p>
                    <PrimaryButton
                        title="Create quizz now"
                        big
                        color="blue"
                        extraMarginTop
                        linkTo="/createGenericQuiz"
                        />
                    <p>...or</p>
                    <PrimaryButton
                        title="Login"
                        big
                        color="pink"
                        linkTo="/login"
                        marginTop/>
                    <SecondaryButton
                        title="Register"
                        marginTop
                        big
                        linkTo='/register'
                        />
                </section>
                <section className="quiz-illustration-container">
                    <QuizzIllustration />
                </section>
            </main>
            <style jsx>
                {`
                header {
                    display: flex;
                    height: 50px;
                    transition: all 0.3s;
                    align-items: center;
                }
                header h1 {
                    flex-grow: 1;
                    padding-left: 10px;
                    transition: all 0.3s;
                    opacity: 0;
                    font-size: 1.4em;
                }
                header.sticky h1 {
                    opacity: 1;
                }
                header.sticky {
                    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
                }
                nav ul {
                    display: flex;
                }
                nav li {
                    padding: 2px;
                    list-style-type: none;
                    font-size: 1em;
                    margin-right: 5px;
                }
                @media(min-width: 400px) {
                    nav li {
                        font-size: 1.2em;
                        margin-right: 10px;
                    }
                }
                main {
                    width: 100%;
                    height: calc(100vh - 50px);
                    position: relative;
                    overflow-y: auto;
                }
                main p {
                    font-size: 1.5em;
                    margin-top: 10px;
                }
                
                .quiz-illustration-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transform: rotate(3deg);
                    margin-top: 50px;
                    animation: QuizIllustrationIntro 0.7s ease-out;
                }
                @media (min-width: 1195px) {
                    .quiz-illustration-container {
                        position: fixed;
                        top: 0px;
                        bottom: 0px;
                        left: -5px;
                    }
                }
                @keyframes QuizIllustrationIntro { 
                    0% {
                        transform: rotate(0deg);
                        left: -30px;
                        opacity: 0;
                    }
                    100% {
                        transform: rotate(3deg);
                        left: -5px;
                        opacity: 1;
                    }
                }
                .entry-stuff-container {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    animation: SlideDownAndFadeIn 1s;
                }
                .entry-stuff-container h1 {
                    font-size: 7em;
                    font-weight: 700;
                }
                .entry-stuff-container p.subtitle  {
                    font-size: 3em;
                    text-align: center;
                }
                @keyframes SlideDownAndFadeIn {
                    0% {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0px);
                        opacity: 1;
                    }
                }
            `}
            </style>
        </>
    )
}

const QuizzIllustration = () => {
    return (
        <>
            <div className="shell">
                <h1>Hard Math Question</h1>
                <SillyHandwritingWithOption text="Between 1914 - 1918" />
                <SillyHandwritingWithOption text="sin(45)" checked />
                <SillyHandwritingWithOption text="Mozart" />
            </div>
            <style jsx>
                {`
                    .shell {
                        width: 300px;
                        box-shadow: 2px 2px 13px grey;
                        border-radius: 5px;
                        padding: 30px;
                        padding-top: 20px;
                        padding-bottom: 100px;
                    }
                    @media (min-width: 500px) {
                        .shell {
                            width: 350px;
                        }
                    }
                    @media (min-width: 1400px) {
                        .shell {
                            width: 400px;
                        }
                    }
                    h1 {
                        text-align: center;
                        font-weight: 400;
                        font-size: 2em;
                    }
            `}
            </style>
        </>
    )
}