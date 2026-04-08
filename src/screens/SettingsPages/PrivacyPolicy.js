import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { scaleFont } from "../../utils/responsive";
import { appColors } from "../../themes/appColors";

const accordionData = [
  {
    title: "Privacy Policy",
    content: `ELUNARA – PRIVACY POLICY
Last Updated: March 31, 2026

Elunara ("Elunara", "we", "our", or "us") operates an AI-powered educational platform designed to deliver personalized, ethical, and multilingual learning experiences for education (the "Platform"). We are committed to protecting the privacy of our users and handling personal data in a transparent, lawful, and responsible manner.

This Privacy Policy explains how we collect, use, store, disclose, retain, and protect personal data when you access or use our website, mobile application, or services, in compliance with applicable Indian laws, including:

The Information Technology Act, 2000;
The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011; and
The Digital Personal Data Protection Act, 2023 ("DPDP Act").

By accessing or using the Platform, you acknowledge that you have read and understood this Privacy Policy and consent to the practices described herein.

1. DEFINITIONS
For the purposes of this Privacy Policy:

"Personal Data" means any data about an individual who is identifiable by or in relation to such data.
"Sensitive Personal Data" includes passwords, authentication credentials, and such other data as may be notified under applicable law.
"Processing" includes collection, storage, use, disclosure, sharing, retention, and deletion of personal data.
"User" or "You" means any individual who accesses or uses the Platform.

2. SCOPE AND APPLICABILITY
This Privacy Policy applies to all users of the Platform, including students, educators, institutional users, and visitors. It covers personal data collected directly from users, automatically through the Platform, or from lawful third-party sources.

3. INFORMATION WE COLLECT

3.1 Information Provided by You
We may collect the following categories of personal data when you register or interact with the Platform:

Name, email address, phone number, and contact details;
Account login credentials;
Preferred language and communication preferences;
Educational background, course enrollments, and learning objectives;
Feedback, queries, and communications submitted to us.

3.2 Information Collected Automatically
When you use the Platform, we may automatically collect:

Device information (device type, operating system, browser type);
Log data (IP address, access times, pages viewed, interaction logs);
Usage data related to learning activities and platform interactions;
Cookies and similar tracking technologies.

3.3 Information from Third Parties
We may receive limited personal data from:

Payment processors (confirmation of payment status);
Institutional partners or educators (where access is provided through an institution);
Service providers assisting in analytics, security, or infrastructure support.

4. PURPOSES OF PROCESSING
We process personal data strictly for lawful and specified purposes, including:

Creating and managing user accounts;
Delivering and personalizing learning experiences;
Providing multilingual and adaptive educational content;
Responding to user queries and providing support;
Improving platform functionality, performance, and user experience;
Ensuring platform security, fraud prevention, and misuse detection;
Complying with legal, regulatory, and contractual obligations.

5. LEGAL BASIS AND CONSENT
Personal data is processed based on free, informed, specific, and unambiguous consent, as required under the DPDP Act.
Certain processing may be undertaken for legitimate uses permitted by law, such as compliance with legal obligations or prevention of fraud.
Users may withdraw consent at any time, subject to applicable legal and contractual restrictions.

6. USE OF ARTIFICIAL INTELLIGENCE
Elunara uses AI systems to personalize learning pathways, provide explanations, and enhance educational outcomes.
AI systems process user inputs solely for educational assistance and platform improvement.
AI-generated outputs are probabilistic and may not always be accurate; users are encouraged to apply independent judgment.
Elunara does not use personal data for automated decision making that produces legal or similarly significant effects on users.

7. DATA SHARING AND DISCLOSURE
We do not sell personal data. Personal data may be shared only in the following circumstances:

7.1 Service Providers
With trusted third-party service providers who process data on our behalf under strict confidentiality and data protection obligations.

7.2 Legal and Regulatory Authorities
Where required to comply with applicable law, court orders, or governmental requests.

7.3 Business Transfers
In connection with a merger, acquisition, restructuring, or sale of assets, subject to continued protection of personal data.

8. CROSS-BORDER DATA TRANSFERS
Where personal data is transferred outside India, Elunara ensures that such transfers comply with applicable Indian data protection laws and that appropriate safeguards are implemented.

9. DATA RETENTION
Personal data is retained only for as long as necessary to fulfill the purposes for which it was collected.
Retention periods may vary depending on legal, regulatory, or contractual requirements.
Upon expiry of the retention period, data is securely deleted or anonymized.

10. DATA SECURITY MEASURES
Elunara implements reasonable security practices and procedures, including:

Role-based access controls;
Encryption of data in transit and at rest where appropriate;
Regular system monitoring and vulnerability assessments;
Internal data protection and confidentiality policies.

Despite these measures, no system can be completely secure, and users are encouraged to safeguard their account credentials.

11. USER RIGHTS
Subject to applicable law, users have the right to:

Access their personal data;
Request correction or updating of inaccurate data;
Withdraw consent for processing;
Request erasure of personal data;
Seek grievance redressal.

Requests may be made in accordance with the procedure outlined below.

12. CHILDREN'S DATA
The Platform is not intended for children under the age of 13 without verifiable parental or guardian consent.
Where children's data is processed, it is handled with heightened safeguards.
Parents or guardians may request access to or deletion of a child's personal data.

13. COOKIES AND TRACKING TECHNOLOGIES
Elunara uses cookies and similar technologies to:

Enable essential platform functionality;
Analyze usage patterns;
Remember user preferences.

Users may manage cookie preferences through their browser settings.

14. GRIEVANCE REDRESSAL
In accordance with applicable law, users may contact our Grievance Officer/Data Protection contact at:

Email: security@elunara.ai

We will endeavor to address grievances within the timelines prescribed under law.

15. CHANGES TO THIS PRIVACY POLICY
Elunara may update this Privacy Policy from time to time to reflect changes in legal requirements or platform practices. Updated versions will be published on the Platform with a revised effective date.

Continued use of the Platform after such updates constitutes acceptance of the revised Privacy Policy.

16. TRAINING OF AI MODELS
Elunara may use anonymized, aggregated, or de-identified data to improve, train, test, and enhance its AI systems and educational models.
Personal data is not used for AI model training in a manner that identifies individual users unless explicit consent is obtained or permitted by law.
Users may opt out of such training where legally required or supported by the Platform.

17. AUTOMATED PROCESSING & PROFILING
Elunara may use automated tools to personalize content, recommend learning pathways, and improve user experience.
Such processing does not produce legal or similarly significant effects on users.
Human oversight mechanisms are implemented to prevent unfair or biased outcomes.

18. THIRD-PARTY LINKS & INTEGRATIONS
The Platform may contain links to third-party websites, tools, or services.
Elunara is not responsible for the privacy practices of such third parties.
Users are encouraged to review the privacy policies of third-party services independently.

19. COMMUNICATIONS & NOTIFICATIONS
Elunara may send transactional, service-related, educational, and security communications.
Promotional communications, where applicable, will include opt-out mechanisms.

20. DATA ACCURACY & USER RESPONSIBILITIES
Users are responsible for ensuring that personal data provided is accurate and up to date.
Elunara shall not be responsible for inaccuracies arising from incorrect user-provided information.

21. LAW ENFORCEMENT & LEGAL DISCLOSURES
Personal data may be disclosed to law enforcement or regulatory authorities where required by applicable law or to protect legal rights.

22. DO NOT TRACK & SIMILAR SIGNALS
The Platform does not currently respond to browser "Do Not Track" signals, as there is no uniform industry standard.

23. POLICY SEVERABILITY
If any provision of this Privacy Policy is held unenforceable, the remaining provisions shall remain in full force and effect.

24. CONTACT INFORMATION
For privacy-related queries, complaints, or data subject requests, users may contact:

Email: security@elunara.ai

Last Updated: March 31, 2026`,
  },
  {
    title: "Cookie Policy",
    content: `ELUNARA - COOKIE POLICY
Last Updated: March 31, 2026

OBJECTIVE
This Cookie Policy explains how Elunara (hereinafter referred to as "Elunara", "we", "us", or "our") uses cookies and similar technologies on its website (the "Website"). By continuing to browse or use our Website, you agree to the use of cookies as described in this Cookie Policy, unless you choose to disable them through your browser settings. This policy should be read along with the Privacy Policy and Terms of Service on its website.

1. What Are Cookies?
Cookies are small text files that are placed on your computer, mobile device, or other internet-enabled device when you visit a website. Cookies help the website recognize your device, remember your preferences, and improve your overall user experience.

Cookies may be "session cookies" (which are deleted when you close your browser) or "persistent cookies" (which remain on your device for a defined period or until deleted manually).

2. Why We Use Cookies
Elunara uses cookies to:

Ensure the Website functions properly
Improve website performance and security
Understand how users interact with the Website
Remember user preferences and settings
Enhance user experience and usability

We do not use cookies to collect personally identifiable information unless you voluntarily provide such information through the Website.

3. Types of Cookies We Use

3.1. Essential Cookies
These cookies are strictly necessary for the operation of the Website. They enable core functionalities such as page navigation, access to secure areas, and protection against fraudulent activity. Without these cookies, the Website may not function properly.

3.2. Analytics Cookies
Analytics cookies help us understand how visitors interact with the Website by collecting information such as pages visited, time spent on the Website, and error messages encountered. This data is aggregated and anonymized and is used solely to improve website performance and user experience.

3.3. Preference Cookies
Preference cookies allow the Website to remember information that changes the way the Website behaves or looks, such as language preferences, region selection, or other customized settings.

3.4. Security Cookies
These cookies help detect malicious activity and protect user accounts and data. They support the integrity and security of the Website.

3.5. Third-Party Cookies
In some cases, cookies may be placed by trusted third-party service providers such as analytics or technology partners. These third parties may use cookies in accordance with their own privacy and cookie policies. Elunara does not control these cookies.

4. User Control and Cookie Management
You have the right to control and manage cookies. Most web browsers allow you to:

View cookies stored on your device
Delete existing cookies
Block all or specific categories of cookies
Receive alerts before cookies are stored

Please note that disabling or blocking certain cookies, especially essential cookies, may affect the functionality and performance of the Website.

5. Consent
Where required by law, Elunara obtains user consent before placing non-essential cookies on your device. By continuing to use the Website after being presented with a cookie notice, you consent to the use of cookies in accordance with this policy.

6. Data Protection and Legal Compliance
This Cookie Policy is governed by and complies with applicable laws in India, including but not limited to:

Information Technology Act, 2000
Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011
Digital Personal Data Protection Act, 2023

Any personal data collected through cookies is processed in accordance with our Privacy Policy and applicable data protection laws.

7. Updates to This Cookie Policy
Elunara reserves the right to update or modify this Cookie Policy at any time. Any changes will be posted on this page with an updated "Last Updated" date. Users are encouraged to review this policy periodically.

8. Contact Information
If you have any questions or concerns regarding this Cookie Policy or the use of cookies on the Website, you may contact us at:

Email: security@elunara.ai`,
  },
  {
    title: "Data Retention & Deletion Policy",
    content: `ELUNARA – DATA RETENTION & DELETION POLICY
Last Updated: March 31, 2026

1. Purpose of the Policy
Elunara ("Company", "we", "us", or "our") is committed to handling personal data in a lawful, fair, and transparent manner. This Data Retention & Deletion Policy ("Policy") explains how long we retain personal data collected through the Elunara website ("Website"), the purposes for which such data is retained, and the manner in which data is deleted or anonymized once it is no longer required.

This Policy forms an integral part of Elunara's Privacy Policy and Terms of Service.

2. Scope
This Policy applies to all personal data and non-personal data collected, processed, stored, or otherwise handled by Elunara through the Website, including data of:

Users, visitors, and registered account holders
Prospective users and applicants
Vendors, partners, and service providers (where applicable)

3. Applicable Laws
This Policy is framed in accordance with applicable Indian laws and regulations, including but not limited to:

The Information Technology Act, 2000
The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011
The Digital Personal Data Protection Act, 2023 (DPDP Act)
Any rules, guidelines, or amendments issued thereunder from time to time

Where applicable, Elunara also follows globally accepted data protection principles.

4. Retention Principles
Elunara follows the principles outlined below while retaining data:

a) Purpose Limitation
Data is retained only for specific, explicit, and lawful purposes communicated to the user at the time of collection.

b) Data Minimization
Only such data that is necessary for the intended purpose is retained.

c) Limited Retention
Personal data is retained only for as long as required to fulfill the purpose for which it was collected, unless a longer retention period is required by law.

d) Legal and Regulatory Compliance
Certain data may be retained for extended periods to comply with statutory, regulatory, accounting, audit or legal obligations.

e) Security and Confidentiality
Data retained by Elunara is protected through appropriate technical and organizational safeguards.

6. Data Deletion and Anonymization
Once personal data is no longer required for the purposes stated above, Elunara shall:

Securely delete the data; or
Irreversibly anonymize the data so that it can no longer be associated with an identifiable individual

Deletion is carried out using industry-standard practices to prevent unauthorized access, recovery, or misuse.

7. User-Initiated Deletion Requests
Users may request deletion of their personal data by contacting Elunara using the details provided in Section 11.

Deletion requests shall be processed subject to the following conditions:

Verification of the identity of the requester
Compliance with applicable legal and regulatory obligations
Retention of data where required for legal claims, dispute resolution, fraud prevention, or statutory compliance

Where immediate deletion is not permissible, the data shall be securely restricted and retained only for the legally mandated period.

8. Exceptions to Deletion
Elunara may retain certain data notwithstanding a deletion request where:

Retention is required under applicable law or court order.
Data is necessary for the establishment, exercise or defense of legal claims.
Retention is required for audits, investigations or regulatory inquiries.
Data is required to enforce contractual rights or obligations.

9. Storage and Security of Retained Data
All retained data is stored on secure servers with appropriate access controls, encryption and monitoring mechanisms. Elunara periodically reviews retained data to ensure continued relevance and compliance with this Policy.

10. Policy Review and Updates
Elunara reserves the right to update or modify this Policy at any time to reflect changes in law, technology, or business practices. Any material changes shall be published on the Website with an updated "Last Updated" date.

11. Contact and Grievance Redressal
For questions, concerns or requests related to data retention or deletion, users may contact:

Email: security@elunara.ai`,
  },
  {
    title: "Security & Incident Response Policy",
    content: `SECURITY & INCIDENT RESPONSE POLICY
Last Updated: March 31, 2026

Elunara ("Elunara", "we", "our", or "us") is committed to protecting the security, confidentiality, and integrity of information processed through its website, platform, and related services ("Platform"). This Security & Incident Response Policy outlines the technical, administrative, and organizational measures adopted by Elunara to safeguard data and describes the procedures followed in the event of a security incident or data breach.

This Policy forms an integral part of Elunara's Terms of Service and Privacy Policy.

1. Scope of the Policy
This Policy applies to:

All users of the Elunara website and services
All data collected, stored, processed, or transmitted by Elunara
All employees, contractors, service providers, and partners with access to Elunara systems

2. Information Security Objectives
Elunara's security framework is designed to:

Prevent unauthorized access, use, disclosure, alteration, or destruction of data
Protect personal data and sensitive personal data
Ensure availability and reliability of Platform services
Detect, respond to, and recover from security incidents promptly

3. Security Measures Implemented
Elunara implements reasonable security practices and procedures as required under applicable Indian law, including the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.

3.1. Access Controls
Role-based access control (RBAC) to restrict system access on a need-to-know basis
Strong authentication mechanisms, including passwords and multi-factor authentication where applicable
Periodic review and revocation of access rights
Segregation of duties to reduce the risk of misuse or error

3.2. Encryption
Encryption of sensitive data in transit using industry-standard secure communication protocols
Encryption of sensitive and confidential data at rest where feasible
Secure key management practices to prevent unauthorized decryption

3.3. Monitoring and Audits
Continuous monitoring of systems for suspicious activity or unauthorized access
Logging of system events and access attempts
Periodic internal security assessments and audits
Vulnerability assessments and penetration testing conducted at regular intervals or after major system changes

4. Infrastructure and Network Security
Firewalls and intrusion detection or prevention systems are deployed to protect network boundaries
Secure configuration of servers, databases, and applications
Regular patching and updates to address known security vulnerabilities
Backup and disaster recovery mechanisms to ensure data availability and integrity

5. Employee and Vendor Security Practices
Employees and contractors are bound by confidentiality and data protection obligations
Access to systems is granted only after appropriate authorization
Security awareness and training programs are conducted periodically
Third-party service providers are required to implement comparable security safeguards and comply with contractual security obligations

6. Incident Detection and Classification
A "Security Incident" includes any actual or suspected event that:

Compromises the confidentiality, integrity, or availability of data
Results in unauthorized access, disclosure, alteration, or loss of information
Affects Platform operations or user trust

Incidents are assessed and classified based on severity, impact, and scope.

7. Incident Response Framework
Elunara follows a structured incident response process, which includes:

7.1. Identification
Detection of security incidents through monitoring systems, alerts, audits, or user reports

7.2. Containment
Immediate steps to limit the impact of the incident
Isolation of affected systems where necessary

7.3. Investigation and Assessment
Identification of the root cause and affected data or systems
Assessment of potential harm to users and the Platform

7.4. Remediation
Fixing vulnerabilities and restoring systems to normal operation
Strengthening controls to prevent recurrence

8. Data Breach Notification
In the event of a personal data breach, Elunara shall:

Notify affected users without undue delay where required by law
Notify relevant authorities, including the Indian Computer Emergency Response Team (CERT-In), as mandated under applicable laws and directions
Provide information regarding the nature of the breach, likely consequences, and remedial measures taken or proposed

Notifications shall be made in accordance with:

The Information Technology Act, 2000
CERT-In Directions, 2022
Any other applicable laws, rules, or regulatory requirements

9. User Responsibilities
Users are responsible for:

Maintaining the confidentiality of their login credentials
Using strong passwords and secure devices
Promptly notifying Elunara of any suspected unauthorized access or security vulnerability related to their account

Elunara shall not be responsible for security incidents arising from user negligence or compromised credentials beyond its reasonable control.

10. Limitation of Liability
While Elunara implements reasonable security practices, no system is completely secure. To the extent permitted by law, Elunara shall not be liable for losses arising from security incidents beyond its reasonable control, provided it has complied with applicable legal and regulatory obligations.

11. Policy Review and Updates
This Policy may be updated periodically to reflect changes in technology, legal requirements, or business practices. Updated versions will be published on the website with a revised "Last Updated" date.

Continued use of the Platform after such updates constitutes acceptance of the revised Policy.

12. Contact Information
For reporting security concerns or incidents, users may contact:

Email: security@elunara.ai
Grievance Officer: As detailed in the Grievance Redressal Policy`,
  },
  {
    title: "Child Safety & Minor Protection Policy",
    content: `ELUNARA - CHILD SAFETY & MINOR PROTECTION POLICY
Last Updated: March 31, 2026

Elunara is committed to creating a safe, responsible and respectful digital environment. This Child Safety & Minor Protection Policy outlines how Elunara safeguards the rights, privacy and well-being of children and minors while using its website, services, and digital platforms.

This Policy should be read in conjunction with Elunara's Privacy Policy, Terms of Service and Cookie Policy.

1. Purpose of the Policy
The purpose of this Policy is to:

Protect children and minors from harm, exploitation, abuse and inappropriate exposure.
Ensure responsible data handling for users below the age of 18.
Comply with applicable child protection and data protection laws in India.
Define parental rights and Elunara's obligations regarding minor users.

2. Definitions
Child / Minor: Any individual under the age of 18 years, as defined under Indian law.
Parental Consent: Verifiable consent provided by a parent or legal guardian for a child to access Elunara's services.
Personal Data: Any information that can identify a user directly or indirectly.

3. Age Restriction
Elunara does not knowingly provide services to children under the age of 13 without verified parental or legal guardian consent.

Users below 13 years of age may only access Elunara's services where explicit parental consent has been obtained.
Users between 13 and 18 years may access limited features, subject to enhanced safeguards and monitoring.
If Elunara becomes aware that personal data of a child under 13 has been collected without consent, such data will be deleted promptly.

4. Safeguards for Children and Minors
Elunara has implemented the following safeguards to protect minor users:

4.1. Enhanced Data Protection for Minors
Strong technical and organizational security measures are applied to protect minors' data.
Encryption and access controls are used wherever applicable.
Minor data is not used for profiling, behavioral targeting or advertising.

4.2. Limited Data Collection
Only minimum necessary data is collected from minors.
Sensitive personal data is not collected unless strictly required for service delivery.
No unnecessary tracking or analytics involving minors is conducted.

4.3. Restricted Use of Data
Minor data is not sold, shared, or disclosed to third parties for commercial purposes.
Data is used solely for educational, operational, or safety-related purposes.

5. Parental Rights and Controls
Parents or legal guardians have the right to:

Access their child's personal data.
Request correction or deletion of their child's data.
Withdraw consent at any time.
Request information on how the data is processed.

All such requests may be submitted to security@elunara.ai and Elunara will respond within a reasonable time as required by law.

6. Content and Interaction Safety
Elunara takes reasonable measures to ensure that:

Content accessible to minors is age-appropriate.
Harmful, abusive, sexual, violent, or exploitative material involving children is strictly prohibited.
Any form of child sexual abuse material (CSAM) is reported to relevant authorities immediately.

Users are encouraged to report inappropriate content or behavior involving minors.

7. Reporting and Grievance Redressal
Any concerns related to child safety, data misuse, or inappropriate conduct may be reported to:

Grievance Officer
Name: [Insert Name]
Email: security@elunara.ai
Address: [Insert Address]

Complaints involving children will be treated as high priority and handled confidentially.

8. Legal Compliance
This Policy is designed in compliance with applicable Indian laws, including but not limited to:

Information Technology Act, 2000 and applicable rules.
Digital Personal Data Protection Act, 2023 (DPDP Act).
Applicable guidelines issued by the Ministry of Electronics and Information Technology (MeitY).

Where applicable, Elunara also aligns with internationally recognized child safety standards.

9. Data Retention
Personal data of minors is retained only for as long as necessary to fulfill the stated purpose.
Data is securely deleted upon withdrawal of consent or once it is no longer required.

10. Policy Updates
Elunara reserves the right to modify this Policy at any time to reflect legal, technological, or operational changes. Updates will be published on the website, and continued use of the platform constitutes acceptance of the revised Policy.

11. Contact Information
For questions or concerns regarding this Policy, please contact:

Elunara Support Team
Email: security@elunara.ai`,
  },
];

