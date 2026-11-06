import type { Metadata } from "next";
import { EmailLink, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Terra & Tent",
  description:
    "What Terra & Tent collects when you visit the site or send an enquiry, why we collect it, and how we look after it.",
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This page explains what we collect when you visit Terra & Tent or send us an enquiry, why we collect it, and how we look after it."
      updated="1 November 2026"
      sections={[
        {
          title: "Who we are",
          body: (
            <p>
              Terra &amp; Tent is a wedding styling and decor studio based at 14
              Orchard Lane, Chipping Campden, GL55 6AB. We are responsible for
              the personal information you share with us. You can reach us at{" "}
              <EmailLink />.
            </p>
          ),
        },
        {
          title: "What we collect",
          body: "When you send an enquiry, we collect your name, your partner’s name if you share it, your email address, phone number, wedding date, venue, guest count and anything you tell us about your day. When you browse the site, we may also collect basic technical information such as your browser type, device and the pages you visit.",
        },
        {
          title: "How we use it",
          body: "We use your details to reply to your enquiry, plan and quote for your wedding, and keep in touch while we work together. We do not use them for anything unrelated, and we never sell your information.",
        },
        {
          title: "Why we are allowed to",
          body: "We process your information because you asked us to get in touch, because we need it to provide our services, and because we have a legitimate interest in running and improving the studio.",
        },
        {
          title: "Who we share it with",
          body: "Only the people who help us run the studio, such as our website host, email provider and form service, and only so far as they need it. We may also share details with suppliers on your wedding day if you ask us to. We will share information if the law requires it.",
        },
        {
          title: "Cookies",
          body: "We use only the cookies needed to make the site work and understand how it is used. You can block or delete cookies in your browser settings, and the site will still work.",
        },
        {
          title: "How long we keep it",
          body: "We keep enquiry details for up to two years if we do not work together. If we do, we keep project records for up to six years for accounting and legal reasons, then delete them.",
        },
        {
          title: "Your rights",
          body: "You can ask to see the information we hold about you, correct it, delete it, limit how we use it, or take a copy with you. You can also object to our use of it. Email us and we will reply within one month. If you are unhappy with how we handle your information, you can complain to the Information Commissioner’s Office at ico.org.uk.",
        },
        {
          title: "Keeping it safe",
          body: "We take sensible steps to protect your information, including secure hosting and limited access. No online system is completely secure, so please avoid sending sensitive details such as bank information by email.",
        },
        {
          title: "Changes to this policy",
          body: "We may update this page from time to time. The date at the top will always show when it last changed.",
        },
        {
          title: "Questions",
          body: (
            <p>
              Write to <EmailLink /> or visit us at 14 Orchard Lane, Chipping
              Campden, GL55 6AB.
            </p>
          ),
        },
      ]}
    />
  );
}
