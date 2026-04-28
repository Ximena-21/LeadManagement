import { useState } from "react";
import { CareersSection } from "../ui/organisms/CareersSection";
import { HomeHero } from "../ui/organisms/HomeHero";
import { LeadModal } from "../ui/organisms/LeadModal";

export function Home() {
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <>
      <HomeHero onRequestInfo={() => setLeadOpen(true)} />
      <CareersSection />
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </>
  );
}
