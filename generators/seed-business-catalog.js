#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BUSINESSES_DIR = path.join(ROOT, 'businesses');

const BASE_APPS = [
  {
    app: 'crm',
    priority: 'essential',
    core_modules: ['lead_management', 'account_contact_360', 'pipeline', 'customer_service', 'reporting_dashboard'],
    integrations: ['email', 'sms', 'calendar'],
    compliance: ['privacy_policy_controls'],
  },
  {
    app: 'accounting-finance',
    priority: 'essential',
    core_modules: ['gl', 'ap', 'ar', 'cashflow', 'financial_reports'],
    integrations: ['banking', 'payment_gateway', 'einvoice'],
    compliance: ['audit_log', 'tax_compliance'],
  },
  {
    app: 'hris',
    priority: 'important',
    core_modules: ['employee_profile', 'attendance', 'payroll', 'leave', 'performance'],
    integrations: ['biometric_device', 'payroll_provider', 'email'],
    compliance: ['labor_data_controls'],
  },
  {
    app: 'bi-analytics',
    priority: 'important',
    core_modules: ['kpi_dashboard', 'self_service_reports', 'data_models', 'alerts'],
    integrations: ['data_warehouse', 'erp', 'crm'],
    compliance: ['role_based_access', 'audit_log'],
  },
  {
    app: 'document-management',
    priority: 'important',
    core_modules: ['document_repository', 'approval_workflow', 'versioning', 'search'],
    integrations: ['esign', 'cloud_storage', 'email'],
    compliance: ['retention_policy', 'audit_trail'],
  },
];

