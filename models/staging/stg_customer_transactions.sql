with source as (
    select * from {{ source('raw', 'customer_transactions') }}
)

select
    transaction_id,
    -- PII Masking: Hashing customer_id to protect identity
    md5(customer_id) as hashed_customer_id,
    amount,
    currency,
    cast(transaction_date as timestamp) as transaction_date,
    payment_method
from source