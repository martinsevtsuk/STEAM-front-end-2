import '../css/SecurityPanel.css';

function SecurityPanel({ 
    isArmed, 
    armingCountdown, 
    alertActive, 
    onToggle 
}) {
    // Determine button text based on state
    const getButtonText = () => {
        if (alertActive || isArmed) return 'Disarm';
        return 'Secure';
    };

    // Determine status text
    const getStatusText = () => {
        if (alertActive) return 'ALERT - MOTION DETECTED!';
        if (armingCountdown > 0) return `Arming in ${armingCountdown}s...`;
        if (isArmed) return 'Armed';
        return 'Disarmed';
    };

    // Determine status class for styling
    const getStatusClass = () => {
        if (alertActive) return 'status-alert';
        if (armingCountdown > 0) return 'status-arming';
        if (isArmed) return 'status-armed';
        return 'status-disarmed';
    };

    return (
        <div className="security-panel-container">
            <div className="security-title-container">
                <p className="security-panel-title">Security System</p>
            </div>
            
            <div className="security-content-container">
                <div className={`security-status ${getStatusClass()}`}>
                    <p className="security-status-text">{getStatusText()}</p>
                </div>

                <button 
                    className={`security-toggle-button ${alertActive ? 'alert-button' : ''}`}
                    onClick={onToggle}
                    disabled={armingCountdown > 0}
                >
                    {getButtonText()}
                </button>
            </div>
        </div>
    );
}

export default SecurityPanel;
