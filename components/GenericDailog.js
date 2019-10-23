export default ({ children, title, onDismissDialog }) => {
    const onContentWrapperClick = React.useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    return (
        <>
            <div className="dialog-wrapper" onClick={onDismissDialog}>
                <div className="dialog-content-wrapper" onClick={onContentWrapperClick}>
                    {title ? <h1>{title}</h1> : null}
                    {children}
                </div>
            </div>
            <style jsx>
                {`
            .dialog-wrapper {
                position: fixed;
                top: 0;
                left:0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .dialog-content-wrapper {
                width: calc(100% - 30px);
                min-width: 300px;
                min-height: 300px;
                max-width: 500px;
                max-height: 500px;
                border-radius: 8px;
                box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
                padding: 25px;
                background-color: white;
            }
            h1 {
                      font-size: 1.7em;
                      font-weight: 500;
                  }
        `}
            </style>
        </>
    )
}