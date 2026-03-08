# Research Notes for Business-App Catalog

This repository's default matrix (`business -> app`) is based on:

## 1) Industry-first organization

- NAICS framework is used as a practical reference for organizing businesses by industry.
- Source: U.S. Census - Understanding NAICS
  - https://www.census.gov/programs-surveys/economic-census/year/2022/guidance/understanding-naics.html

## 2) Core cross-industry enterprise app families

- CRM scope (sales, service, marketing, operations context)
  - Microsoft Dynamics 365 overview:
  - https://www.microsoft.com/en-us/dynamics-365
- ERP scope (finance, HR, supply chain, procurement and related core processes)
  - SAP ERP overview:
  - https://www.sap.com/products/erp/what-is-erp.html
- HCM/HR domain for workforce workflows
  - Oracle HCM overview:
  - https://www.oracle.com/human-capital-management/what-is-hcm/
- WMS and TMS for logistics/manufacturing/retail operations
  - Oracle WMS overview:
  - https://www.oracle.com/scm/logistics/warehouse-management/
  - Oracle TMS overview:
  - https://www.oracle.com/scm/logistics/transportation-management/

## 3) Additional heuristic from attached file

- Internal reference read from:
  - `/Users/nickmac/Documents/GitHub/GTEMAS-TOOLS/gtemas-project-init/sw_roles_ai_era.docx`
- Key takeaway used in templates/config:
  - AI accelerates boilerplate but business logic must have human review.
  - Security/compliance/governance is mandatory in enterprise workflows.

## 4) Practical implementation rule

- Every app blueprint includes:
  - `priority` (Priority levels):
    - `essential`: should be implemented first
    - `important`: phase 2 after core operations are stable
    - `advanced`: scale/optimization layer
  - `core_modules`
  - `integrations`
  - NFR/security + AI governance note
