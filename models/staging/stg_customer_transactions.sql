with source as (
    select * from {{ source('raw', 'customer_transactions') }}
)
select
    transaction_id,
    -- PII Masking: Hashing customer_id to protect identity while preserving uniqueness for aggregation
    md5(customer_id) as customer_id,
    amount,
    currency,
    transaction_date,
    payment_method
from source