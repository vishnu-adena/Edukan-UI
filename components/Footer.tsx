// components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
    return (
        <div >
            <footer className="bg-gray-800 text-white text-center py-4">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <p>&copy; 2024 MyWebsite. All rights reserved.</p>
                            <p>Designed with ❤️ by Vishnu Vardhan Reddy Adena</p>
                        </div>
                        <div>
                            <ul className="flex space-x-4">
                                <li>
                                    <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-300">Terms of Service</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-300">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
