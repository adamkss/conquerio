import React from 'react';
import Router, { useRouter } from 'next/router';
import { getNewSessionForQuiz, getQuizInfoById } from '../../utils/QuizRequests';
import LoadingSpinner from '../../components/LoadingSpinner';
import { executeAsyncFunctionAndObserveState } from '../../utils/AsyncUtils';
import LayoutSetup from '../../components/layoutSetup';
import PrimaryButton from '../../components/PrimaryButton';
import TextInput from '../../components/TextInput';
import Link from 'next/link';

export default () => {
    const { quizId, isForTesting } = useRouter().query;
    const [isLoadingScreenShown, setIsLoadingScreenShown] = React.useState(false);
    const [quiz, setQuiz] = React.useState(null);
    const [quizTakerName, setQuizTakerName] = React.useState("");

    React.useEffect(() => {
        (async () => {
            if (quizId) {
                const quiz = await executeAsyncFunctionAndObserveState(
                    setIsLoadingScreenShown,
                    getQuizInfoById,
                    quizId
                );
                setQuiz(quiz);
            }
        })();
    }, [quizId]);

    const requestSessionForQuiz = React.useCallback(async () => {
        if (quizId) {
            const { sessionId } = await executeAsyncFunctionAndObserveState(
                setIsLoadingScreenShown,
                getNewSessionForQuiz,
                quizId,
                {
                    quizTakerName
                }
            );
            if (isForTesting)
                Router.push(`/quiz/${sessionId}?isForTesting=true`);
            else
                Router.push(`/quiz/${sessionId}`);
        }
    }, [quizId, quizTakerName, isForTesting]);

    const onGoClick = React.useCallback(() => {
        requestSessionForQuiz();
    }, [requestSessionForQuiz]);

    return (
        <>
            <LayoutSetup />
            {isLoadingScreenShown ?
                <LoadingSpinner />
                :
                ""
            }
            {quiz ?
                <main>
                    <section className="card fade-and-slide-in">
                        <h1>Ready to take quiz "<span className="card__quiz-name">{quiz.name}</span>" ?</h1>
                        {quiz.askForQuizTakerName ?
                            <TextInput
                                title="Your name:"
                                width="100%"
                                marginTop="15px"
                                value={quizTakerName}
                                valueSetter={setQuizTakerName}
                            />
                            :
                            ""
                        }
                        <PrimaryButton
                            title="Go!"
                            rightAligned
                            medium
                            marginTop
                            inactive={quiz.askForQuizTakerName && quizTakerName === ""}
                            onClick={onGoClick}
                        />
                    </section>
                </main>
                :
                ""
            }
            {isForTesting ?
                <Link href={`/genericQuizzes/${quizId}/editor`}>
                    <a className="back-link fade-and-slide-in">
                        <img className="back-arrow" src="/static/left-arrow.svg"></img>
                        <span>Back to editor</span>
                    </a>
                </Link>
                :
                ''
            }
            <style jsx>
                {`
                    main {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    .card {
                        width: 80%;
                        max-width: 600px;
                        border-radius: 10px;
                        box-shadow: 0px 0px 8px hsl(0, 0%, 70%);
                        padding: 30px;
                    }
                    h1 {
                        font-weight: 400;
                    }
                    .card__quiz-name {
                        font-weight: 700;
                    }
                    .back-link {
                        position: fixed;
                        left: 25px;
                        top: 25px;
                        padding: 5px;
                        text-align: center;
                        vertical-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        text-decoration: none;
                        color: inherit;
                        font-size: 1.14rem;
                    }
                    .back-arrow {
                        width: 20px;
                        margin-right: 7px;
                    }
                `}
            </style>
        </>
    )
}