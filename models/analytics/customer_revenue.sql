with staging as (
    select * from {{ ref('stg_customer_transactions') }}
)

select
    cast(transaction_date as date) as transaction_date,
    hashed_customer_id,
    currency,
    sum(amount) as daily_revenue,
    count(transaction_id) as transaction_count
from staging
group by 1, 2, 3