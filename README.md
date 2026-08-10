# Daily Customer Revenue Pipeline

This pipeline transforms raw customer transactions into a daily aggregated customer revenue model.

## Metadata Context
- **Source Dataset**: `raw.customer_transactions` (Upstream: `raw.payments`)
- **Target Dataset**: `analytics.customer_revenue`
- **Owner**: `data-platform`
- **Domain**: Finance
- **Tags**: PII, Financial

## Security & Governance (PII)
- `customer_id` is classified as PII. To protect customer privacy while maintaining the ability to aggregate daily revenue per customer, we apply an MD5 hash to `customer_id` in the staging layer (`stg_customer_transactions`).

## Financial Validation
- Added tests to ensure transaction amounts are non-negative.
- Aggregations are grouped by currency to prevent mixing different currencies.