const renderFormattedContent = (content) => {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    const trimmed = line.trim();

    // Empty line → spacer
    if (trimmed === "") {
      return <View key={i} style={styles.lineSpacer} />;
    }

    // Document title (all caps + dash/em-dash + more caps)
    if (/^[A-Z][A-Z\s]+[–-]\s+[A-Z]/.test(trimmed)) {
      return (
        <Text key={i} style={styles.docTitle}>
          {trimmed}
        </Text>
      );
    }

    // "Last Updated:" line
    if (/^Last Updated:/i.test(trimmed)) {
      return (
        <Text key={i} style={styles.metaText}>
          {trimmed}
        </Text>
      );
    }

    // Sub-numbered heading e.g. "3.1 Information Provided by You" or "3.1. Essential Cookies"
    if (/^\d+\.\d+\.?\s+\S/.test(trimmed)) {
      return (
        <Text key={i} style={styles.subHeading}>
          {trimmed}
        </Text>
      );
    }

    // Main numbered heading e.g. "1. DEFINITIONS"
    if (/^\d+\.\s+[A-Z]/.test(trimmed)) {
      return (
        <Text key={i} style={styles.mainHeading}>
          {trimmed}
        </Text>
      );
    }

    // All-caps standalone heading e.g. "OBJECTIVE"
    if (/^[A-Z][A-Z\s&]{2,}$/.test(trimmed)) {
      return (
        <Text key={i} style={styles.mainHeading}>
          {trimmed}
        </Text>
      );
    }

    // Lettered sub-heading e.g. "a) Purpose Limitation"
    if (/^[a-z]\)\s+[A-Z]/.test(trimmed)) {
      return (
        <Text key={i} style={styles.subHeading}>
          {trimmed}
        </Text>
      );
    }

    // Default paragraph
    return (
      <Text key={i} style={styles.accordionContentText}>
        {trimmed}
      </Text>
    );
  });
};

