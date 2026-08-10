with source as (
    select * from {{ source('raw', 'customer_transactions') }}
),
renamed as (
    select
        transaction_id,
        -- PII Handling: Hash customer_id to protect identity while preserving aggregation capability
        md5(cast(customer_id as varchar)) as hashed_customer_id,
        amount,
        currency,
        cast(transaction_date as date) as transaction_date,
        payment_method
    from source
    where amount is not null
      and transaction_date is not null
)
select * from renamed