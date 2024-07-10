// pages/ContactUsPage.tsx

const ContactUsPage: React.FC = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700">For any inquiries or feedback, please contact us at:</p>
          <p className="text-blue-500 mt-2">contact@example.com</p>
          <label htmlFor="fileInput">Choose a file:</label>
          <input type="file" id="fileInput" />
        </div>
      </div>

    );
  };
  
  export default ContactUsPage;
  