with source as (
    select * from {{ source('raw', 'customer_transactions') }}
),

renamed as (
    select
        transaction_id,
        -- PII Masking: Hash customer_id to protect identity while allowing downstream aggregation
        sha256(customer_id) as masked_customer_id,
        amount,
        currency,
        cast(transaction_date as date) as transaction_date,
        payment_method
    from source
    where amount >= 0 -- Financial Validation: Exclude negative transaction amounts
)

select * from renamed