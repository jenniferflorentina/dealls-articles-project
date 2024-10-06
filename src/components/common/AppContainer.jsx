const AppContainer = ({title = 'Page Title', children}) => {
    return (
        <div className="px-3 md:px-14 mt-6">
            <h3>{title}</h3>
            {children}
        </div>
    )
}

export default AppContainer