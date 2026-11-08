import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { EmailLink, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "How enquiries, bookings, payments and changes work when Terra & Tent styles your wedding.",
  path: "/terms",
});

export default function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These terms explain how booking with Terra & Tent works, from the first quote to the morning after your wedding."
      updated="1 November 2026"
      sections={[
        {
          title: "Who we are",
          body: "These terms cover the styling, design and decor services offered by Terra & Tent, a wedding styling studio at 14 Orchard Lane, Chipping Campden, GL55 6AB. By booking with us or using this site, you agree to them.",
        },
        {
          title: "Enquiries and quotes",
          body: "An enquiry does not commit you to anything. Quotes are based on what we know at the time and stay valid for 30 days. If your plans change, we will update the quote before anything is confirmed.",
        },
        {
          title: "Booking your date",
          body: "Your date is held once we have a signed agreement and a booking fee of 30% of the quote. The fee secures our time and the studio for your wedding, and it is not refundable.",
        },
        {
          title: "Payments",
          body: "The balance is due six weeks before your wedding. Anything added after that, such as extra pieces or more guests, is invoiced separately and due before the day.",
        },
        {
          title: "Changes and cancellations",
          body: "If you need to move your date, tell us as soon as you can and we will do our best to follow you. If you cancel more than six months ahead, you lose only the booking fee. Closer to the day, costs we have already committed to, such as flowers and hired items, are also payable.",
        },
        {
          title: "On the day",
          body: "We need clear access to your site for setup and take-down at the times we agree with you and your venue. Weather can change a plan, and we will always adjust the styling to keep guests safe and comfortable.",
        },
        {
          title: "Our pieces",
          body: "The furniture, tents, linen and decor we bring stay ours. Please treat them with care. Loss or damage beyond normal wear may be charged at the cost of replacing them.",
        },
        {
          title: "Photographs",
          body: "We may photograph our styling for our portfolio, journal and social channels. We never share photographs of you or your guests without your permission.",
        },
        {
          title: "Our responsibility",
          body: "We take care with everything we build and carry public liability insurance. We are not responsible for losses caused by things outside our control, such as severe weather or a venue closing.",
        },
        {
          title: "Changes to these terms",
          body: "We may update these terms from time to time. The date at the top shows when they last changed, and the version in your signed agreement is the one that applies to your wedding.",
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