const AccordionItem = ({ index, title, content, isOpen, onToggle }) => {
  return (
    <Animated.View
      layout={LinearTransition.duration(250)}
      style={styles.accordionWrapper}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onToggle}
        style={styles.accordionHeader}
      >
        <View style={styles.numberBadge}>
          <Text style={styles.numberBadgeText}>{index + 1}</Text>
        </View>
        <Text style={styles.accordionTitle} numberOfLines={2}>
          {title}
        </Text>
        {isOpen ? (
          <ChevronUp
            size={32}
            color={appColors.navyBlueShade}
            strokeWidth={1}
          />
        ) : (
          <ChevronDown
            size={32}
            color={appColors.navyBlueShade}
            strokeWidth={1}
          />
        )}
      </TouchableOpacity>
      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}
          style={styles.accordionContent}
        >
          {renderFormattedContent(content)}
        </Animated.View>
      )}
    </Animated.View>
  );
};

const PrivacyPolicy = ({ handleScroll }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        onScroll={handleScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            backgroundColor: "#F3F3F3",
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <Text style={styles.headerLabel}>Privacy Policy</Text>
          <Text style={styles.mainTitle}>We care about your privacy</Text>
          <Text style={styles.introText}>
            Your privacy is important to us at Elunara. We respect your privacy
            regarding any information we may collect from you across our
            website.
          </Text>
        </View>

        {/* Accordions */}
        <View style={styles.accordionList}>
          {accordionData.map((item, index) => (
            <AccordionItem
              key={index}
              index={index}
              title={item.title}
              content={item.content}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  headerLabel: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 8,
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
  },
  mainTitle: {
    fontSize: scaleFont(24),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1A1A1A",
    marginBottom: 12,
    lineHeight: 36,
  },
  introText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#666666",
    lineHeight: 24,
  },
  accordionList: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 14,
  },
  accordionWrapper: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    overflow: "hidden",
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 18,
    gap: 12,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: appColors.navyBlueShade,
    alignItems: "center",
    justifyContent: "center",
  },
  numberBadgeText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Bold",
    fontWeight: "600",
  },
  accordionTitle: {
    flex: 1,
    fontSize: scaleFont(15),
    fontFamily: "Mukta-Bold",
    fontWeight: "600",
    color: "#1A1A1A",
  },
  accordionContent: {
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F1F1",
    marginTop: 4,
  },
  accordionContentText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#5E5E5E",
    lineHeight: 22,
  },
  docTitle: {
    fontSize: scaleFont(18),
    fontFamily: "Mukta-Bold",
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 4,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  metaText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#888888",
    fontStyle: "italic",
    marginBottom: 6,
  },
  mainHeading: {
    fontSize: scaleFont(16),
    fontFamily: "Mukta-Bold",
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 14,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  subHeading: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
    fontWeight: "600",
    color: "#1A1A1A",
    marginTop: 8,
    marginBottom: 2,
  },
  lineSpacer: {
    height: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});

export default PrivacyPolicy;