const BUSINESS_CATALOG = [
  {
    business: 'healthcare',
    brief_vi: [
      'Doanh nghiệp y tế cần quản lý hồ sơ bệnh nhân, lịch khám, quy trình điều trị và thanh toán.',
      'Mục tiêu chính là tăng chất lượng chăm sóc, giảm sai sót vận hành, và tuân thủ dữ liệu y tế.',
    ],
    apps: [
      { app: 'crm', priority: 'important', core_modules: ['lead_management', 'patient_profile_360', 'care_journey', 'service_requests', 'reporting_dashboard'], integrations: ['email', 'sms', 'calendar'], compliance: ['privacy_policy_controls'] },
      { app: 'emr-ehr', priority: 'essential', core_modules: ['patient_record', 'clinical_notes', 'orders_results', 'medication', 'care_history'], integrations: ['lab_system', 'imaging', 'insurance'], compliance: ['hipaa_like_controls', 'audit_log', 'encryption'] },
      { app: 'appointment-scheduling', priority: 'essential', core_modules: ['doctor_calendar', 'booking', 'queue_management', 'reminders'], integrations: ['sms', 'calendar', 'telehealth'], compliance: ['privacy_policy_controls'] },
      { app: 'billing-rcm', priority: 'essential', core_modules: ['claims', 'invoice', 'payments', 'reconciliation'], integrations: ['insurance', 'payment_gateway', 'accounting'], compliance: ['billing_audit_controls'] },
      { app: 'patient-portal', priority: 'important', core_modules: ['self_service_profile', 'appointments', 'results_view', 'secure_messages'], integrations: ['emr-ehr', 'payment_gateway'], compliance: ['consent_management'] },
      { app: 'telehealth', priority: 'important', core_modules: ['video_consultation', 'e_prescription', 'session_notes'], integrations: ['video_platform', 'emr-ehr'], compliance: ['privacy_policy_controls'] },
      { app: 'lab-information-system', priority: 'advanced', core_modules: ['sample_tracking', 'result_validation', 'instrument_interface'], integrations: ['emr-ehr', 'lab_devices'], compliance: ['traceability_controls'] },
    ],
  },
  {
    business: 'retail',
    brief_vi: [
      'Doanh nghiệp bán lẻ cần đồng bộ dữ liệu khách hàng, tồn kho, bán hàng đa kênh và chăm sóc sau bán.',
      'Mục tiêu là tối ưu doanh thu, vòng quay tồn kho và tỷ lệ quay lại mua hàng.',
    ],
    apps: [
      { app: 'crm', priority: 'essential', core_modules: ['lead_management', 'account_contact_360', 'pipeline', 'customer_service', 'reporting_dashboard'], integrations: ['email', 'sms', 'calendar'], compliance: ['privacy_policy_controls'] },
      { app: 'pos', priority: 'essential', core_modules: ['checkout', 'payments', 'returns', 'store_shift', 'receipt'], integrations: ['inventory-management', 'ecommerce', 'accounting-finance'], compliance: ['tax_controls', 'audit_log'] },
      { app: 'inventory-management', priority: 'essential', core_modules: ['stock_balance', 'replenishment', 'transfers', 'cycle_count'], integrations: ['pos', 'wms', 'supplier_portal'], compliance: ['traceability_controls'] },
      { app: 'order-management', priority: 'essential', core_modules: ['order_orchestration', 'fulfillment', 'returns_management'], integrations: ['ecommerce', 'wms', 'tms'], compliance: ['audit_log'] },
      { app: 'loyalty-customer', priority: 'important', core_modules: ['member_tiers', 'points', 'promotions', 'segments'], integrations: ['crm', 'pos', 'marketing-automation'], compliance: ['consent_management'] },
      { app: 'ecommerce', priority: 'important', core_modules: ['catalog', 'cart_checkout', 'payment', 'order_tracking'], integrations: ['payment_gateway', 'oms', 'crm'], compliance: ['privacy_policy_controls'] },
      { app: 'pricing-promotion', priority: 'advanced', core_modules: ['price_rules', 'promotion_engine', 'campaign_analysis'], integrations: ['pos', 'ecommerce'], compliance: ['approval_workflow'] },
    ],
  },
  {
    business: 'manufacturing',
    brief_vi: [
      'Doanh nghiệp sản xuất cần kiểm soát kế hoạch sản xuất, chất lượng, bảo trì thiết bị và chuỗi cung ứng.',
      'Mục tiêu là giảm downtime, tăng OEE và đảm bảo truy xuất nguồn gốc.',
    ],
    apps: [
      { app: 'erp', priority: 'essential', core_modules: ['production_planning', 'procurement', 'inventory', 'finance'], integrations: ['mes', 'wms', 'crm'], compliance: ['audit_log'] },
      { app: 'mes', priority: 'essential', core_modules: ['work_order_execution', 'shopfloor_tracking', 'quality_checks', 'traceability'], integrations: ['erp', 'iot_devices'], compliance: ['traceability_controls'] },
      { app: 'wms', priority: 'important', core_modules: ['inbound', 'putaway', 'picking', 'shipping'], integrations: ['erp', 'tms'], compliance: ['audit_log'] },
      { app: 'qms', priority: 'important', core_modules: ['quality_plan', 'non_conformance', 'capa', 'supplier_quality'], integrations: ['mes', 'erp'], compliance: ['regulatory_compliance'] },
      { app: 'cmms', priority: 'important', core_modules: ['asset_registry', 'preventive_maintenance', 'work_orders', 'spare_parts'], integrations: ['erp', 'iot_devices'], compliance: ['safety_compliance'] },
      { app: 'plm', priority: 'advanced', core_modules: ['bom', 'change_management', 'product_lifecycle', 'document_control'], integrations: ['erp', 'cad_system'], compliance: ['document_traceability'] },
    ],
  },
  {
    business: 'logistics',
    brief_vi: [
      'Doanh nghiệp logistics cần tối ưu vận chuyển, kho, tuyến giao và hiệu suất đội xe.',
      'Mục tiêu là giảm chi phí freight, tăng OTIF và minh bạch chuỗi giao nhận.',
    ],
    apps: [
      { app: 'tms', priority: 'essential', core_modules: ['shipment_planning', 'carrier_management', 'freight_audit', 'route_optimization'], integrations: ['wms', 'gps_telematics'], compliance: ['transport_compliance'] },
      { app: 'wms', priority: 'essential', core_modules: ['receiving', 'slotting', 'picking_packing', 'cross_dock'], integrations: ['tms', 'erp'], compliance: ['inventory_audit'] },
      { app: 'fleet-management', priority: 'important', core_modules: ['vehicle_registry', 'maintenance', 'fuel_tracking', 'driver_management'], integrations: ['gps_telematics', 'tms'], compliance: ['fleet_safety_controls'] },
      { app: 'last-mile-delivery', priority: 'important', core_modules: ['dispatch', 'driver_app', 'pod', 'customer_notifications'], integrations: ['mapping', 'sms', 'tms'], compliance: ['proof_of_delivery_audit'] },
      { app: 'order-management', priority: 'important', core_modules: ['order_intake', 'allocation', 'status_tracking', 'exceptions'], integrations: ['crm', 'wms', 'tms'], compliance: ['audit_log'] },
      { app: 'customs-trade-compliance', priority: 'advanced', core_modules: ['trade_docs', 'hs_code', 'duty_tax', 'compliance_screening'], integrations: ['tms', 'erp'], compliance: ['trade_compliance'] },
    ],
  },
  {
    business: 'construction',
    brief_vi: [
      'Doanh nghiệp xây dựng cần quản lý dự án, dự toán, tiến độ hiện trường và an toàn lao động.',
      'Mục tiêu là kiểm soát chi phí, hạn chế trễ tiến độ và chuẩn hóa hồ sơ nghiệm thu.',
    ],
    apps: [
      { app: 'project-controls', priority: 'essential', core_modules: ['wbs_schedule', 'cost_control', 'progress_tracking', 'change_orders'], integrations: ['accounting-finance', 'procurement'], compliance: ['audit_log'] },
      { app: 'procurement', priority: 'essential', core_modules: ['rfq', 'po', 'vendor_management', 'contract_tracking'], integrations: ['project-controls', 'inventory-management'], compliance: ['approval_workflow'] },
      { app: 'field-service', priority: 'important', core_modules: ['work_assignments', 'field_reports', 'timesheet', 'issue_tracking'], integrations: ['mobile_app', 'project-controls'], compliance: ['worksite_audit'] },
      { app: 'asset-equipment', priority: 'important', core_modules: ['equipment_registry', 'usage_tracking', 'maintenance', 'availability'], integrations: ['cmms', 'project-controls'], compliance: ['safety_compliance'] },
      { app: 'safety-compliance', priority: 'important', core_modules: ['incident_reporting', 'safety_checklist', 'training_records'], integrations: ['field-service', 'document-management'], compliance: ['osh_controls'] },
      { app: 'bim-collaboration', priority: 'advanced', core_modules: ['model_coordination', 'clash_tracking', 'revision_control'], integrations: ['project-controls', 'document-management'], compliance: ['document_traceability'] },
    ],
  },
  {
    business: 'education',
    brief_vi: [
      'Tổ chức giáo dục cần quản lý tuyển sinh, học tập, học phí và trải nghiệm học viên.',
      'Mục tiêu là nâng chất lượng đào tạo và tối ưu vận hành học vụ.',
    ],
    apps: [
      { app: 'sis', priority: 'essential', core_modules: ['student_profile', 'enrollment', 'academic_records', 'attendance'], integrations: ['lms', 'billing'], compliance: ['student_data_privacy'] },
      { app: 'lms', priority: 'essential', core_modules: ['course_content', 'assignments', 'grading', 'learning_analytics'], integrations: ['sis', 'video_platform'], compliance: ['accessibility_controls'] },
      { app: 'admissions-crm', priority: 'important', core_modules: ['lead_capture', 'application_pipeline', 'communication', 'scholarship_workflow'], integrations: ['crm', 'sis'], compliance: ['consent_management'] },
      { app: 'timetable-scheduling', priority: 'important', core_modules: ['class_schedule', 'room_allocation', 'teacher_workload'], integrations: ['sis'], compliance: ['audit_log'] },
      { app: 'tuition-billing', priority: 'important', core_modules: ['invoice', 'payment_plans', 'collections', 'financial_reports'], integrations: ['payment_gateway', 'accounting-finance'], compliance: ['billing_audit_controls'] },
      { app: 'exam-proctoring', priority: 'advanced', core_modules: ['exam_setup', 'identity_check', 'monitoring', 'incident_logs'], integrations: ['lms'], compliance: ['privacy_policy_controls'] },
    ],
  },
  {
    business: 'hospitality',
    brief_vi: [
      'Doanh nghiệp khách sạn/nhà hàng cần quản lý đặt phòng, vận hành dịch vụ và trải nghiệm khách hàng.',
      'Mục tiêu là tối đa công suất, doanh thu/phòng và chất lượng phục vụ.',
    ],
    apps: [
      { app: 'pms', priority: 'essential', core_modules: ['reservation', 'checkin_checkout', 'room_inventory', 'folio_billing'], integrations: ['channel_manager', 'payment_gateway'], compliance: ['audit_log'] },
      { app: 'restaurant-pos', priority: 'essential', core_modules: ['table_orders', 'kitchen_display', 'payments', 'shift_close'], integrations: ['inventory-management', 'accounting-finance'], compliance: ['tax_controls'] },
      { app: 'booking-engine', priority: 'important', core_modules: ['availability', 'pricing', 'booking_flow', 'promotions'], integrations: ['pms', 'channel_manager'], compliance: ['privacy_policy_controls'] },
      { app: 'housekeeping-operations', priority: 'important', core_modules: ['room_status', 'task_assignment', 'maintenance_requests'], integrations: ['pms', 'mobile_app'], compliance: ['audit_trail'] },
      { app: 'revenue-management', priority: 'important', core_modules: ['forecasting', 'dynamic_pricing', 'demand_analysis'], integrations: ['pms', 'bi-analytics'], compliance: ['approval_workflow'] },
      { app: 'guest-loyalty', priority: 'advanced', core_modules: ['member_profile', 'points', 'offers', 'engagement_campaigns'], integrations: ['crm', 'pms'], compliance: ['consent_management'] },
    ],
  },
  {
    business: 'finance-insurance',
    brief_vi: [
      'Doanh nghiệp tài chính và bảo hiểm cần quy trình chặt chẽ về onboarding, rủi ro và tuân thủ.',
      'Mục tiêu là tăng tốc phục vụ khách hàng nhưng vẫn đảm bảo kiểm soát rủi ro.',
    ],
    apps: [
      { app: 'digital-onboarding', priority: 'essential', core_modules: ['kyc', 'document_capture', 'risk_scoring', 'approval_workflow'], integrations: ['ekyc_provider', 'crm'], compliance: ['aml_controls', 'privacy_controls'] },
      { app: 'loan-policy-management', priority: 'essential', core_modules: ['application', 'underwriting', 'disbursement', 'repayment_schedule'], integrations: ['core_system', 'payment_gateway'], compliance: ['regulatory_reporting'] },
      { app: 'claims-case-management', priority: 'important', core_modules: ['case_intake', 'assessment', 'approval', 'payout'], integrations: ['document-management', 'payment_gateway'], compliance: ['audit_log'] },
      { app: 'risk-compliance', priority: 'important', core_modules: ['risk_register', 'controls_testing', 'incident_tracking', 'reports'], integrations: ['bi-analytics'], compliance: ['sox_like_controls'] },
      { app: 'collections', priority: 'important', core_modules: ['delinquency_tracking', 'contact_strategy', 'promise_to_pay', 'settlement'], integrations: ['loan-policy-management', 'crm'], compliance: ['customer_protection_controls'] },
      { app: 'fraud-monitoring', priority: 'advanced', core_modules: ['rule_engine', 'alerts', 'investigation', 'case_link_analysis'], integrations: ['core_system', 'risk-compliance'], compliance: ['audit_log'] },
    ],
  },
  {
    business: 'real-estate',
    brief_vi: [
      'Doanh nghiệp bất động sản cần quản lý khách hàng, tài sản, hợp đồng thuê/mua và dịch vụ hậu mãi.',
      'Mục tiêu là tăng tỉ lệ chốt giao dịch và hiệu quả vận hành tài sản.',
    ],
    apps: [
      { app: 'property-management', priority: 'essential', core_modules: ['property_inventory', 'tenant_contracts', 'rent_billing', 'maintenance_requests'], integrations: ['payment_gateway', 'accounting-finance'], compliance: ['contract_audit'] },
      { app: 'broker-crm', priority: 'essential', core_modules: ['lead_capture', 'deal_pipeline', 'site_visit', 'commission_tracking'], integrations: ['crm', 'calendar'], compliance: ['privacy_policy_controls'] },
      { app: 'lease-management', priority: 'important', core_modules: ['lease_terms', 'renewal', 'escalation', 'compliance_dates'], integrations: ['property-management'], compliance: ['contract_controls'] },
      { app: 'facility-maintenance', priority: 'important', core_modules: ['work_order', 'vendor_assignment', 'sla_tracking', 'asset_registry'], integrations: ['property-management', 'cmms'], compliance: ['safety_compliance'] },
      { app: 'tenant-portal', priority: 'important', core_modules: ['service_requests', 'payments', 'notices', 'documents'], integrations: ['property-management', 'payment_gateway'], compliance: ['consent_management'] },
      { app: 'valuation-analytics', priority: 'advanced', core_modules: ['market_comps', 'valuation_model', 'occupancy_forecast'], integrations: ['bi-analytics'], compliance: ['model_governance'] },
    ],
  },
  {
    business: 'professional-services',
    brief_vi: [
      'Doanh nghiệp dịch vụ chuyên nghiệp cần quản lý dự án, năng lực nhân sự, timesheet và billing.',
      'Mục tiêu là tối ưu utilization và biên lợi nhuận theo dự án.',
    ],
    apps: [
      { app: 'psa', priority: 'essential', core_modules: ['project_planning', 'resource_allocation', 'timesheet', 'project_profitability'], integrations: ['crm', 'accounting-finance'], compliance: ['audit_log'] },
      { app: 'project-management', priority: 'essential', core_modules: ['task_board', 'milestones', 'dependencies', 'risk_log'], integrations: ['psa', 'document-management'], compliance: ['audit_trail'] },
      { app: 'timesheet-billing', priority: 'important', core_modules: ['time_entry', 'rate_cards', 'invoice_generation', 'collections'], integrations: ['psa', 'accounting-finance'], compliance: ['billing_controls'] },
      { app: 'knowledge-management', priority: 'important', core_modules: ['playbooks', 'search', 'versioning', 'approvals'], integrations: ['document-management'], compliance: ['retention_policy'] },
      { app: 'proposal-cpq', priority: 'important', core_modules: ['proposal_builder', 'pricing', 'approval_workflow', 'contract_export'], integrations: ['crm', 'document-management'], compliance: ['approval_controls'] },
      { app: 'resource-forecasting', priority: 'advanced', core_modules: ['demand_forecast', 'capacity_planning', 'skills_matrix'], integrations: ['hris', 'psa'], compliance: ['model_governance'] },
    ],
  },
  {
    business: 'wholesale-distribution',
    brief_vi: [
      'Doanh nghiệp phân phối cần kiểm soát mua hàng, tồn kho, đơn hàng đại lý và giao nhận.',
      'Mục tiêu là tăng độ chính xác đơn hàng và giảm chi phí tồn kho.',
    ],
    apps: [
      { app: 'erp', priority: 'essential', core_modules: ['procurement', 'inventory', 'sales_orders', 'finance'], integrations: ['wms', 'crm'], compliance: ['audit_log'] },
      { app: 'wms', priority: 'essential', core_modules: ['receiving', 'bin_management', 'picking', 'shipping'], integrations: ['erp', 'tms'], compliance: ['inventory_audit'] },
      { app: 'b2b-ordering-portal', priority: 'important', core_modules: ['catalog_pricing', 'self_service_ordering', 'order_tracking'], integrations: ['erp', 'crm'], compliance: ['access_controls'] },
      { app: 'trade-promotion', priority: 'important', core_modules: ['promotion_planning', 'rebates', 'claim_settlement'], integrations: ['crm', 'accounting-finance'], compliance: ['audit_controls'] },
      { app: 'procurement-sourcing', priority: 'important', core_modules: ['rfq', 'supplier_scoring', 'contract_management'], integrations: ['erp'], compliance: ['approval_workflow'] },
      { app: 'demand-planning', priority: 'advanced', core_modules: ['forecasting', 'replenishment_policy', 'scenario_planning'], integrations: ['erp', 'bi-analytics'], compliance: ['model_governance'] },
    ],
  },
  {
    business: 'ecommerce-d2c',
    brief_vi: [
      'Doanh nghiệp thương mại điện tử cần tối ưu trải nghiệm mua hàng, fulfillment và tăng trưởng marketing.',
      'Mục tiêu là tăng conversion, AOV và LTV.',
    ],
    apps: [
      { app: 'storefront-commerce', priority: 'essential', core_modules: ['product_catalog', 'cart_checkout', 'payment', 'order_tracking'], integrations: ['oms', 'payment_gateway', 'crm'], compliance: ['privacy_policy_controls'] },
      { app: 'oms', priority: 'essential', core_modules: ['order_routing', 'fulfillment', 'returns', 'status_sync'], integrations: ['wms', 'tms', 'storefront-commerce'], compliance: ['audit_log'] },
      { app: 'marketing-automation', priority: 'important', core_modules: ['campaigns', 'journeys', 'segments', 'attribution'], integrations: ['crm', 'ad_platforms'], compliance: ['consent_management'] },
      { app: 'customer-support', priority: 'important', core_modules: ['ticketing', 'chat', 'sla', 'knowledge_base'], integrations: ['crm', 'oms'], compliance: ['audit_trail'] },
      { app: 'returns-refunds', priority: 'important', core_modules: ['rma', 'inspection', 'refunds', 'restock'], integrations: ['oms', 'payment_gateway'], compliance: ['policy_controls'] },
      { app: 'recommendation-personalization', priority: 'advanced', core_modules: ['recommendation_engine', 'segments', 'ab_testing'], integrations: ['storefront-commerce', 'bi-analytics'], compliance: ['model_governance'] },
    ],
  },
];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function toYamlArray(items, indent = 0) {
  const space = ' '.repeat(indent);
  return items.map((item) => `${space}- ${item}`).join('\n');
}

