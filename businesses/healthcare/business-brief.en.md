# Business Brief - Healthcare

## Industry Overview
Healthcare organizations operate in a highly regulated environment where patient safety, data privacy, and clinical accuracy are non-negotiable. Typical entities include hospitals, clinics, diagnostic labs, and specialty care providers.

Core operations span patient registration, clinical documentation, appointment scheduling, lab processing, billing and insurance claims, pharmacy dispensing, and telemedicine. Most mid-size facilities run 5-15 disconnected software systems, leading to data silos, manual re-entry, and compliance risk.

Digital transformation drivers include rising patient expectations for self-service, value-based care reimbursement models, interoperability mandates (HL7 FHIR), and increasing adoption of AI-assisted diagnostics.

## Key Pain Points
- Fragmented patient data across EMR, billing, and scheduling systems
- Manual insurance claim filing causing revenue cycle delays
- No-show rates of 15-30% due to poor appointment management
- Paper-based consent and clinical notes slowing physician workflows
- Difficulty meeting compliance audits (HIPAA, local health data laws)
- Limited patient self-service leading to high call center volume

## Target Personas
- **Hospital Administrator / CEO**: Operational efficiency, cost control, compliance oversight
- **Physician / Specialist**: Clinical documentation, patient history access, care coordination
- **Nurse / Care Coordinator**: Patient flow, medication administration, care plans
- **Billing / Revenue Cycle Manager**: Claims processing, denial management, collections
- **IT Manager**: System integration, data security, uptime
- **Patient**: Appointment booking, results access, secure messaging

## Key Performance Indicators
- Average patient wait time (target: < 15 min)
- No-show rate (target: < 10%)
- Clean claim rate (target: > 95%)
- Days in accounts receivable (target: < 35 days)
- Patient satisfaction score (NPS > 50)
- Average time to clinical note completion (target: < 4 hours)
- Bed occupancy rate and turnover

## Regulatory & Compliance Landscape
- HIPAA (US) or equivalent health data protection law
- HL7 FHIR interoperability standards
- FDA / local medical device and software regulations
- Insurance and billing compliance (ICD-10, CPT coding)
- Clinical data retention requirements (typically 7-10 years)

## Typical Digital Maturity
Most healthcare organizations have adopted basic EMR but still rely heavily on spreadsheets for scheduling, manual processes for billing reconciliation, and phone/fax for referrals. Integration between clinical and administrative systems is the primary gap.

## App Catalog (14 apps)

### Essential (build first)
1. **emr-ehr** — Electronic medical/health records for clinical documentation and patient history
2. **appointment-scheduling** — Patient appointment booking, queue management, and provider calendar coordination
3. **billing-rcm** — Revenue cycle management including claims, invoicing, payments, and denial management

### Important (phase 2)
1. **crm** — Patient relationship management for engagement, referral tracking, and care journey coordination
2. **patient-portal** — Patient-facing self-service portal for appointments, results, messaging, and payments
3. **telehealth** — Virtual consultation platform with video calls, e-prescriptions, and clinical session notes
4. **crm** — Patient relationship management for engagement, referral tracking, outreach campaigns, and care journey coordination
5. **accounting-finance** — General ledger, accounts payable/receivable, financial reporting, and healthcare-specific billing reconciliation
6. **hris** — Employee profiles, attendance, payroll, leave management, credentialing, and performance reviews for clinical and admin staff
7. **bi-analytics** — Clinical and operational dashboards, KPI monitoring, and self-service reporting for healthcare data

### Advanced (scale & optimization)
1. **lab-information-system** — Laboratory workflow management for sample tracking, instrument interfacing, and result validation
2. **clinical-decision-support** — Evidence-based clinical guidance, drug interaction alerts, diagnostic support, and care protocol management
3. **pharmacy-management** — Pharmacy dispensing, drug inventory, prescription verification, and controlled substance tracking

## Notes
- Prompts can be written in Vietnamese.
- Generated technical files should stay in English or bilingual EN/VI.
