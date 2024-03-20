
import React from "react";
import StaticPage from "@/app/layouts/static";

export const metadata = {
    title: 'Contact Us',
}

function ContactUs() {

    return (
        <StaticPage>
            <div className='row g-3' >
                <div className="col-lg-12">
                    <h2 className="mb-2">Contact Us</h2>
                    <p>Welcome to KB TUBE's Contact Page. If you have any questions, feedback, or concerns regarding our video streaming application, please feel free to reach out to us using the following channels:</p>
                    <ol>
                        <li><strong>Email:</strong> You can contact us via email at <a href="mailto:contact@kbtube.com">contact@kbtube.com</a> for general inquiries, partnership opportunities, or media inquiries. We strive to respond to all emails within 24-48 hours.</li>
                        {/* <li><strong>Support Center:</strong> For technical support or assistance with account-related issues, please visit our Support Center. Our dedicated support team is available to assist you with any concerns or queries you may have.</li>
                                            <li><strong>Social Media:</strong> Stay connected with us on social media platforms such as Twitter, Facebook, and Instagram to receive the latest updates, announcements, and community news. You can also send us direct messages on these platforms for quick responses.</li> */}
                        <li><strong>Contact Number:</strong> <a href="tel:+1 305-317-1806">+1 305-317-1806</a></li>
                        <li><strong>Address:</strong> If you prefer traditional mail correspondence, you can send letters or packages to our headquarters at the following address:<br />
                            KB TUBE Headquarters<br />
                            4300 Biscayne Blvd Suite 203 Miami,<br />
                            Florida 33137, US</li>
                    </ol>
                    <p>Thank you for choosing KB TUBE. We appreciate your support and look forward to serving you better.</p>
                </div>
            </div>
        </StaticPage>
    )
}

export default ContactUs