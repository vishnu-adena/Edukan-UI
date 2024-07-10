import React from "react";

import SSOLogin from "../../components/SsoLogin";
import { getAuthUrl } from "@/utils/auth";

const RegistrationPage: React.FC = () => {
    const login = () => {
        window.location.href = getAuthUrl();
    };
    return <SSOLogin />;
};

export default RegistrationPage;

