# Daily Customer Revenue Pipeline

This pipeline transforms raw customer transaction events into a daily aggregated customer revenue model.

## Lineage
- **Upstream**: `raw.payments` -> `raw.customer_transactions`
- **Downstream**: `analytics.customer_revenue`

## Governance & Security
- **PII Protection**: `customer_id` is hashed using MD5 in the staging layer to protect customer identity while allowing daily aggregation.
- **Financial Validation**: Added tests to ensure `amount` and `daily_revenue` are non-null and non-negative.