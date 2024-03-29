import React, { useState } from 'react';
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom"
import PrivateRoute from "./PrivateRoute";


export default function Dashboard() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            history.pus('/login')
        } catch (error) {
            setError('Failed to log out')
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-10 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log out</Button>
            </div>
        </>
    )
}
