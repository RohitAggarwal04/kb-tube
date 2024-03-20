
import React from "react";
import StaticPage from "@/app/layouts/static";

export const metadata = {
    title: 'Disclaimer',
}


function Disclaimer() {

    return (
        <StaticPage>
            <div className='row g-3' >
                <div className="col-lg-12">
                    <div>
                        <h2>Disclaimer</h2>
                        <p>Welcome to KB TUBE's Disclaimer Page. By accessing and using our cutting-edge video streaming application, you acknowledge and agree to the following:</p>
                        <ol>
                            <li><strong>Content Responsibility:</strong> While KB TUBE strives to provide a seamless and engaging content consumption experience, we do not take responsibility for the accuracy, completeness, or suitability of any content uploaded by our users. The views and opinions expressed in user-generated content are those of the respective creators and do not necessarily reflect the views of KB TUBE.</li>
                            <li><strong>Monetization Criteria:</strong> To unlock monetization features on KB TUBE, creators must meet specific milestones, including achieving a minimum of 150 subscribers and accumulating 500 watch hours. Meeting these criteria does not guarantee monetization, as each application is subject to review and approval by KB TUBE's moderation team.</li>
                            <li><strong>Copyright Policy:</strong> KB TUBE is committed to handling copyright issues responsibly. In the event of a copyright strike, we adopt a non-punitive approach by removing the specific copyrighted video in question rather than suspending the entire channel. Creators are responsible for ensuring that they have the necessary rights to upload and distribute the content on our platform.</li>
                            <li><strong>Revenue Sharing:</strong> While KB TUBE prioritizes maximizing earnings for content creators, the actual revenue sharing arrangement may vary depending on various factors, including but not limited to ad revenue, subscription revenue, and viewer engagement. Creators are encouraged to refer to our revenue-sharing guidelines for detailed information.</li>
                            <li><strong>Community Guidelines:</strong> KB TUBE maintains a supportive and thriving community by enforcing community guidelines that promote respect, inclusivity, and constructive engagement. Any violation of these guidelines may result in content removal, channel suspension, or account termination, at the discretion of KB TUBE.</li>
                            <li><strong>Limitation of Liability:</strong> KB TUBE shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our platform, including but not limited to loss of revenue, data, or goodwill.</li>
                            <li><strong>Updates and Modifications:</strong> KB TUBE reserves the right to update, modify, or discontinue any aspect of our platform, including these disclaimers, at any time without prior notice. It is your responsibility to review these disclaimers periodically for any changes.</li>
                        </ol>
                        <p>By continuing to use KB TUBE, you acknowledge that you have read, understood, and agreed to our Disclaimer Page. If you have any questions or concerns regarding these disclaimers, please contact us through the channels provided on our Contact Page.</p>
                    </div>
                </div>
            </div>
        </StaticPage>
    )
}

export default Disclaimer