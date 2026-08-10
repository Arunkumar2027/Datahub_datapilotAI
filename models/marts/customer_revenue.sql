with staging as (
    select * from {{ ref('stg_customer_transactions') }}
),

daily_aggregates as (
    select
        transaction_date,
        masked_customer_id,
        currency,
        sum(amount) as daily_revenue,
        count(transaction_id) as total_transactions
    from staging
    group by 1, 2, 3
)

select * from daily_aggregates