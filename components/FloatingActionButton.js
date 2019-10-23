export default ({ title, onClick, primaryColor = null }) => {
    return (
        <>
            <button className="fab" onClick={onClick} title={title}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="#422d74"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" /></svg>
            </button>
            <style jsx>
                {`
                    .fab {
                        position: fixed;
                        bottom: 25px;
                        right: 25px;
                        cursor: pointer;
                        outline: none;
                        border: none;
                        background-color: transparent;
                    }
                `}
            </style>
        </>
    )
}