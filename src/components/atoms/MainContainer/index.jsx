import "./styles.scss";

export default function MainContainer({ children }) {
    return (
        <main className="main-container">
            {children}
        </main>
    )
}