import "./Welcome.css";

export const Welcome = ({ currentUser }) => {
  return (
    <div className="welcome-container">
      <h1>
        <span>Welcome to Gift Grabber,</span>
        <span>{currentUser.firstName}!</span>
      </h1>
    </div>
  );
};
