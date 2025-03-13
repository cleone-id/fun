import React, { useState } from 'react';
import { Input, Progress, Button, Tooltip } from 'antd';
import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const BuzzerCalculator = () => {
    const [nama, setNama] = useState('');
    const [displayNama, setDisplayNama] = useState('');
    const [hasil, setHasil] = useState(null);
    const [loading, setLoading] = useState(false);
    const [teksHasil, setTeksHasil] = useState('');
    const [deskripsi, setDeskripsi] = useState('');

    const buzzerColors = {
        '100%': '#FF4444',
        '50%': '#FFB700',
        '0%': '#44FF44',
    };

    const calculateBuzzer = () => {
        setLoading(true);
        setDisplayNama(nama);
        
        // Hash function untuk konsistensi hasil
        const hash = (str) => {
            let hashValue = 0;
            if (str.length === 0) return hashValue;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hashValue = (hashValue << 5) - hashValue + char;
                hashValue = hashValue & hashValue;
            }
            return Math.abs(hashValue % 101);
        };
        
        const buzzerScore = hash(nama);
        setHasil(buzzerScore);

        // Set hasil berdasarkan score
        if (buzzerScore >= 80) {
            setTeksHasil('ULTIMATE BUZZER! 🐝👑');
            setDeskripsi('Wah mantap! Kamu sudah level Sultan Buzzer! Bisa ngetwit 150x sehari, punya 17 akun cadangan, dan bisa bikin tagar apapun trending! Medsos tanpamu bagai RT tanpa pak RT 🏆🔥');
        } else if (buzzerScore >= 60) {
            setTeksHasil('SANGAT BUZZER! 🐝💪');
            setDeskripsi('Hebat! Kamu expert dalam membuat post panjang yang ujungnya jualan, dan jago bikin opini dengan "POST MENCENGANGKAN!" 📱✨');
        } else if (buzzerScore >= 40) {
            setTeksHasil('NOOB BUZZER 🐝🌱');
            setDeskripsi('Masih pemula nih! Baru bisa bikin tweet copas dan baru punya 3 akun alt. Masih harus banyak belajar dari suhu-suhu buzzer! 📚🤓');
        } else if (buzzerScore >= 20) {
            setTeksHasil('AGAK BUZZER 🤔');
            setDeskripsi('Kamu cuma bisa retweet dan reply "setuju min" doang. Tapi gapapa, namanya juga masih buzzer magang! 🌟😅');
        } else {
            setTeksHasil('BUKAN BUZZER 😇');
            setDeskripsi('Selamat! Kamu masih suci dan polos! Medsos kamu isinya cuma like foto kucing, meme dan share resep rendang! 🐱🍖');
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <div className='border p-5 container bg-light rounded'>
            <h1 className='fw-bold'>Seberapa Buzzer kah kamu? 🐝</h1>
            <h3 className='text-secondary fw-light'>Ketik namamu untuk cek level buzzer-mu!</h3>
            <div className='row'>
                <Input
                    placeholder="Tulis nama buzzermu..."
                    value={nama}
                    className='rounded-pill'
                    onChange={(e) => setNama(e.target.value)}
                    style={{ marginBottom: '16px' }}
                />
                <Button 
                    type='primary' 
                    disabled={nama.length < 3} 
                    className='rounded-pill' 
                    onClick={calculateBuzzer}
                    style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }}
                >
                    {(nama.length < 3 && nama !== "") ? "minimal 3 karakter" : "Cek Level Buzzer!"}
                </Button>
            </div>
            <div className='mt-3'>
                {loading ? (
                    <LoadingOutlined style={{scale:'2', color:'#4A95FF'}}/>
                ) : (
                    hasil !== null && (
                        <>
                            <Progress 
                                percent={hasil} 
                                className="rounded-0" 
                                size={['default', 30]} 
                                format={(percent) => percent} 
                                strokeColor={buzzerColors}
                            />
                            <div className='row fw-bold mt-2'>
                                <span className='col text-start text-success'>Polos</span>
                                <span className='col text-end text-danger'>Ultimate Buzzer</span>
                            </div>
                            <h5 className='text-uppercase mt-4'>{displayNama}, Level kamu adalah...</h5>
                            <h1 className='fw-bold' style={{color: hasil >= 80 ? '#FF4444' : hasil >= 60 ? '#FF8C00' : hasil >= 40 ? '#FFB700' : hasil >= 20 ? '#88CC88' : '#44FF44'}}>
                                {teksHasil}
                            </h1>
                            <p className='mt-3 fs-5'>{deskripsi}</p>
                            <p className='text-end w-100'>
                                <Tooltip title='Untuk hiburan semata, jangan baper ya! 😄'>
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            </p>
                        </>
                    )
                )}
            </div>
        </div>
    );
};

export default BuzzerCalculator; 