function toTitleCase(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function makeBriefEn(business, apps) {
  const title = toTitleCase(business);
  const appList = apps.map((a) => a.app).slice(0, 4).join(', ');
  return `# Business Brief - ${title}\n\n## Context\n- This business blueprint targets the ${title} domain.\n- The app catalog includes: ${appList}${apps.length > 4 ? ', and more.' : '.'}\n- Focus outcomes: operational efficiency, governance, and measurable business impact.\n\n## Notes\n- Prompts can be written in Vietnamese.\n- Generated technical files should stay in English or bilingual EN/VI.\n`;
}

function makeBriefVi(business, lines) {
  return `# Business Brief - ${business}\n\n## Bối cảnh\n${lines.map((l) => `- ${l}`).join('\n')}\n\n## Ghi chú\n- Prompt có thể viết bằng tiếng Việt.\n- Tài liệu output nên để EN hoặc song ngữ EN/VI.\n`;
}

function makeInitYaml(business, appData) {
  const mergedFromBase = BASE_APPS.find((a) => a.app === appData.app);
  const merged = mergedFromBase
    ? {
        ...mergedFromBase,
        ...appData,
        core_modules: appData.core_modules || mergedFromBase.core_modules,
        integrations: appData.integrations || mergedFromBase.integrations,
        compliance: appData.compliance || mergedFromBase.compliance,
      }
    : appData;

  return [
    `business: ${business}`,
    `app: ${merged.app}`,
    `project_name_pattern: "{business}-{app}"`,
    `priority: ${merged.priority}`,
    `language_output:`,
    `  - en`,
    `  - vi`,
    `default_language: en`,
    `theme_options:`,
    `  - corporate`,
    `  - modern`,
    `  - minimal`,
    `default_theme: corporate`,
    `mode_options:`,
    `  - replace_existing`,
    `  - new_app`,
    `target_users:`,
    `  - owner`,
    `  - manager`,
    `  - staff`,
    `core_modules:`,
    toYamlArray(merged.core_modules, 2),
    `integrations:`,
    toYamlArray(merged.integrations, 2),
    `nfr:`,
    `  performance: "P95 API < 400ms for core operations"`,
    `  security: "RBAC, audit log, encrypted sensitive fields"`,
    `  availability: "99.9% monthly"`,
    `  ai_governance: "Human review required for AI-generated business logic"`,
    `compliance:`,
    toYamlArray(merged.compliance, 2),
  ].join('\n') + '\n';
}

function main() {
  ensureDir(BUSINESSES_DIR);

  BUSINESS_CATALOG.forEach((b) => {
    const businessDir = path.join(BUSINESSES_DIR, b.business);
    const appsDir = path.join(businessDir, 'apps');
    ensureDir(appsDir);

    writeFile(path.join(businessDir, 'business-brief.en.md'), makeBriefEn(b.business, b.apps));
    writeFile(path.join(businessDir, 'business-brief.vi.md'), makeBriefVi(b.business, b.brief_vi));

    b.apps.forEach((appData) => {
      const appDir = path.join(appsDir, appData.app);
      ensureDir(appDir);
      writeFile(path.join(appDir, 'init.tech.yaml'), makeInitYaml(b.business, appData));
    });

    const appCatalog = [
      `business: ${b.business}`,
      `apps:`,
      ...b.apps.map((a) => `  - app: ${a.app}\n    priority: ${a.priority}`),
      '',
    ].join('\n');

    writeFile(path.join(businessDir, 'app-catalog.yaml'), appCatalog);
  });

  const summary = {
    businesses: BUSINESS_CATALOG.length,
    apps: BUSINESS_CATALOG.reduce((sum, b) => sum + b.apps.length, 0),
  };

  writeFile(
    path.join(ROOT, 'BUSINESS_APP_MATRIX.md'),
    [
      '# Business App Matrix',
      '',
      `Generated businesses: ${summary.businesses}`,
      `Generated app blueprints: ${summary.apps}`,
      '',
      'Priority levels:',
      '- essential: should be implemented first',
      '- important: phase 2 after core operations are stable',
      '- advanced: scale/optimization layer',
      '',
      'This matrix is generated from `generators/seed-business-catalog.js`.',
    ].join('\n') + '\n'
  );

  console.log(`Seeded ${summary.businesses} businesses and ${summary.apps} app blueprints.`);
}

main();
