# Customer Revenue Pipeline

This pipeline transforms raw customer transaction data into daily aggregated revenue metrics.

## Metadata & Governance
- **Owner**: data-platform
- **Domain**: Finance
- **Upstream**: `raw.payments`
- **Downstream**: `analytics.customer_revenue`

## Security & Compliance
- **PII Protection**: `customer_id` is hashed using SHA256 in the staging layer (`stg_customer_transactions`) to ensure compliance with privacy standards while maintaining aggregation capabilities.
- **Financial Validation**: Transactions with negative amounts are filtered out in the staging layer. A custom dbt test (`assert_positive_amounts`) ensures no negative values pass through.