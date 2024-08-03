import React from "react";
import Contact from "../../components/ContactUs";

const ContactPage: React.FC = () => {
    const hello=() =>{
        return"hello";
    }
    return <Contact />;
   // <FileUploader onUpload={hello}/>
};

export default ContactPage;