import React from "react";
import StaticPage from "@/app/layouts/static";

export const metadata = {
    title: 'Privacy Policy',
}



function PrivacyPolicy() {

    return (
        <StaticPage>
            <div className='row g-3' >
                <div className="col-lg-12">
                    <h1>KBTube Privacy Policy</h1>
                    <p>At KBTube, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our video uploading and streaming platform.</p>
                    <h2>Information We Collect:</h2>
                    <ul>
                        <li>Personal Information: When you create an account, we may collect information such as your name, email address, and profile picture.</li>
                        <li>Usage Data: We collect data on how you interact with our platform, including your viewing history, preferences, and device information.</li>
                        <li>Uploaded Content: Any videos or other content you upload to our platform may contain personal information.</li>
                    </ul>
                    {/* <!-- Add more sections as needed --> */}
                    <h2>How We Use Your Information:</h2>
                    <p>To provide and improve our services, including personalized recommendations and content suggestions.</p>
                    {/* <!-- Add more content --> */}
                    <h2>Sharing Your Information:</h2>
                    <p>We may share your information with trusted third-party service providers who assist us in operating our platform, such as hosting providers or analytics services.</p>
                    {/* <!-- Add more content --> */}
                    <h2>Data Security:</h2>
                    <p>We implement security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                    {/* <!-- Add more content --> */}
                    <h2>Your Choices:</h2>
                    <p>You can manage your account settings and preferences to control the information we collect and how it is used.</p>
                    {/* <!-- Add more content --> */}
                    <h2>Updates to this Privacy Policy:</h2>
                    <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes and obtain your consent if required by law.</p>
                    {/* <!-- Add more content --> */}
                    <p>By using KBTube, you consent to the collection and use of your information as described in this Privacy Policy. If you have any questions or concerns about our privacy practices, please contact us at <a href="mailto:contact@kbtube.com">contact@kbtube.com</a>.</p>
                    <p>Last updated: 17-02-2024</p>
                </div>
            </div>
        </StaticPage>
    )
}

export default PrivacyPolicy