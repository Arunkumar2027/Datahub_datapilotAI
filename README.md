# Customer Revenue Pipeline

## Overview
This pipeline transforms raw customer transaction data from `raw.customer_transactions` into a daily customer revenue model (`analytics.customer_revenue`).

## Governance & Security
- **PII Protection**: The `customer_id` column is masked using an MD5 hash in the staging layer (`stg_customer_transactions`) to comply with PII data governance rules.
- **Financial Validation**: A data quality test (`assert_positive_amounts`) ensures that no negative transaction amounts are processed.

## Lineage
- **Upstream**: `raw.payments` -> `raw.customer_transactions`
- **Downstream**: `analytics.customer_revenue`

## Ownership
- **Owner**: data-platform
- **Domain**: Finance