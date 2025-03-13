import React, { useState } from 'react';
import { Input, Progress, Image, Button } from 'antd';
import 'antd/dist/reset.css';

const FriendMatch = () => {
    // State declarations - this is where we store changing data
    const [person1, setPerson1] = useState('');
    const [person2, setPerson2] = useState('');
    const [matchResult, setMatchResult] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Custom function to calculate match percentage
    const calculateMatch = () => {
        setLoading(true);
        
        // Simple hash function (similar to your karbit calculator)
        const hash = (str1, str2) => {
            let combined = str1 + str2;
            let hashValue = 0;
            for (let i = 0; i < combined.length; i++) {
                const char = combined.charCodeAt(i);
                hashValue = (hashValue << 5) - hashValue + char;
                hashValue = hashValue & hashValue;
            }
            return Math.abs(hashValue % 101);
        };

        // Calculate match percentage
        const matchPercentage = hash(person1, person2);

        // Set different messages based on match percentage
        if (matchPercentage >= 80) {
            setResultMessage('Cocok Banget! 🌟 Teman Sejati!');
        } else if (matchPercentage >= 60) {
            setResultMessage('Cocok! 😊 Kalian akan jadi teman baik!');
        } else if (matchPercentage >= 40) {
            setResultMessage('Cukup Cocok 👍 Coba kenalan!');
        } else if (matchPercentage >= 20) {
            setResultMessage('Menarik 🤔 Mungkin dengan waktu...');
        } else {
            setResultMessage('Unik 😅 Berlawanan menarik?');
        }

        setMatchResult(matchPercentage);
        
        // Simulate loading for better UX
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="friend-match p-4">
            <h2 className="text-center mb-4">Kalkulator Kecocokan Teman</h2>
            <div className="input-section mb-4">
                <Input
                    placeholder="Masukkan nama orang pertama"
                    value={person1}
                    onChange={(e) => setPerson1(e.target.value)}
                    className="mb-2"
                />
                <Input
                    placeholder="Masukkan nama orang kedua"
                    value={person2}
                    onChange={(e) => setPerson2(e.target.value)}
                    className="mb-2"
                />
                <Button 
                    type="primary"
                    onClick={calculateMatch}
                    disabled={person1.length < 2 || person2.length < 2}
                    className="w-100"
                >
                    Hitung Kecocokan!
                </Button>
            </div>

            {matchResult !== null && !loading && (
                <div className="result-section">
                    <Progress 
                        percent={matchResult}
                        status="active"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                    />
                    <h3 className="text-center mt-3">{resultMessage}</h3>
                </div>
            )}
        </div>
    );
};

export default FriendMatch; 