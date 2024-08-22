import React from "react";

export default function Routine() {
    const renderRoutineCard = () => {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">First Routine</h3>
                </div>
                <div className="card-body">
                    <p>Content of the first routine</p>
                </div>
            </div>
        );
    };

    return (
        <div className="content">
            <div className="container-fluid">{renderRoutineCard()}</div>
        </div>
    );
}