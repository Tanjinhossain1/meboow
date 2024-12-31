import { Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";

export const metadata = {
  title: "Privacy Policy - Safari List",
  description:
    "IN Safari List Privacy Policy page you can see all of our site rules and policies in the privacy policy section of the privacy policy.",
  keywords: ["Privacy Policy", "Safari List", "page"],
  openGraph: {
    title: "Privacy Policy - Safari List",
    description:
      "IN Safari List Privacy Policy page you can see all of our site rules and policies in the privacy policy section of the privacy policy.",
    url: `${process.env.NEXT_PUBLIC_META_URL}/privacyPolicy`,
    siteName: "Safari List",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Safari List",
    description:
      "IN Safari List Privacy Policy page you can see all of our site rules and policies in the privacy policy section of the privacy policy.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_META_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicy() {
  return (
    <Grid container>
      <Navbar />
      
          <Paper
            className="md:max-w-[1000px] mx-auto"
            sx={{ p: 5 }}
            elevation={2}
          >
            <div className="flex justify-center">
              
            <Image
              src="/compliant.png"
              alt="complaint"
              width={350}
              height={350}
            />
            </div>
            <div className="max-w-3xl mx-auto p-6">
              <h1 className="text-xl mb-4">
                SafariList Privacy Policy and Cookie Statement
              </h1>

              <p className="text-sm mb-4">Last Updated: April 24, 2024</p>

              <p className="mb-4">
                We updated our privacy policy to include additional information
                required under applicable data protection regulations -
                including the European Union General Data Protection Regulation
                (GDPR) - including the following:
              </p>

              <ul className="list-disc pl-8 mb-6 space-y-2">
                <li>Why we process personal data</li>
                <li>Legal grounds for processing personal data</li>
                <li>
                  European Union user rights under the GDPR and how to exercise
                  them
                </li>
              </ul>

              <h2 className="text-lg font-medium mb-4">Privacy Policy</h2>

              <p className="mb-4">
                Your privacy is of the utmost importance to us here at
                SafariList. We collect and retain the minimum personal data
                required so we can deliver the best possible experience to you.
              </p>

              <p className="mb-4">
                Submission of personal information is not required to browse
                SafariList.com. Furthermore, we discourage disclosure of any of
                your personal addresses, emails or phone numbers when
                interacting with our readers in the comments and opinion
                sections of SafariList.com.
              </p>

              <p className="mb-4">
                The purpose of our Privacy Policy is to detail what personal
                data we obtain, how we obtain it and why. Also, it describes
                your rights and the options we provide to you to access, update
                or otherwise take control of your personal data that we retain
                and process.
              </p>

              <p className="mb-4">
                To jump to a specific section of the Privacy Policy, please
                click the links below:
              </p>

              <div className="border border-gray-300 p-4 mb-6">
                <p className="font-medium mb-2">Jump to</p>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="#categories"
                      className="text-blue-600 hover:underline"
                    >
                      Categories of Personal Data processed by SafariList
                    </a>
                  </li>
                  <li>
                    <a
                      href="#cookies"
                      className="text-blue-600 hover:underline"
                    >
                      Cookies and similar technologies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#third-parties"
                      className="text-blue-600 hover:underline"
                    >
                      Third parties
                    </a>
                  </li>
                  <li>
                    <a
                      href="#public-info"
                      className="text-blue-600 hover:underline"
                    >
                      Public Information
                    </a>
                  </li>
                  <li>
                    <a
                      href="#children"
                      className="text-blue-600 hover:underline"
                    >
                      Children
                    </a>
                  </li>
                  <li>
                    <a
                      href="#data-security"
                      className="text-blue-600 hover:underline"
                    >
                      Data Security
                    </a>
                  </li>
                  <li>
                    <a
                      href="#retention"
                      className="text-blue-600 hover:underline"
                    >
                      Retention of Personal Data
                    </a>
                  </li>
                  <li>
                    <a
                      href="#accessing"
                      className="text-blue-600 hover:underline"
                    >
                      Accessing and modifying your personal information
                    </a>
                  </li>
                  <li>
                    <a
                      href="#deletion"
                      className="text-blue-600 hover:underline"
                    >
                      Deletion of Personal Data
                    </a>
                  </li>
                  <li>
                    <a
                      href="#your-rights"
                      className="text-blue-600 hover:underline"
                    >
                      Your Rights
                    </a>
                  </li>
                  <li>
                    <a
                      href="#updates"
                      className="text-blue-600 hover:underline"
                    >
                      Updates to this privacy policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#cookie-statement"
                      className="text-blue-600 hover:underline"
                    >
                      Cookie Statement
                    </a>
                  </li>
                </ul>
              </div>

              <h2 id="categories" className="text-lg font-medium mb-4">
                Categories of Personal Data processed by SafariList
              </h2>

              <h3 className="font-medium mb-2">Purposes and legal grounds</h3>

              <p className="font-medium mb-2">
                Personal Data that is processed when you create a SafariList
                account:
              </p>

              <p className="mb-4">
                To create an account with SafariList, you provide your email
                address, nickname, and a chosen password.
              </p>

              <p className="mb-4">
                <strong>(1)</strong> SafariList processes your email address and
                your chosen password when you sign in to your SafariList
                account. The legal ground for SafariList to process your email
                address and password is to ensure the security of your
                SafariList account.
              </p>

              <p className="mb-4">
                We do not send promotional emails. However, we may send you
                transactional emails to the account provided. If you no longer
                wish to receive these emails, you may opt out of them by
                deleting your SafariList account.
              </p>

              <p className="mb-4">
                <strong>(2)</strong> SafariList processes your nickname when you
                post comments and opinions. The legal ground for SafariList to
                process and retain your nickname is to provide you the facility
                to engage with other SafariList users. Your nickname will be
                visible to all your previous interactions within your SafariList
                account, rendering them anonymous to other users, unless you
                choose to delete your account. Your nickname will be stored in
                our comments caching and may be visible for a period following
                exercising your right to erasure.
              </p>

              <h3 className="font-medium mt-6 mb-2">
                Personal Data that is processed when you modify your SafariList
                account:
              </h3>

              <p className="mb-4">
                <strong>(1)</strong> SafariList processes your nickname when you
                modify your profile comments and opinions. The legal ground for
                SafariList to process and retain your character sized nickname
                is to provide you the ability to express your voice when
                interacting with other SafariList users. Your avatar will be
                removed from ALL your previous posts when you delete your
                SafariList account, rendering them anonymous.
              </p>

              <h3 className="font-medium mt-6 mb-2">
                Additional Personal Data that is processed when you post
                Comments or Opinions:
              </h3>

              <p className="mb-4">
                <strong>(1)</strong> SafariList processes your IP address when
                you post comments and opinions. The legal ground for SafariList
                to process and retain your IP address is to provide automated
                comments and opinions filters to avoid offensive or {`"spam"`} like
                behavior.
              </p>

              <h3 className="font-medium mt-6 mb-2">
                Personal Data that is processed when you communicate with our
                support representatives:
              </h3>

              <p className="mb-4">
                <strong>(1)</strong> SafariList processes your email address
                when interacting with our support representatives. The legal
                ground for SafariList to process and retain your email address
                is to provide a seamless and high quality support experience.
              </p>

              <h2 className="text-lg font-medium mt-8 mb-4">
                Automatically collected information
              </h2>

              <p className="mb-4">
                When you visit SafariList.com, we automatically record certain
                information from the {`User's or Visitor's device by using various
                types of technology, including cookies, "clear gifs" or "web
                beacons". This "automatically collected"`} information may include
                IP address or other device address or ID, web browser and/or
                device type, web pages or sites visited just before or just
                after visiting SafariList.com, the pages or other content the
                User or Visitor views or interacts with on SafariList.com, and
                the dates and times of the visit, access, or use of
                SafariList.com.
              </p>

              <p className="mb-4">
                We use this information to improve your experience with
                SafariList.com. Furthermore, we use this information to promote
                safety and security by monitoring suspicious activity or
                violations of our terms and policies. Such processing is based
                on our legitimate interest in helping ensure the safety of our
                services.
              </p>

              <p className="mb-4">
                If you would like to learn more about what options you have
                about limiting the gathering of information by third-party ad
                networks, you can consult the website of the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Network Advertising Initiative
                </a>
                .
              </p>

              <h2 className="text-lg font-medium mt-8 mb-4">
                Cookies and similar technologies
              </h2>

              <p className="mb-4">
                In compliance with the European Union legislation, we inform you
                that our website SafariList.com uses cookies and similar
                technologies to store information about your preferences, how
                the website feels and operates. We never store any personal data
                in our cookies.
              </p>

              <p className="mb-4">
                You can remove or reject cookies using your browser or {`device's`}
                settings. If you do this, however, you may have to manually
                adjust some preferences every time you visit SafariList.com, and
                some services and features may not work.
              </p>

              <p className="mb-4">
                Please read our{" "}
                <a
                  href="#cookie-statement"
                  className="text-blue-600 hover:underline"
                >
                  Cookie Statement
                </a>{" "}
                to learn more about how we use cookies and the options you have.
              </p>

              <h2 className="text-lg font-medium mt-8 mb-4">Third parties</h2>

              <p className="mb-4">
                <strong>(1)</strong> Google Analytics helps us analyze how
                visitors use SafariList.com. It counts the number of visitors
                and tells us things about their overall behavior - such as the
                typical length of stay on the site or the average number of
                pages a user views. Information collected via Google Analytics
                is aggregated anonymously and contains no personal data. To
                learn more about{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Google {`Analytics'`} privacy practices
                </a>
                , and how to opt out of having your data used by Google
                Analytics,{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  click here
                </a>
                .
              </p>

              <p className="mb-4">
                <strong>(2)</strong> Analytics: SafariList.com has authorized
                Adsense as its advertising partner to study use the processing
                of Personal Data to get paid through advertising for the free
                services we provide:
              </p>

              <ul className="list-disc pl-8 mb-6 space-y-2">
                <li>
                  Determining the interest segments of end users based on the
                  pages {`they've`} accessed and the content {`they're`} viewing to show
                  them relevant selected by SafariList.
                </li>
                <li>
                  Providing reports and insights on the audiences who visit
                  SafariList.com.
                </li>
              </ul>

              <h2 className="text-lg font-medium mt-8 mb-4">
                Processing of Personal Data by Amazon
              </h2>

              <p className="mb-4">
                Processing of Personal Data by Amazon includes any operation
                such as collection, recording, organization, structuring,
                storage, adaptation or alteration, retrieval, consultation, use,
                disclosure by transmission, dissemination, or otherwise making
                available of the data. The types of Personal Data collected by
                Amazon include client identifiers such as IP addresses, user
                agents, HTTP header data, and interest segments about end users
                who access pages and information on safarilist.com
              </p>

              <p className="mb-4">
                Amazon is authorized to engage third parties (such as Amazon Web
                Services) for carrying out the processing of Personal Data for
                the purposes listed above.
              </p>

              <p className="mb-4">
                <strong>(1)</strong> Third party websites, products & services:
                SafariList.com may contain links to or the ability to share
                information with third party websites, products and services. We
                are not responsible for the privacy practices undertaken by
                these third parties, nor are responsible for the information or
                content their products and services contain. This Privacy Policy
                applies solely to information collected by SafariList.com. We
                recommend that you read the privacy policies of any third
                parties before using their websites or services.
              </p>

              <h2 id="public-info" className="text-lg font-medium mt-8 mb-4">
                Public Information
              </h2>

              <p className="mb-4">
                <strong>(1)</strong> Posts made within the Comments & Opinions
                sections are public including your SafariList.com nickname. When
                you create a SafariList.com account, you can access your Submit
                Comments and Opinions, they can also view your Favorite phones
                and your recent posts. Your nickname and avatar will be removed
                from ALL your previous posts when you delete your SafariList
                account rendering them anonymous. Additionally, your list of
                Favorite phones will also be deleted.
              </p>

              <h2 id="children" className="text-lg font-medium mt-8 mb-4">
                Children
              </h2>

              <p className="mb-4">
                Submission of personal information is not required to browse
                SafariList.com anonymously.
              </p>

              <p className="mb-4">
                To create an account with SafariList, individuals must be 16
                years of age or older. If we discover we have collected
                information from a child under 16 years of age, we will promptly
                take steps to delete the information as soon as possible. If you
                know of or have reason to believe anyone under the age of 16 is
                communicating with our personal data, please contact us.
              </p>

              <h2 id="data-security" className="text-lg font-medium mt-8 mb-4">
                Data Security
              </h2>

              <p className="mb-4">
                SafariList.com stores all website data within the European
                Union. Furthermore, all personal information and backups are
                encrypted.
              </p>

              <p className="mb-4">
                SafariList.com follows accepted industry standards to protect
                the information submitted to us, both during transmission and
                once we receive it. We have implemented appropriate
                administrative, technical and physical safeguards to protect
                Personal Data against accidental or unlawful destruction,
                accidental loss, unauthorized alteration, unauthorized
                disclosure or access, misuse, and any other unlawful form of
                processing of the Personal Data in our possession. This
                includes, for example, firewalls, password protection and other
                access and authentication controls. We use SSL technology to
                encrypt data during transmission through public internet, and we
                also employ application-layer security features to further
                anonymize Personal Data.
              </p>

              <p className="mb-4">
                However, no method of transmission over the Internet, or method
                of electronic storage, is 100% secure. SafariList.com cannot
                ensure or warrant the security of any information you transmit
                to us or store on the Service, and you do so at your own risk.
                SafariList.com also cannot guarantee that such information may
                not be accessed, disclosed, altered, or destroyed by breach of
                any of our physical, technical, or managerial safeguards. If at
                any time your Personal Data has been compromised, please contact
                us immediately.
              </p>

              <p className="mb-4">
                If SafariList.com learns of a security systems breach, we will
                inform you and the authorities of the occurrence of the breach
                in accordance with applicable laws.
              </p>

              <h2 id="retention" className="text-lg font-medium mt-8 mb-4">
                Retention of Personal Data
              </h2>

              <p className="mb-4">
                During the creation of a SafariList account, your email address,
                nickname, and password will only be retained if you complete the
                registration. If no response is received after 1 hour, your
                email address, nickname, and password will be permanently
                deleted from our servers.
              </p>

              <p className="mb-4">
                We will retain your personal data for as long as you consider
                your SafariList account to be active. Also, see below our data
                retention policy and your right of erasure.
              </p>

              <p className="mb-4">
                In the case of a web server logs, any personal information will
                be deleted after 24 hours.
              </p>

              <h2 id="accessing" className="text-lg font-medium mt-8 mb-4">
                Accessing and Modifying Your Personal Information
              </h2>

              <p className="mb-4">
                If {`you've`} created an account with SafariList, you can access and
                modify your personal information and preferences by visiting
                your user account.
              </p>

              <h2 className="text-lg font-medium mt-8 mb-4">
                Transfers of Personal Data
              </h2>

              <p className="mb-4">
                We do not sell our {`users'`} private personal data.
              </p>

              <p className="mb-4">
                We only share information about you in the limited circumstances
                detailed below with appropriate safeguards in place:
              </p>

              <p className="mb-4">
                <strong>(1)</strong> As required by law: We may have to disclose
                information about you in response to a court order or other
                governmental requests.
              </p>

              <p className="mb-4">
                Business transfers: In connection with any merger, sale of
                company assets, or acquisition of all or a portion of our
                business by another company, or in the unlikely event that
                SafariList goes out of business or enters bankruptcy, if any of
                these events are related to SafariList Policy continues to apply
                to your personal data, the party receiving your personal data
                may continue to use your personal data, but only consistent with
                this Privacy Policy.
              </p>

              <h2 id="your-rights" className="text-lg font-medium mt-8 mb-4">
                Your Rights
              </h2>

              <p className="mb-4">
                If you reside in the European Union, under the General Data
                Protection Regulation, you have the right to:
              </p>

              <ul className="list-disc pl-8 mb-6 space-y-2">
                <li>
                  Access, correct or delete your personal information that we
                  have collected.
                </li>
                <li>
                  Receive your personal information in a structured and standard
                  machine readable format.
                </li>
                <li>
                  Object to, and restrict, the further processing of your
                  personal information.
                </li>
                <li>Lodge a complaint with a supervisory authority.</li>
              </ul>

              <p className="mb-4">
                To gain access to your personal data, request cancellation or
                erasure of your personal data, or to delete your SafariList user
                account, visit your user account.
              </p>

              <p className="mb-4">
                If you reside in the European Union and you wish to exercise
                your Right to be restricted of processing or your right to
                object to processing, contact our Access Area for assistance at{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  this link
                </a>
                .
              </p>

              <h2 id="updates" className="text-lg font-medium mt-8 mb-4">
                Updates to our Privacy Policy
              </h2>

              <p className="mb-4">
                Our Privacy Policy will be updated as we add new features to
                SafariList.com and as new technologies and products are
                introduced. Also, revisions to the law will also warrant changes
                to our Privacy Policy.
              </p>

              <p className="mb-4">
                When significant changes are undertaken, or if we are required
                by law, we will provide notice of the changes on SafariList.com.
              </p>

              <p className="mb-4">
                The date that our Privacy Policy was updated can be found at the
                top of this page.
              </p>

              <h2
                id="cookie-statement"
                className="text-lg font-medium mt-8 mb-4"
              >
                Cookie Statement
              </h2>

              <p className="text-sm mb-4">Last Updated: July 24, 2024</p>

              <p className="mb-4">
                In compliance with the European Union legislation, we inform you
                that our website SafariList.com will store some information
                about your preferences inside a tiny text file called a
                x{`"remember"`}.
              </p>

              <p className="mb-4">
                A cookie is a small piece of data, which a website asks your
                browser to store on your computer or mobile device. The cookie
                helps the website to {`"remember"`} your actions or preferences over
                time.
              </p>

              <p className="mb-4">
                You can delete all cookies that are already on your computer,
                and you can set most browsers to prevent them from being saved.
                If you do this, however, you may have to manually adjust some
                preferences every time you visit a site and some services and
                functionality may not work.
              </p>

              <p className="mb-4">SafariList.com uses cookies to:</p>
              <ul className="list-disc pl-8 mb-6 space-y-2">
                <li>
                  Identify you as a returning user and count your visits in our
                  traffic statistics analysis.
                </li>
                <li>Remember your display preferences.</li>
                <li>
                  Remember the last search preferences that you searched for in
                  our search field.
                </li>
                <li>
                  Provide additional usability features, including the state of
                  the SafariList sub-menu and whether you want certain content
                  to use certain features.
                </li>
              </ul>

              <p className="mb-4">
                Enabling cookies from SafariList.com is not strictly necessary
                for the website to work, but it will provide you with a better
                browsing experience.
              </p>

              <p className="mb-4">
                The cookie-related information is not used to identify you
                personally, and the content is fully under our control. These
                cookies are not used for any purpose other than those described
                here.
              </p>

              <h3 className="font-medium mt-6 mb-2">Third Party Cookies</h3>

              <p className="mb-4">
                There may also be other types of cookies created after {`you've`}
                visited our website.
              </p>

              <p className="mb-4">
                We use Google Analytics, a popular web analytics service
                provided by Google, Inc. Google Analytics uses cookies to help
                us analyze how users use the site. It counts the number of
                visitors and tells us things about their behavior overall - such
                as the typical length of stay on the site or the average number
                of pages viewed.
              </p>

              <p className="mb-4">
                The information generated by the cookie about your use of our
                website (including your IP address) will be transmitted to and
                stored by Google on servers in the United States. Google will
                use this information for the purpose of evaluating your use of
                our website, compiling reports on website activity for website
                operators, and providing other services relating to website
                activity and internet usage.
              </p>

              <p className="mb-4">
                Google may also transfer this information to third parties where
                required to do so by law, or where such third parties process
                the information on {`Google's`} behalf. Google undertakes not to
                associate your IP address with any other data held by Google.
              </p>

              <h3 className="font-medium mt-6 mb-2">Third Party Ad Servers</h3>

              <p className="mb-4">
                We may have third party advertising companies serving ads to you
                when you visit our website. These companies may store
                information about your visits to our website and to other
                websites to provide you with relevant advertisements about goods
                and services.
              </p>

              <p className="mb-4">
                These companies may employ cookies and other identifiers to
                gather information which measures advertising effectiveness. The
                information is generally not personally identifiable unless, for
                example, you provide personally identifiable information to them
                through an ad or an e-mail message.
              </p>

              <p className="mb-4">
                If you would like to learn more about what options you have
                about limiting the gathering of information by third-party ad
                networks, you can consult the website of the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Network Advertising Initiative
                </a>
                .
              </p>

              <p className="mb-4">
                You can opt out of participating in interest based advertising
                networks but opting out does not mean you will no longer receive
                online advertising. It just means that the companies from which
                you opted out will no longer customize ads based on your
                interests and web usage patterns using cookie-based technology.
              </p>

              <p className="mb-4">
                Please review the privacy policy of our advertising partners:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    {`Google's`} Advertising Privacy Policy
                  </a>
                </li>
              </ul>

              <h3 className="font-medium mt-6 mb-2">
                Controlling and opting out of cookies
              </h3>

              <p className="mb-4">
                Your browser or device may offer settings that allow you to
                choose whether browser cookies are set and to delete them. For
                more information about these controls and to exercise your
                cookie preferences, visit your browser or {`device's`} help
                material. If you choose to reject cookies, as noted above, you
                may not be able to use certain features of our websites and
                services.
              </p>

              <p className="mb-4">
                There is a specific website called{" "}
                <a
                  href="aboutcookies.org"
                  className="text-blue-600 hover:underline"
                >
                  aboutcookies.org
                </a>{" "}
                has been set up to help you with instructions on how you can do
                this on various browsers.
              </p>

              <h3 className="font-medium mt-6 mb-2">Do Not Track</h3>

              <p className="mb-4">
                Some browsers include the ability to transmit {`"Do Not Track"`}
                signals. We do process or respond to {`"Do Not Track"`} signals.
                Instead, we adhere to the standards described in our Privacy
                Statement and this Cookie Statement.
              </p>
            </div>
          </Paper>
         
      <Footer />
    </Grid>
  );
}
