# MASTER SERVICE AGREEMENT — DRAFT TEMPLATE

**Document ID:** NEO-MSA-2026-DRAFT  
**Classification:** Public Transparency Draft — Non-Binding Until Execution  
**Issuer:** NEO STUDIO SPACE  
**Effective Upon Execution:** As stated in accompanying Statement of Work (SOW)

---

## Preamble

This Master Service Agreement ("Agreement") is entered into between **NEO STUDIO SPACE**, a design-engineering and AI systems studio ("Provider"), and the client legal entity identified in the executed Statement of Work ("Client"). This document is published openly for procurement, legal review, and enterprise diligence. **No rights or obligations arise until both parties execute this Agreement and an accompanying SOW.**

---

## 1. Definitions

- **Deliverables** — Source code, design systems, infrastructure configurations, deployment artifacts, documentation, and AI model integration assets produced under an SOW.
- **Milestone** — A discrete, acceptance-gated unit of work with documented criteria, staging deployment, and release notes.
- **Sprint** — A fixed iteration cycle, defaulting to fourteen (14) calendar days, unless otherwise specified in the SOW.
- **Change Order** — A written amendment to scope, timeline, or fees, mutually approved before implementation.
- **Staging Environment** — An isolated, access-controlled deployment URL used for review, QA, and acceptance testing.
- **Work Product** — All custom materials created specifically for Client under an SOW, excluding Provider's pre-existing tools, frameworks, and general methodologies.

---

## 2. Scope of Services

Provider shall perform software engineering, product design, full-stack architecture, and AI systems integration services as defined in each SOW. Services are delivered under an **iterative bi-weekly sprint model** emphasizing:

- Demonstrable staging deployments at sprint conclusion
- Written release notes and acceptance checkpoints
- Transparent backlog visibility and velocity reporting
- Documented architectural decisions (ADRs) for material technical choices

Provider does not guarantee outcomes beyond the explicit acceptance criteria defined in the active SOW. Exploratory research spikes, if required, shall be scoped separately in writing.

---

## 3. Sprint Delivery & Milestone Acceptance

### 3.1 Sprint Cadence

Each sprint begins with kickoff alignment on priorities and concludes with:

1. Staging deployment of sprint deliverables
2. Release notes describing scope, known limitations, and verification steps
3. Milestone acceptance request submitted to Client

### 3.2 Acceptance Criteria

Milestone completion is measured against criteria documented at sprint kickoff. Client shall review deliverables within **five (5) business days** of acceptance request. Acceptance may be:

- **Approved** — in writing or via documented sign-off channel
- **Rejected with Cause** — specific, actionable deficiency list tied to agreed criteria
- **Deemed Accepted** — if no written rejection is received within the review window

Provider shall remediate validated deficiencies within the next sprint at no additional fee when deficiencies fall within agreed scope.

### 3.3 Change Orders

Client may request scope modifications at any time. Provider shall deliver a Change Order proposal within **forty-eight (48) hours**, including impact on timeline, cost, and dependencies. **No out-of-scope work shall commence without written Change Order approval.**

---

## 4. Intellectual Property & Ownership

### 4.1 Assignment

Upon clearance of fees attributable to the relevant Milestone, Provider assigns to Client all right, title, and interest in Work Product created under the SOW, including:

- Application source code and repositories
- Design systems, tokens, and component libraries
- Infrastructure-as-code and environment configurations
- Custom AI orchestration logic, prompts, and integration layers specific to Client

### 4.2 Provider Retained Rights

Provider retains ownership of pre-existing frameworks, internal tooling, and generalized methodologies. Provider may request a **limited portfolio license** to display anonymized or credited work; such license requires Client's written consent and may be declined without penalty.

### 4.3 No Vendor Lock-In

Provider shall not embed proprietary runtime dependencies that prevent Client from operating, modifying, or migrating Deliverables. Third-party services shall be disclosed in the SOW with documented exit paths.

---

## 5. Confidentiality & Data Protection

### 5.1 Mutual NDA

Prior to transmission of proprietary business logic, production datasets, credentials, or regulated personal data, both parties shall execute a **mutual Non-Disclosure Agreement**. Provider shall not process Client confidential information before NDA execution.

### 5.2 Data Handling Standards

Provider maintains:

- Tenant-isolated staging environments with role-based access control
- Encrypted secrets management; no credentials in source control
- Principle of least privilege for engineering access
- Documented data retention and deletion procedures upon project completion

### 5.3 AI & Model Training

Client data shall **not** be used to train third-party foundation models or Provider public datasets without Client's explicit written consent. Local and private LLM staging clusters, when used, operate within isolated network boundaries defined in the SOW.

---

## 6. Fees, Invoicing & Payment

Fees are structured per SOW — typically per sprint, milestone, or fixed-phase engagement. Invoices are due within **fifteen (15) days** unless otherwise stated. Late payments may suspend active development after written notice and a five (5) business day cure period.

Provider does not require mandatory post-launch maintenance retainers in base agreements. Optional support windows may be added via separate SOW.

---

## 7. Warranties & Representations

Provider warrants that:

- Services shall be performed in a professional manner consistent with industry standards for senior engineering practice
- Deliverables shall substantially conform to documented acceptance criteria at time of approval
- Provider has the right to enter this Agreement and assign Work Product as specified

**EXCEPT AS EXPRESSLY STATED, DELIVERABLES ARE PROVIDED "AS IS" AFTER ACCEPTANCE.** Provider disclaims implied warranties of merchantability and fitness for a particular purpose beyond the acceptance window.

---

## 8. Limitation of Liability

Except for breaches of confidentiality, IP assignment obligations, or willful misconduct, each party's aggregate liability under this Agreement shall not exceed **fees paid by Client to Provider under the active SOW during the twelve (12) months preceding the claim**.

Neither party shall be liable for indirect, incidental, special, consequential, or punitive damages, including lost profits or business interruption, even if advised of the possibility.

---

## 9. Handoff, Documentation & System Sovereignty

Upon project completion or termination, Provider shall deliver:

- Full repository access and branch protection documentation
- Typed API specifications (OpenAPI / TypeScript contracts where applicable)
- CI/CD pipeline documentation and deployment runbooks
- Environment variable maps with secrets redacted
- Architectural overview and operational runbooks for Client engineering teams

Client shall receive sufficient materials to operate, extend, and audit the system **without ongoing dependency on Provider**, subject to optional support agreements.

---

## 10. Term, Termination & Survival

Either party may terminate for material breach with thirty (30) days written notice and opportunity to cure. Upon termination, Client shall pay for accepted Milestones and work-in-progress per the SOW wind-down terms.

Sections relating to confidentiality, IP assignment (for paid work), limitation of liability, and dispute resolution survive termination.

---

## 11. Governing Law & Dispute Resolution

Governing law and venue shall be specified in the executed SOW. Parties shall first attempt good-faith executive negotiation. Unresolved disputes shall proceed to **binding arbitration** under rules mutually agreed in the SOW, unless otherwise required by applicable law.

---

## 12. Execution

| Party | Authorized Signatory | Title | Date |
|-------|---------------------|-------|------|
| NEO STUDIO SPACE | _________________________ | _________________________ | ________ |
| CLIENT ENTITY | _________________________ | _________________________ | ________ |

---

**DISCLAIMER:** This template is published for transparency and procurement review only. It does not constitute legal advice. Engage qualified counsel before execution. Executed agreements and SOWs supersede this draft in all respects.
